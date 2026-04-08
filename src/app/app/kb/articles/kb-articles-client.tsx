'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { KbArticle } from '@/types/database'

// Simple markdown → HTML (no external dep)
function mdToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-[#d4e4d4] mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-semibold text-white mt-6 mb-2 pb-1 border-b border-white/[0.06]">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-lg font-bold text-white mt-2 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-[#d4e4d4]/70 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="font-mono text-xs bg-[#1e2b1e] text-[#3dd68c] px-1.5 py-0.5 rounded">$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-[#3dd68c] pl-3 italic text-[#6b8f6b] my-2">$1</blockquote>')
    .replace(/^[-*] (.+)$/gm, '<li class="text-sm text-[#d4e4d4]/80 leading-relaxed ml-3 list-disc">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, m => `<ul class="my-2 space-y-1">${m}</ul>`)
    .replace(/\n\n/g, '</p><p class="text-sm text-[#d4e4d4]/75 leading-relaxed my-2">')
    .replace(/^(?!<[huplbi])(.{20,})$/gm, (m) => `<p class="text-sm text-[#d4e4d4]/75 leading-relaxed my-2">${m}</p>`)
}

const SENTIMENT_COLORS: Record<string, string> = {
  positive: 'text-[#3dd68c] bg-[#3dd68c]/10',
  negative: 'text-[#e05252] bg-[#e05252]/10',
  mixed:    'text-[#f0a844] bg-[#f0a844]/10',
  neutral:  'text-[#6b8f6b] bg-[#6b8f6b]/10',
}

export function KbArticlesClient({ articles }: { articles: KbArticle[] }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<KbArticle | null>(articles[0] ?? null)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const filtered = useMemo(() => {
    if (!search) return articles
    const q = search.toLowerCase()
    return articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      (a.tags ?? []).some(t => t.toLowerCase().includes(q)) ||
      (a.summary ?? '').toLowerCase().includes(q)
    )
  }, [articles, search])

  async function handleDelete(id: string) {
    if (!confirm('Delete this article?')) return
    setDeleting(true)
    const supabase = createClient() as any
    await supabase.from('kb_articles').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    setDeleting(false)
    if (selected?.id === id) setSelected(filtered.find(a => a.id !== id) ?? null)
    router.refresh()
  }

  const inp = 'bg-[#1e2b1e] border border-white/[0.08] rounded px-3 py-1.5 text-sm text-[#d4e4d4] outline-none focus:border-[#3dd68c]/40 placeholder:text-[#6b8f6b]'

  return (
    <div className="flex gap-4" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-2">
        <input className={`${inp} w-full`} placeholder="Search articles…"
          value={search} onChange={e => setSearch(e.target.value)} />
        <div className="text-[10px] font-mono text-[#6b8f6b] px-1">{filtered.length} articles</div>
        <div className="flex-1 overflow-y-auto space-y-1">
          {filtered.length > 0 ? filtered.map(a => (
            <button key={a.id} onClick={() => setSelected(a)}
              className={`w-full text-left px-3 py-2.5 rounded-md transition-all ${selected?.id === a.id ? 'bg-[#3dd68c]/12 border border-[#3dd68c]/20 text-[#3dd68c]' : 'text-[#6b8f6b] hover:bg-[#182118] hover:text-[#d4e4d4] border border-transparent'}`}>
              <div className="text-xs font-medium leading-snug line-clamp-2">{a.title}</div>
              <div className="text-[9px] font-mono mt-0.5 opacity-60">{a.created_at.slice(0,10)}</div>
            </button>
          )) : (
            <div className="text-xs text-[#6b8f6b] italic px-2 py-4">No articles found</div>
          )}
        </div>
      </div>

      {/* Article viewer */}
      <div className="flex-1 bg-[#111a14] border border-white/[0.06] rounded-lg overflow-y-auto">
        {selected ? (
          <div className="p-6">
            {/* Meta */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-xl font-bold text-white mb-2">{selected.title}</h1>
                <div className="flex flex-wrap gap-2 items-center">
                  {(selected.tags ?? []).map(t => (
                    <span key={t} className="font-mono text-[9px] bg-[#1e2b1e] text-[#6b8f6b] px-2 py-0.5 rounded border border-white/[0.06]">{t}</span>
                  ))}
                  {selected.sentiment && (
                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded ${SENTIMENT_COLORS[selected.sentiment] ?? ''}`}>
                      {selected.sentiment}
                    </span>
                  )}
                  <span className="font-mono text-[9px] text-[#6b8f6b]">{selected.created_at.slice(0,10)}</span>
                </div>
              </div>
              <button onClick={() => handleDelete(selected.id)} disabled={deleting}
                className="text-[10px] text-[#e05252]/60 hover:text-[#e05252] transition-colors flex-shrink-0 disabled:opacity-40">
                Delete
              </button>
            </div>

            {/* Summary */}
            {selected.summary && (
              <div className="bg-[#3dd68c]/08 border border-[#3dd68c]/15 rounded-md px-4 py-3 mb-5">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#3dd68c] mb-1">Summary</div>
                <p className="text-sm text-[#d4e4d4]/75 leading-relaxed">{selected.summary}</p>
              </div>
            )}

            {/* Key facts */}
            {(selected.key_facts ?? []).length > 0 && (
              <div className="mb-5">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#6b8f6b] mb-2">Key Facts</div>
                <ul className="space-y-1.5">
                  {selected.key_facts.map((f, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[#d4e4d4]/70">
                      <span className="text-[#3dd68c] flex-shrink-0">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Risks + Opportunities */}
            {((selected.risks ?? []).length > 0 || (selected.opportunities ?? []).length > 0) && (
              <div className="grid grid-cols-2 gap-4 mb-5">
                {(selected.risks ?? []).length > 0 && (
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#e05252] mb-2">Risks</div>
                    <ul className="space-y-1">
                      {selected.risks.map((r, i) => (
                        <li key={i} className="text-xs text-[#d4e4d4]/60 flex gap-1.5"><span className="text-[#e05252]">▸</span>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {(selected.opportunities ?? []).length > 0 && (
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#3dd68c] mb-2">Opportunities</div>
                    <ul className="space-y-1">
                      {selected.opportunities.map((o, i) => (
                        <li key={i} className="text-xs text-[#d4e4d4]/60 flex gap-1.5"><span className="text-[#3dd68c]">▸</span>{o}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Full content */}
            <div className="border-t border-white/[0.06] pt-5">
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#6b8f6b] mb-3">Full Article</div>
              <div
                className="prose-mmv"
                dangerouslySetInnerHTML={{ __html: mdToHtml(selected.content) }}
              />
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-8">
            <div>
              <div className="text-3xl opacity-20 mb-3">◆</div>
              <p className="text-sm text-[#6b8f6b]">No articles compiled yet.<br />Add sources and compile them to see articles here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
