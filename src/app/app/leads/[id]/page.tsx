import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LeadDetailClient } from './lead-detail-client'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient() as any
  const { data } = await supabase.from('leads').select('full_name').eq('id', id).single()
  return { title: data ? `${data.full_name} | MMV CRM` : 'Lead | MMV CRM' }
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient() as any

  const [{ data: leadData }, { data: activitiesData }, { data: notesData }] = await Promise.all([
    supabase.from('leads').select('*').eq('id', id).single(),
    supabase.from('lead_activities').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
    supabase.from('lead_notes').select('*, profiles(full_name)').eq('lead_id', id).order('created_at', { ascending: false }),
  ])

  if (!leadData) notFound()

  return (
    <div className="p-6">
      <LeadDetailClient lead={leadData} activities={activitiesData ?? []} notes={notesData ?? []} />
    </div>
  )
}
