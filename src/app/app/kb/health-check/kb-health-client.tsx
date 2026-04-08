'use client'

import { useState } from 'react'
import { runKbHealthCheck } from '@/actions/kb'

interface HealthResult {
  gaps: string[]
  strengths: string[]
  opportunities: string[]
  next_sources: string[]
}

const PANELS = [
  { key: 'gaps',         label: 'Gaps — Missing Topics',  color: '#e05252', icon: '○' },
  { key: 'strengths',    label: 'Strengths',              color: '#3dd68c', icon: '○' },
  { key: 'opportunities',label: 'Opportunities',          color: '#5ba8ff', icon: '○' },
  { key: 'next_sources', label: 'Add These Sources Next', color: '#d4a84b', icon: '○' },
] as const

export function KbHealthClient() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<HealthResult | null>(null)
  const [error, setError] = useState('')
  const [ran, setRan] = useState(false)

  async function run() {
    setLoading(true)
    setError('')
    const r = await runKbHealthCheck()
    setLoading(false)
    setRan(true)
    if (r.success && r.result) {
      setResult(r.result as HealthResult)
    } else {
      setError(r.error ?? 'Health check failed')
    }
  }

  return (
    <>
      <button
        onClick={run}
        disabled={loading}
        className="flex items-center gap-2 bg-[#3dd68c] text-[#0d1117] font-semibold text-sm px-5 py-2.5 rounded hover:bg-[#52e09e] transition-colors disabled:opacity-50 mb-6"
      >
        {loading ? (
          <>
            <div className="w-3.5 h-3.5 rounded-full border-2 border-[#0d1117]/20 border-t-[#0d1117] animate-spin" />
            Analysing knowledge base…
          </>
        ) : (
          '✦ Run Health Check'
        )}
      </button>

      {error && (
        <div className="text-sm text-[#e05252] bg-[#e05252]/10 border border-[#e05252]/20 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {!ran && !loading && (
        <div className="bg-[#111a14] border border-white/[0.06] rounded-lg p-8 text-center">
          <div className="text-3xl opacity-20 mb-3">◇</div>
          <p className="text-sm text-[#6b8f6b]">Click "Run Health Check" to analyse your knowledge base.</p>
          <p className="text-xs text-[#6b8f6b]/60 mt-1">Requires at least 3 compiled articles and your Anthropic API key in environment variables.</p>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PANELS.map(p => {
            const items: string[] = result[p.key] ?? []
            return (
              <div key={p.key} className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
                  <span style={{ color: p.color }}>{p.icon}</span>
                  <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: p.color }}>
                    {p.label}
                  </div>
                </div>
                <div className="p-4">
                  {items.length > 0 ? (
                    <ul className="space-y-2.5">
                      {items.map((item, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-[#d4e4d4]/70 leading-relaxed">
                          <span className="flex-shrink-0 mt-0.5" style={{ color: p.color }}>▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-[#6b8f6b] italic">None identified</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
