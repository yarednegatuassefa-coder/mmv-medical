import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { KbArticlesClient } from './kb-articles-client'

export const metadata: Metadata = { title: 'KB Articles | MMV Medical' }

export default async function KbArticlesPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('kb_articles')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  return <div className="p-6"><KbArticlesClient articles={articles ?? []} /></div>
}
