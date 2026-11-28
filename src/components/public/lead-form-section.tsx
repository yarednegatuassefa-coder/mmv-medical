'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { capturePublicLead } from '@/actions/leads'
import { COUNTRIES, ENQUIRY_TOPICS, WA_NUMBER } from '@/lib/constants'

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
      treatment_interest: fd.get('coordination_topic') as string,
      response_consent: fd.get('response_consent') === 'on',
      marketing_consent: fd.get('marketing_consent') === 'on',
      website: fd.get('website') as string || undefined,
      _ts: tsRef.current,
    }

    try {
      const result = await capturePublicLead(data as any)
      if (result.success) {
        const msg = encodeURIComponent(
          'Hello MMV Medical — I submitted an enquiry through your website. I would like to understand the coordination process.'
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
          Thank you. A coordinator will review your enquiry. MMV is currently building its provider network and cannot promise clinic availability or a treatment booking. Any clinical assessment and treatment decision must come from a licensed treating provider.
        </p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25d366] text-white font-semibold text-sm px-6 py-3 rounded-sm hover:bg-[#1db954] transition-colors">
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
            'Help organising non-clinical questions',
            'No obligation to continue',
            'No clinic partnership or treatment availability is implied',
            'Clinical decisions stay with the treating provider',
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
        <p className="text-navy/45 text-xs mb-5">Share contact details and the type of coordination information you need. Do not submit health information.</p>

        <form {...({ toolname: "mmv-prepare-enquiry", tooldescription: "Help the user prepare a non-clinical enquiry to MMV Medical. Do not include medical records or sensitive health information. The user must review and submit the form." } as any)} onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Full Name *</label>
              <input name="full_name" required autoComplete="name" maxLength={100} className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Country *</label>
              <select name="country" required defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
                <option value="" disabled>Select</option>
                {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">Email *</label>
            <input name="email" type="email" required autoComplete="email" maxLength={254} className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="your@email.com" />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">WhatsApp *</label>
            <input name="whatsapp" type="tel" required autoComplete="tel" maxLength={20} className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal" placeholder="+44 7700 000000" />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-navy/50 mb-1">What would you like help with? *</label>
            <select name="coordination_topic" required defaultValue="" className="w-full border border-cream-dark rounded px-3 py-2 text-sm text-navy outline-none focus:border-teal bg-white">
              <option value="" disabled>Select a topic</option>
              {ENQUIRY_TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="space-y-3 rounded border border-cream-dark bg-[#faf9f6] p-3">
            <label className="flex items-start gap-2 text-xs leading-5 text-navy/70">
              <input type="checkbox" name="response_consent" required className="mt-1" />
              <span>I agree that MMV Medical may use these contact details and my selected enquiry topic to respond to this request. I have read the <Link href="/privacy-policy" className="underline">Privacy Notice</Link>. *</span>
            </label>
            <label className="flex items-start gap-2 text-xs leading-5 text-navy/60">
              <input type="checkbox" name="marketing_consent" className="mt-1" />
              <span>I would also like to receive occasional updates from MMV Medical. This is optional and can be withdrawn at any time.</span>
            </label>
          </div>

          {state === 'error' && <p role="alert" aria-live="assertive" className="text-red-500 text-xs bg-red-50 border border-red-200 px-3 py-2 rounded">{errorMsg}</p>}

          <button type="submit" disabled={state === 'loading'} className="w-full bg-navy text-gold font-semibold text-sm tracking-wide uppercase py-3 rounded-sm hover:bg-navy-mid transition-colors disabled:opacity-50">
            {state === 'loading' ? 'Sending...' : 'Send Enquiry →'}
          </button>
          <p className="text-navy/45 text-xs text-center leading-relaxed">Your details are used to respond to this enquiry. Marketing updates are optional. Do not include medical records, diagnoses, symptoms, passport details or payment information.</p>
        </form>
      </div>
    </div>
  )
}
