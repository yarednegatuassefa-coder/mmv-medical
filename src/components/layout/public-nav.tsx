'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const LINKS = [
  { href: '/treatments', label: 'Treatments' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function PublicNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#12243a]/95 text-white shadow-[0_8px_30px_rgba(10,25,40,0.08)] backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-[76px] md:px-12">
        <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="MMV Medical home">
          <span className="flex h-9 w-9 items-center justify-center border border-[#c8a45a]/60 font-display text-lg text-[#e3c98d]">M</span>
          <span className="font-display text-[21px] font-semibold tracking-tight text-white">MMV<span className="text-[#d5b879]">Medical</span></span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map(link => (
            <Link key={link.href} href={link.href} className="text-[13px] font-medium text-white/65 transition hover:text-[#e3c98d]">
              {link.label}
            </Link>
          ))}
          <Link href="/#consultation" className="group inline-flex items-center gap-2 bg-[#d5b879] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#12243a] transition hover:bg-[#e7d2a1]">
            Speak with us <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-[#d5b879]/60 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#12243a] px-5 pb-6 pt-3 md:hidden">
          {LINKS.map(link => (
            <Link key={link.href} href={link.href} className="block border-b border-white/10 py-4 text-sm text-white/75" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/#consultation" className="mt-5 flex items-center justify-center gap-2 bg-[#d5b879] py-3.5 text-xs font-bold uppercase tracking-widest text-[#12243a]" onClick={() => setOpen(false)}>
            Start an enquiry <ArrowUpRight size={15} />
          </Link>
        </div>
      )}
    </header>
  )
}
