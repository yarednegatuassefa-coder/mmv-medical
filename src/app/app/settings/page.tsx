import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SettingsClient } from './settings-client'

export const metadata: Metadata = { title: 'Settings | MMV Medical' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-lg font-bold text-white mb-1">Settings</h1>
      <p className="text-sm text-[#6b8f6b] mb-6">Manage your profile and application preferences.</p>
      <SettingsClient profile={profile!} email={user!.email ?? ''} />
    </div>
  )
}
