'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '/treatments', label: 'Treatments' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/about',      label: 'About' },
  { href: '/contact',    label: 'Contact' },
]

export function PublicNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur border-b border-gold/15">
      <div className="max-w-6xl mx-auto px-6 md:px-[5%] h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold text-cream">
          MMV<span className="text-gold">Medical</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="text-cream/65 text-sm tracking-wide hover:text-gold transition-colors">
              {l.label}
            </Link>
          ))}
          <Link
            href="/#consultation"
            className="bg-gold text-navy text-sm font-semibold tracking-wide uppercase px-5 py-2 rounded-sm hover:bg-gold-light transition-colors"
          >
            Free Consult
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-cream/70 hover:text-cream" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-gold/10 px-6 py-4 flex flex-col gap-4">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="text-cream/70 text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/#consultation" className="bg-gold text-navy text-sm font-semibold text-center py-2.5 rounded-sm" onClick={() => setOpen(false)}>
            Free Consultation
          </Link>
        </div>
      )}
    </nav>
  )
}
