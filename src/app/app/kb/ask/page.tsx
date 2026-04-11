import type { Metadata } from 'next'
import { KbAskClient } from './kb-ask-client'

export const metadata: Metadata = { title: 'Ask KB | MMV Medical' }

export default function KbAskPage() {
  return <div className="p-6 h-[calc(100vh-55px)] flex flex-col"><KbAskClient /></div>
}
