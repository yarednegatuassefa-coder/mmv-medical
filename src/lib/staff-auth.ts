import { createClient } from '@/lib/supabase/server'

export async function getStaffUser() {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return null

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('approved, role')
    .eq('id', user.id)
    .maybeSingle()

  if (profileError || profile?.approved !== true) return null
  if (profile.role !== 'admin' && profile.role !== 'manager') return null

  return { user, role: profile.role as 'admin' | 'manager' }
}
