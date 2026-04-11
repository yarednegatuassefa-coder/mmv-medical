'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types/database'

export function SettingsClient({ profile, email }: { profile: Profile; email: string }) {
  const [fullName, setFullName] = useState(profile.full_name)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const inp = 'bg-[#1e2b1e] border border-white/[0.08] rounded px-3 py-2 text-sm text-[#d4e4d4] outline-none focus:border-[#3dd68c]/40 w-full'

  async function saveProfile() {
    setSaving(true)
    const supabase = createClient() as any
    const { error } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', profile.id)
    setSaving(false)
    if (error) { setMsg(`Error: ${error.message}`); return }
    setMsg('✓ Profile saved')
    router.refresh()
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="space-y-5">
      {/* Profile */}
      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b]">Profile</div>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-1.5">Full Name</label>
            <input className={inp} value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-1.5">Email</label>
            <input className={`${inp} opacity-50 cursor-not-allowed`} value={email} readOnly />
            <p className="text-[10px] text-[#6b8f6b] mt-1">Email cannot be changed here. Contact Supabase admin.</p>
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-1.5">Role</label>
            <input className={`${inp} opacity-50 cursor-not-allowed`} value={profile.role} readOnly />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button onClick={saveProfile} disabled={saving}
              className="text-sm bg-[#3dd68c] text-[#0d1117] font-semibold px-5 py-2 rounded hover:bg-[#52e09e] transition-colors disabled:opacity-40">
              {saving ? 'Saving…' : 'Save Profile'}
            </button>
            {msg && <span className={`text-xs font-mono ${msg.startsWith('Error') ? 'text-[#e05252]' : 'text-[#3dd68c]'}`}>{msg}</span>}
          </div>
        </div>
      </div>

      {/* Environment info */}
      <div className="bg-[#111a14] border border-white/[0.06] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b]">Environment</div>
        </div>
        <div className="p-4 space-y-3 text-sm">
          {[
            { label: 'Supabase URL',    key: 'NEXT_PUBLIC_SUPABASE_URL' },
            { label: 'Site URL',        key: 'NEXT_PUBLIC_SITE_URL' },
            { label: 'WhatsApp Number', key: 'NEXT_PUBLIC_WA_NUMBER' },
          ].map(e => (
            <div key={e.key}>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-0.5">{e.label}</div>
              <div className="font-mono text-xs text-[#d4e4d4]/60">{process.env[e.key] ?? `Set ${e.key} in .env.local`}</div>
            </div>
          ))}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#6b8f6b] mb-0.5">Anthropic API</div>
            <div className={`font-mono text-xs ${process.env.ANTHROPIC_API_KEY ? 'text-[#3dd68c]' : 'text-[#e05252]'}`}>
              {process.env.ANTHROPIC_API_KEY ? '✓ Configured (server-side)' : '✕ ANTHROPIC_API_KEY not set'}
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-[#111a14] border border-[#e05252]/20 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-[#e05252]/15">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#e05252]">Danger Zone</div>
        </div>
        <div className="p-4">
          <p className="text-xs text-[#6b8f6b] mb-3">Destructive actions. Cannot be undone.</p>
          <div className="flex gap-3">
            <a href="/login" className="text-xs bg-[#e05252]/10 border border-[#e05252]/20 text-[#e05252] px-4 py-2 rounded hover:bg-[#e05252]/18 transition-colors">
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
