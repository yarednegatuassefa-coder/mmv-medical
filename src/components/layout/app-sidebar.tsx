'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/actions/auth'
import { WA_NUMBER } from '@/lib/constants'
import {
  LayoutDashboard, GitBranch, Users, BarChart2,
  BookOpen, Settings, LogOut, MessageCircle
} from 'lucide-react'

const NAV = [
  { href: '/app/dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/app/pipeline',  label: 'Pipeline',   icon: GitBranch },
  { href: '/app/leads',     label: 'All Leads',  icon: Users },
  { href: '/app/analytics', label: 'Analytics',  icon: BarChart2 },
  { href: '/app/kb',        label: 'Knowledge Base', icon: BookOpen },
  { href: '/app/settings',  label: 'Settings',   icon: Settings },
]

interface Props {
  user: { email: string; fullName: string; role: string }
}

export function AppSidebar({ user }: Props) {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[220px] bg-[#111a14] border-r border-white/[0.06] flex flex-col z-50">
      {/* Brand */}
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <div className="font-display text-lg font-bold text-white tracking-wide">
          MMV<span className="text-[#3dd68c]">Medical</span>
        </div>
        <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b8f6b] mt-0.5">CRM v3</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/app/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all ${
                active
                  ? 'bg-[#3dd68c]/12 text-[#3dd68c] border border-[#3dd68c]/15'
                  : 'text-[#6b8f6b] hover:bg-[#182118] hover:text-[#d4e4d4] border border-transparent'
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2.5 py-3 border-t border-white/[0.06] space-y-2">
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#25d366] bg-[#25d366]/10 border border-[#25d366]/20 hover:bg-[#25d366]/18 transition-colors"
        >
          <MessageCircle size={15} />
          WhatsApp
        </a>
        <div className="px-3 py-2">
          <div className="text-[11px] text-[#d4e4d4] font-medium truncate">{user.fullName || user.email}</div>
          <div className="text-[10px] font-mono text-[#6b8f6b] uppercase tracking-wider">{user.role}</div>
        </div>
        <form action={logout}>
          <button type="submit" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#6b8f6b] hover:bg-[#182118] hover:text-[#d4e4d4] transition-all">
            <LogOut size={15} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
