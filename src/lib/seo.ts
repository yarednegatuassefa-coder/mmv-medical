import type { Metadata } from 'next'

import { SITE_URL } from '@/lib/constants'

export const SOCIAL_IMAGE = {
  url: '/images/istanbul-bosphorus-hero.jpg',
  width: 1824,
  height: 2280,
  alt: 'Editorial view of Istanbul across the Bosphorus at golden hour',
}

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: typeof SOCIAL_IMAGE
}

export function pageMetadata({ title, description, path, image = SOCIAL_IMAGE }: PageMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString()

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'MMV Medical',
      title: `${title} | MMV Medical`,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | MMV Medical`,
      description,
      images: [image.url],
    },
  }
}
