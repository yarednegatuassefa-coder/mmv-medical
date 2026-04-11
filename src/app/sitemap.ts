import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL

  return [
    { url: base,                     lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/treatments`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/calculator`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
