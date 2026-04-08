import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PipelineBoard } from './pipeline-board'

export const metadata: Metadata = { title: 'Pipeline | MMV Medical' }

export default async function PipelinePage() {
  const supabase = await createClient() as any

  const { data: leads } = await supabase
    .from('leads')
    .select('id,full_name,country,treatment,stage,whatsapp')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 overflow-x-auto min-h-screen">
      <PipelineBoard leads={leads ?? []} />
    </div>
  )
}
