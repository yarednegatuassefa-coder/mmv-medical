import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppSidebar } from '@/components/layout/app-sidebar'
import type { Profile } from '@/types/database'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient() as any
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const profile = data as Pick<Profile, 'full_name' | 'role'> | null

  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <AppSidebar user={{
        email:    user.email ?? '',
        fullName: profile?.full_name ?? '',
        role:     profile?.role ?? 'manager',
      }} />
      <main className="flex-1 ml-[220px] min-h-screen">
        {children}
      </main>
    </div>
  )
}
