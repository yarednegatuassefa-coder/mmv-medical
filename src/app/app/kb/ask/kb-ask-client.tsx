'use client'

import { useState, useRef, useEffect } from 'react'
import { askKnowledgeBase } from '@/actions/kb'

interface Message { role: 'user'|'assistant'; content: string; citations?: {index:number;title:string}[] }

const SUGGESTIONS = [
  'What are the top dental clinics in Istanbul?',
  'How do UK prices compare to Istanbul for implants?',
  'What do patients complain about most?',
  'What treatments have the highest demand from European patients?',
  'What are the main risks in Turkish dental tourism?',
]

export function KbAskClient() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function submit(q?: string) {
    const question = (q ?? input).trim()
    if (!question) return
    setInput('')
    setLoading(true)
    setError('')
    setMessages(prev => [...prev, { role: 'user', content: question }])

    const result = await askKnowledgeBase(question)
    setLoading(false)

    if (result.success && result.answer) {
      setMessages(prev => [...prev, { role: 'assistant', content: result.answer!, citations: result.citations }])
    } else {
      setError(result.error ?? 'Query failed')
      setMessages(prev => prev.slice(0, -1))
    }
  }

  const inp = 'flex-1 bg-transparent border-none outline-none text-sm text-[#d4e4d4] placeholder:text-[#6b8f6b] resize-none'

  return (
    <>
      {/* History */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
            <div className="text-3xl opacity-20">◎</div>
            <div>
              <div className="text-base font-semibold text-[#6b8f6b] mb-1">Ask your knowledge base</div>
              <p className="text-xs text-[#6b8f6b]/60 max-w-sm">Answers come from your compiled wiki articles only. The more sources you add, the richer the answers.</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-xl">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => submit(s)}
                  className="text-xs bg-[#111a14] border border-white/[0.06] text-[#6b8f6b] px-3 py-1.5 rounded-full hover:border-[#3dd68c]/30 hover:text-[#3dd68c] transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'user' ? (
              <div className="max-w-[80%] bg-[#3dd68c]/12 border border-[#3dd68c]/15 rounded-lg px-4 py-3 text-sm text-[#d4e4d4]">
                {m.content}
              </div>
            ) : (
              <div className="max-w-[90%] bg-[#111a14] border border-white/[0.06] rounded-lg px-4 py-3">
                <div className="font-mono text-[9px] tracking-widest uppercase text-[#3dd68c] mb-2">MMV Knowledge Base</div>
                <div className="text-sm text-[#d4e4d4] leading-relaxed whitespace-pre-wrap">{m.content}</div>
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                    <div className="text-[9px] font-mono tracking-widest uppercase text-[#6b8f6b] mb-1.5">Sources</div>
                    <div className="space-y-1">
                      {m.citations.map(c => (
                        <div key={c.index} className="text-[10px] text-[#6b8f6b] font-mono">
                          <span className="text-[#3dd68c]">[{c.index}]</span> {c.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#111a14] border border-white/[0.06] rounded-lg px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-white/10 border-t-[#3dd68c] animate-spin" />
              <span className="text-xs text-[#6b8f6b]">Searching knowledge base…</span>
            </div>
          </div>
        )}

        {error && <div className="text-xs text-[#e05252] bg-[#e05252]/10 border border-[#e05252]/20 px-3 py-2 rounded">{error}</div>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg px-4 py-3 flex gap-3 items-end mt-2">
        <textarea className={inp} rows={1} placeholder="Ask anything about your knowledge base…"
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
          style={{ height: 'auto', maxHeight: '120px' }}
          onInput={e => { const t = e.currentTarget; t.style.height='auto'; t.style.height=Math.min(t.scrollHeight,120)+'px' }} />
        <button onClick={() => submit()} disabled={loading || !input.trim()}
          className="text-xs bg-[#3dd68c] text-[#0d1117] font-semibold px-4 py-1.5 rounded hover:bg-[#52e09e] transition-colors disabled:opacity-40 whitespace-nowrap flex-shrink-0">
          Ask →
        </button>
      </div>
    </>
  )
}
