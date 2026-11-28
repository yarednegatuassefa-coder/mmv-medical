'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { capturePublicLead } from '@/actions/leads'
import { COUNTRIES, TREATMENTS, BUDGET_RANGES, TRAVEL_MONTHS, WA_NUMBER } from '@/lib/constants'

export function LeadFormSection() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [waUrl, setWaUrl] = useState('')
  const tsRef = useRef(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const data = {
      full_name: fd.get('full_name') as string,
      email: fd.get('email') as string,
      whatsapp: fd.get('whatsapp') as string,
      country: fd.get('country') as string,
      treatment_interest: fd.get('treatment_interest') as string,
      budget_range: fd.get('budget_range') as string || undefined,
      preferred_travel_month: fd.get('preferred_travel_month') as string || undefined,
      contact_consent: fd.get('contact_consent') === 'on',
      crm_consent: fd.get('crm_consent') === 'on',
      website: fd.get('website') as string || undefined,
      _ts: tsRef.current,
    }

    try {
      const result = await capturePublicLead(data)

      if (result.success) {
        const msg = encodeURIComponent(
          'Hello MMV Medical. I submitted an enquiry through your website and would like to discuss the coordination process.'
        )
        setWaUrl(`https://wa.me/${WA_NUMBER}?text=${msg}`)
        setState('success')
      } else {
        setErrorMsg(result.error ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMsg('We could not send your enquiry. Your details remain in the form; please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="max-w-lg bg-white border border-cream-dark rounded-lg p-8 text-center">
        <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
        <h3 className="font-display text-2xl font-semibold text-navy mb-2">Request Received</h3>
        <p className="text-navy/55 text-sm leading-relaxed mb-6">
          Thank you. Your enquiry has been recorded. A coordinator can review it and respond using the contact details you supplied. Clinical recommendations and final pricing must come from the treating provider.
        </p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25d366] text-white font-semibold text-sm px-6 py-3 rounded-sm hover:bg-[#1db954] transition-colors">
          💬 Continue on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div>
        <ul className="space-y-3">
          {[
            'A coordinator reviews your enquiry',
            'Help organising questions for the clinic',
            'No obligation to continue',
            'Clinical decisions stay with the treating provider',
            'No medical records needed for this first step',
          ].map(p => (
            <li key={p} className="flex items-center gap-3 text-navy/70 text-sm">
              <span className="w-5 h-5 rounded-full bg-teal flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-cream-dark rounded-lg p-6 shadow-sm">
        <h3 className="font-display text-xl font-semibold text-navy mb-1">Send an Enquiry</h3>
        <p className="text-navy/45 text-xs mb-5">Share only the contact and planning details needed for an initial response.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="mmv-full-name" className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Full Name *</label>
              <input id="mmv-full-name" name="full_name" required minLength={2} maxLength={100} autoComplete="name" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="mmv-country" className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Country *</label>
              <select id="mmv-country" name="country" required defaultValue="" autoComplete="country-name" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
                <option value="" disabled>Select</option>
                {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="mmv-email" className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Email *</label>
            <input id="mmv-email" name="email" type="email" required autoComplete="email" maxLength={254} className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="your@email.com" />
          </div>

          <div>
            <label htmlFor="mmv-whatsapp" className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">WhatsApp *</label>
            <input id="mmv-whatsapp" name="whatsapp" type="tel" required autoComplete="tel" minLength={7} maxLength={20} pattern="\+?[0-9\s()-]+" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="+44 7700 000000" />
          </div>

          <div>
            <label htmlFor="mmv-treatment" className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Treatment Interest *</label>
            <select id="mmv-treatment" name="treatment_interest" required defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
              <option value="" disabled>Select treatment area</option>
              {TREATMENTS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="mmv-budget" className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Budget Range (optional)</label>
              <select id="mmv-budget" name="budget_range" defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
                <option value="">Prefer not to say</option>
                {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="mmv-travel-month" className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Travel Month (optional)</label>
              <select id="mmv-travel-month" name="preferred_travel_month" defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
                <option value="">Flexible</option>
                {TRAVEL_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <fieldset className="space-y-3 border-t border-cream-dark pt-4">
            <legend className="sr-only">Privacy and data choices</legend>
            <label className="flex items-start gap-3 text-xs leading-5 text-navy/65">
              <input name="contact_consent" type="checkbox" required className="mt-1 h-4 w-4 flex-shrink-0 accent-teal" />
              <span>I agree that MMV Medical may use the details above to respond to this enquiry, as explained in the <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-navy">Privacy Notice</Link>. *</span>
            </label>
            <label className="flex items-start gap-3 text-xs leading-5 text-navy/65">
              <input name="crm_consent" type="checkbox" className="mt-1 h-4 w-4 flex-shrink-0 accent-teal" />
              <span>Optional: I agree that my contact and enquiry details may also be transferred to MMV's HubSpot workspace for enquiry management. This choice is separate and does not affect my request.</span>
            </label>
          </fieldset>

          {state === 'error' && (
            <p role="alert" aria-live="assertive" className="text-red-500 text-xs bg-red-50 border border-red-200 px-3 py-2 rounded">{errorMsg}</p>
          )}

          <button type="submit" disabled={state === 'loading'} className="w-full bg-navy text-gold font-semibold text-sm tracking-wide uppercase py-3 rounded-sm hover:bg-navy-mid transition-colors disabled:opacity-50">
            {state === 'loading' ? 'Sending...' : 'Send Enquiry →'}
          </button>

          <p className="text-navy/45 text-xs text-center leading-relaxed">
            Do not submit medical records, diagnoses, X-rays, passport details or other sensitive information through this form.
          </p>
        </form>
      </div>
    </div>
  )
}
