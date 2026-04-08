import type { Metadata } from 'next'
import { LoginForm } from './login-form'

export const metadata: Metadata = { title: 'Sign In | MMV Medical' }

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-display text-3xl font-semibold text-cream mb-1">
            MMV<span className="text-gold">Medical</span>
          </div>
          <p className="text-cream/40 text-sm">CRM & Knowledge Base</p>
        </div>
        <div className="bg-navy-mid border border-white/10 rounded-lg p-8">
          <h1 className="font-display text-xl font-semibold text-cream mb-6">Sign in</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
