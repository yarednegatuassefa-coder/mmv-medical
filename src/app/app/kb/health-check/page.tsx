import type { Metadata } from 'next'
import { KbHealthClient } from './kb-health-client'

export const metadata: Metadata = { title: 'KB Health Check | MMV Medical' }

export default function KbHealthPage() {
  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-lg font-bold text-white mb-1">Knowledge Base Health Check</h1>
        <p className="text-sm text-[#6b8f6b]">AI analyses your compiled articles to find gaps, strengths, and what to add next.</p>
      </div>
      <KbHealthClient />
    </div>
  )
}
