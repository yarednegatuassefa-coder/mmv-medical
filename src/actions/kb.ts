'use server'

import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase/server'
import { kbSourceSchema } from '@/lib/validations/schemas'
import type { KbArticle } from '@/types/database'

const getClient = () => new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const KB_TOPIC = 'Turkish dental and medical tourism for European patients (UK, Ireland, Netherlands, Belgium, Romania)'

// ── ADD SOURCE ────────────────────────────────────────────────
export async function addKbSource(data: unknown) {
  const parsed = kbSourceSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message ?? 'Invalid data' }

  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { error, data: source } = await supabase.from('kb_sources').insert({
    ...parsed.data,
    url: parsed.data.url || null,
    created_by: user.id,
  }).select('id').single()

  if (error) return { success: false, error: error.message }
  return { success: true, sourceId: (source as { id: string }).id }
}

// ── COMPILE SOURCE → ARTICLE ──────────────────────────────────
export async function compileKbSource(sourceId: string) {
  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: src } = await supabase.from('kb_sources').select('*').eq('id', sourceId).single()
  if (!src) return { success: false, error: 'Source not found' }

  const source = src as {
    title: string; url: string | null; source_type: string; raw_content: string
  }

  try {
    const client = getClient()
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You compile research sources into structured wiki articles about: ${KB_TOPIC}. Always respond with valid JSON only — no markdown fences, no preamble.`,
      messages: [{
        role: 'user',
        content: `Source Title: ${source.title}\nURL: ${source.url ?? 'N/A'}\nType: ${source.source_type}\n\nContent:\n${source.raw_content.slice(0, 6000)}\n\nCompile into a wiki article. Return JSON:\n{"title":"...","content":"Full markdown article with ## sections, min 150 words","summary":"2 sentence summary","tags":["tag1","tag2"],"key_facts":["fact1","fact2","fact3"],"sentiment":"positive|neutral|negative|mixed","risks":["risk1"],"opportunities":["opp1"]}`
      }]
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const compiled = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())

    const { error: artError } = await supabase.from('kb_articles').insert({
      source_id:     sourceId,
      title:         compiled.title,
      content:       compiled.content,
      summary:       compiled.summary,
      tags:          compiled.tags ?? [],
      key_facts:     compiled.key_facts ?? [],
      sentiment:     compiled.sentiment ?? 'neutral',
      risks:         compiled.risks ?? [],
      opportunities: compiled.opportunities ?? [],
      created_by:    user.id,
    })

    if (artError) return { success: false, error: artError.message }

    await supabase.from('kb_sources').update({ compiled: true }).eq('id', sourceId)

    return { success: true, title: compiled.title as string }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Compilation failed'
    return { success: false, error: msg }
  }
}

// ── ASK ───────────────────────────────────────────────────────
export async function askKnowledgeBase(question: string) {
  if (!question.trim()) return { success: false, error: 'Empty question' }

  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: articles } = await supabase
    .from('kb_articles')
    .select('id,title,summary,content,tags')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  const typedArticles = (articles ?? []) as Pick<KbArticle, 'id' | 'title' | 'summary' | 'content' | 'tags'>[]

  if (!typedArticles.length) {
    return { success: false, error: 'No articles in knowledge base yet. Add and compile some sources first.' }
  }

  const context = typedArticles.map((a, i) =>
    `[${i + 1}] ARTICLE: ${a.title}\nSUMMARY: ${a.summary ?? ''}\n${a.content.slice(0, 1800)}`
  ).join('\n\n---\n\n')

  const citations: { index: number; title: string }[] = []

  try {
    const client = getClient()
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You answer questions using ONLY the provided knowledge base articles about: ${KB_TOPIC}. Always cite sources using [N] notation. Be specific, factual, and concise. If information isn't in the knowledge base, say so clearly.`,
      messages: [{
        role: 'user',
        content: `KNOWLEDGE BASE:\n${context.slice(0, 14000)}\n\nQUESTION: ${question}\n\nAnswer using only the knowledge base. Cite relevant articles with [N] notation.`
      }]
    })

    const answer = response.content[0].type === 'text' ? response.content[0].text : ''

    // Extract [N] citation references
    const refs = Array.from(answer.matchAll(/\[(\d+)\]/g)).map(m => parseInt(m[1]) - 1)
    refs.forEach(i => {
      if (typedArticles[i] && !citations.find(c => c.index === i)) {
        citations.push({ index: i + 1, title: typedArticles[i].title })
      }
    })

    await supabase.from('kb_queries').insert({
      question,
      answer,
      citations: JSON.stringify(citations),
      created_by: user.id,
    })

    return { success: true, answer, citations }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Query failed'
    return { success: false, error: msg }
  }
}

// ── HEALTH CHECK ──────────────────────────────────────────────
export async function runKbHealthCheck() {
  const supabase = await createServiceClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: articles } = await supabase
    .from('kb_articles')
    .select('title,tags,summary,created_at')
    .is('deleted_at', null)

  const typedArticles = (articles ?? []) as Pick<KbArticle, 'title' | 'tags' | 'summary'>[]

  if (!typedArticles.length) return { success: false, error: 'No articles to analyse' }

  const summary = typedArticles.map(a =>
    `- "${a.title}" [${(a.tags ?? []).join(', ')}]: ${a.summary ?? ''}`
  ).join('\n')

  try {
    const client = getClient()
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You analyse knowledge bases about: ${KB_TOPIC}. Respond with valid JSON only.`,
      messages: [{
        role: 'user',
        content: `Articles in knowledge base:\n${summary}\n\nReturn JSON:\n{"gaps":["missing topic 1","missing topic 2","missing topic 3","missing topic 4"],"strengths":["covered well 1","covered well 2"],"opportunities":["new article idea 1","new article idea 2","new article idea 3"],"next_sources":["specific source to add 1","specific source to add 2","specific source to add 3"]}`
      }]
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const result = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())
    return { success: true, result }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Health check failed'
    return { success: false, error: msg }
  }
}
