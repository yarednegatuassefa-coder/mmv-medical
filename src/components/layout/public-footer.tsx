import Link from 'next/link'
import { WA_NUMBER } from '@/lib/constants'

export function PublicFooter() {
  return (
    <footer className="bg-navy border-t border-gold/10 py-10 px-6 md:px-[5%]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display text-xl font-semibold text-cream mb-1">
            MMV<span className="text-gold">Medical</span>
          </div>
          <p className="text-cream/35 text-xs leading-relaxed max-w-xs">
            Helping European patients access world-class dental care in Istanbul.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex gap-6">
            {[
              { href: '/treatments', label: 'Treatments' },
              { href: '/calculator', label: 'Calculator' },
              { href: '/about',      label: 'About' },
              { href: '/contact',    label: 'Contact' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-cream/40 text-xs hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25d366]/10 border border-[#25d366]/25 text-[#25d366] text-xs px-4 py-2 rounded-sm hover:bg-[#25d366]/20 transition-colors"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gold/10 text-cream/25 text-xs">
        © {new Date().getFullYear()} MMV Medical. All rights reserved.
      </div>
    </footer>
  )
}
