import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { KbSourcesClient } from './kb-sources-client'

export const metadata: Metadata = { title: 'KB Sources | MMV Medical' }

export default async function KbSourcesPage() {
  const supabase = await createClient()
  const { data: sources } = await supabase
    .from('kb_sources').select('*').is('deleted_at', null)
    .order('created_at', { ascending: false })

  return <div className="p-6"><KbSourcesClient sources={sources ?? []} /></div>
}
