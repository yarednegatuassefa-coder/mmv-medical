import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LeadDetailClient } from './lead-detail-client'
import type { Lead, LeadActivity, LeadNote } from '@/types/database'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient() as any
  const { data } = await supabase.from('leads').select('full_name').eq('id', id).single()
  const lead = data as Pick<Lead,'full_name'> | null
  return { title: lead ? `${lead.full_name} | MMV CRM` : 'Lead | MMV CRM' }
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient() as any

  const [{ data: leadData }, { data: activitiesData }, { data: notesData }] = await Promise.all([
    supabase.from('leads').select('*').eq('id', id).is('deleted_at', null).single(),
    supabase.from('lead_activities').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
    supabase.from('lead_notes').select('*, profiles(full_name)').eq('lead_id', id).is('deleted_at', null).order('created_at', { ascending: false }),
  ])

  if (!leadData) notFound()

  const lead       = leadData       as Lead
  const activities = (activitiesData ?? []) as LeadActivity[]
  const notes      = (notesData     ?? []) as (LeadNote & { profiles: { full_name: string } | null })[]

  return (
    <div className="p-6">
      <LeadDetailClient lead={lead} activities={activities} notes={notes} />
    </div>
  )
}
