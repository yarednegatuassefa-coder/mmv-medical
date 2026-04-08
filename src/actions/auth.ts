'use server'

import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/lib/validations/schemas'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const data = Object.fromEntries(formData)
  const parsed = loginSchema.safeParse(data)
  if (!parsed.success) return { error: 'Invalid email or password format' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) return { error: 'Invalid credentials' }
  redirect('/app/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function getSession() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
