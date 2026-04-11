'use client'

import { useState } from 'react'
import { login } from '@/actions/auth'

export function LoginForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const result = await login(fd)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono tracking-wider uppercase text-cream/40 mb-1.5">Email</label>
        <input name="email" type="email" required autoComplete="email"
          className="w-full bg-navy border border-white/10 rounded px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/50 placeholder:text-cream/20"
          placeholder="your@email.com" />
      </div>
      <div>
        <label className="block text-xs font-mono tracking-wider uppercase text-cream/40 mb-1.5">Password</label>
        <input name="password" type="password" required autoComplete="current-password"
          className="w-full bg-navy border border-white/10 rounded px-3 py-2.5 text-sm text-cream outline-none focus:border-gold/50 placeholder:text-cream/20"
          placeholder="••••••••" />
      </div>
      {error && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-3 py-2 rounded">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full bg-gold text-navy font-semibold text-sm tracking-wide uppercase py-3 rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
