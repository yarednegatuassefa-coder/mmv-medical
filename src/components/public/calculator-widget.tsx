'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { COUNTRIES, TREATMENTS, CALCULATOR_DATA } from '@/lib/constants'

export function CalculatorWidget() {
  const [country, setCountry] = useState('UK')
  const [treatment, setTreatment] = useState('single_implant')
  const [flights, setFlights] = useState(150)
  const [nights, setNights] = useState(3)

  const c = COUNTRIES.find(c => c.value === country) ?? COUNTRIES[0]
  const sym = c.symbol

  const result = useMemo(() => {
    const countryData = CALCULATOR_DATA[country] ?? {}
    const prices = (countryData[treatment] as { home: number; istanbul: number } | undefined) ?? { home: 2500, istanbul: 420 }
    const travelCost = flights + nights * 80
    const totalIstanbul = prices.istanbul + travelCost
    const saving = prices.home - totalIstanbul
    const pct = Math.round((saving / prices.home) * 100)
    return { home: prices.home, istanbul: prices.istanbul, travelCost, totalIstanbul, saving, pct }
  }, [country, treatment, flights, nights])

  const sel = 'w-full bg-navy border border-gold/20 text-cream text-sm rounded px-3 py-2.5 outline-none focus:border-gold/50 cursor-pointer appearance-none'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-mono tracking-widest uppercase text-cream/45 mb-2">Your Country</label>
          <select className={sel} value={country} onChange={e => setCountry(e.target.value)}>
            {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono tracking-widest uppercase text-cream/45 mb-2">Treatment</label>
          <select className={sel} value={treatment} onChange={e => setTreatment(e.target.value)}>
            {TREATMENTS.filter(t => t.value !== 'not_sure').map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono tracking-widest uppercase text-cream/45 mb-2">
            Return flights estimate — <span className="text-gold">{sym}{flights}</span>
          </label>
          <input type="range" min={0} max={500} step={25} value={flights}
            onChange={e => setFlights(Number(e.target.value))}
            className="w-full accent-gold" />
          <div className="flex justify-between text-xs text-cream/30 font-mono mt-1">
            <span>Not included</span><span>{sym}500</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono tracking-widest uppercase text-cream/45 mb-2">
            Hotel nights — <span className="text-gold">{nights} night{nights !== 1 ? 's' : ''}</span>
          </label>
          <input type="range" min={0} max={10} step={1} value={nights}
            onChange={e => setNights(Number(e.target.value))}
            className="w-full accent-gold" />
          <div className="flex justify-between text-xs text-cream/30 font-mono mt-1">
            <span>0</span><span>10 nights</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-navy-mid border border-gold/15 rounded-lg p-6">
        <div className="text-center pb-5 mb-5 border-b border-gold/10">
          <div className="text-xs font-mono tracking-widest uppercase text-cream/40 mb-2">Your Net Saving</div>
          <div className="font-display text-6xl font-bold text-teal-light">
            {result.saving > 0 ? `${sym}${result.saving.toLocaleString()}` : `${sym}0`}
          </div>
          <div className="text-cream/40 text-sm mt-1">
            {result.saving > 0 ? `Even after flights & hotel — you save ${result.pct}%` : 'Adjust travel costs to see your saving'}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {[
            { label: 'Cost at home',        value: `${sym}${result.home.toLocaleString()}`,         style: 'line-through text-cream/35' },
            { label: 'Istanbul treatment',  value: `${sym}${result.istanbul.toLocaleString()}`,      style: 'text-gold font-display text-lg' },
            { label: 'Flights + hotel',     value: result.travelCost > 0 ? `${sym}${result.travelCost.toLocaleString()}` : 'Not included', style: 'text-cream/50' },
          ].map(r => (
            <div key={r.label} className="flex justify-between items-center">
              <span className="text-sm text-cream/50">{r.label}</span>
              <span className={`font-mono text-sm ${r.style}`}>{r.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-3 border-t border-gold/10">
            <span className="text-sm text-teal-light font-medium">You save</span>
            <span className="font-display text-2xl font-bold text-teal-light">
              {result.saving > 0 ? `${sym}${result.saving.toLocaleString()}` : `${sym}0`}
            </span>
          </div>
        </div>

        <Link href="/#consultation"
          className="block w-full text-center bg-gold text-navy font-semibold text-sm tracking-wide uppercase py-3 rounded-sm hover:bg-gold-light transition-colors">
          Get My Free Treatment Plan →
        </Link>
      </div>
    </div>
  )
}
