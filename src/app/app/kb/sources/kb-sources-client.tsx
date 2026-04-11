'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addKbSource, compileKbSource } from '@/actions/kb'
import type { KbSource } from '@/types/database'
import { SOURCE_TYPES } from '@/lib/constants'

export function KbSourcesClient({ sources }: { sources: KbSource[] }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [type, setType] = useState('article')
  const [content, setContent] = useState('')
  const [tagsRaw, setTagsRaw] = useState('')
  const [status, setStatus] = useState<'idle'|'saving'|'compiling'|'error'|'ok'>('idle')
  const [msg, setMsg] = useState('')
  const [compilingId, setCompilingId] = useState<string|null>(null)
  const router = useRouter()

  const inp = 'bg-[#1e2b1e] border border-white/[0.08] rounded px-3 py-2 text-sm text-[#d4e4d4] outline-none focus:border-[#3dd68c]/40 w-full placeholder:text-[#6b8f6b]'

  async function save(compile: boolean) {
    if (!content.trim()) { setMsg('Paste some content first'); setStatus('error'); return }
    setStatus(compile ? 'compiling' : 'saving')
    setMsg('')

    const r1 = await addKbSource({
      title: title.trim() || 'Untitled Source',
      url: url.trim(),
      source_type: type,
      tags: tagsRaw.split(',').map(t => t.trim()).filter(Boolean),
      raw_content: content,
    })

    if (!r1.success) { setMsg(r1.error ?? 'Failed'); setStatus('error'); return }

    if (compile && r1.sourceId) {
      setCompilingId(r1.sourceId)
      const r2 = await compileKbSource(r1.sourceId)
      setCompilingId(null)
      if (!r2.success) { setMsg(r2.error ?? 'Compile failed'); setStatus('error'); return }
      setMsg(`✓ Article compiled: "${r2.title}"`)
    } else {
      setMsg('✓ Source saved')
    }

    setStatus('ok')
    setTitle(''); setUrl(''); setContent(''); setTagsRaw('')
    router.refresh()
    setTimeout(() => setStatus('idle'), 3000)
  }

  async function handleCompile(id: string) {
    setCompilingId(id)
    const r = await compileKbSource(id)
    setCompilingId(null)
    if (r.success) setMsg(`✓ "${r.title}" compiled`)
    else setMsg(`✕ ${r.error}`)
    router.refresh()
    setTimeout(() => setMsg(''), 4000)
  }

  return (
    <>
      {/* Ingest form */}
      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg mb-5 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <div className="font-display text-base font-semibold text-white">Add New Source</div>
          <span className="font-mono text-[10px] text-[#6b8f6b]">{content.length.toLocaleString()} chars</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input className={inp} placeholder="Source title" value={title} onChange={e => setTitle(e.target.value)} />
            <input className={inp} placeholder="URL (optional)" value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select className={`${inp} bg-[#1e2b1e]`} value={type} onChange={e => setType(e.target.value)}>
              {SOURCE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <input className={inp} placeholder="Tags, comma separated" value={tagsRaw} onChange={e => setTagsRaw(e.target.value)} />
          </div>
          <textarea className={`${inp} resize-none`} rows={6}
            placeholder="Paste article text, patient reviews, clinic info, market data, regulations…"
            value={content} onChange={e => setContent(e.target.value)} />
          <div className="flex items-center gap-3">
            <button onClick={() => save(true)} disabled={status==='saving'||status==='compiling'}
              className="text-sm bg-[#3dd68c] text-[#0d1117] font-semibold px-5 py-2 rounded hover:bg-[#52e09e] transition-colors disabled:opacity-40">
              {status==='compiling' ? '⟳ Compiling…' : '✦ Add & Compile with AI'}
            </button>
            <button onClick={() => save(false)} disabled={status==='saving'||status==='compiling'}
              className="text-sm bg-[#182118] border border-white/[0.08] text-[#6b8f6b] px-4 py-2 rounded hover:text-[#d4e4d4] transition-colors disabled:opacity-40">
              {status==='saving' ? 'Saving…' : 'Save Only'}
            </button>
            {msg && <span className={`text-xs font-mono ${status==='error'?'text-[#e05252]':'text-[#3dd68c]'}`}>{msg}</span>}
          </div>
        </div>
      </div>

      {/* Sources list */}
      <div className="space-y-2">
        {sources.length > 0 ? sources.map(s => (
          <div key={s.id} className="bg-[#111a14] border border-white/[0.06] rounded-lg p-4 flex items-start gap-3 hover:border-white/10 transition-colors">
            <div className={`w-9 h-9 rounded flex items-center justify-center text-sm flex-shrink-0 ${s.compiled ? 'bg-[#3dd68c]/12 text-[#3dd68c]' : 'bg-[#f0a844]/10 text-[#f0a844]'}`}>
              {s.compiled ? '◆' : '◈'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#d4e4d4] mb-0.5">{s.title}</div>
              <div className="flex gap-3 font-mono text-[10px] text-[#6b8f6b] mb-1.5">
                <span>{s.created_at.slice(0,10)}</span>
                <span>{s.word_count?.toLocaleString() ?? '—'} words</span>
                <span>{s.source_type}</span>
                {s.url && <span>{new URL(s.url).hostname}</span>}
              </div>
              <p className="text-xs text-[#6b8f6b] line-clamp-2 leading-relaxed">{s.raw_content.slice(0,120)}…</p>
              {(s.tags ?? []).length > 0 && (
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {s.tags.map(t => <span key={t} className="font-mono text-[9px] bg-[#1e2b1e] text-[#6b8f6b] px-1.5 py-0.5 rounded border border-white/[0.06]">{t}</span>)}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${s.compiled ? 'bg-[#3dd68c]/12 text-[#3dd68c]' : 'bg-[#f0a844]/10 text-[#f0a844]'}`}>
                {s.compiled ? 'Compiled' : 'Pending'}
              </span>
              {!s.compiled && (
                <button onClick={() => handleCompile(s.id)} disabled={compilingId === s.id}
                  className="text-[10px] bg-[#3dd68c]/10 border border-[#3dd68c]/20 text-[#3dd68c] px-2.5 py-1 rounded hover:bg-[#3dd68c]/18 transition-colors disabled:opacity-40">
                  {compilingId === s.id ? '⟳' : '✦ Compile'}
                </button>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center py-16 text-sm text-[#6b8f6b] italic">No sources yet. Paste your first article above to start building your knowledge base.</div>
        )}
      </div>
    </>
  )
}
