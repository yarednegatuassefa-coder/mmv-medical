import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#12243a',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mmvmedical.health'),
  title: {
    default: 'MMV Medical — World-Class Dental Care in Istanbul',
    template: '%s | MMV Medical',
  },
  description: 'Save up to 70% on dental implants, veneers, and full-arch restorations in Istanbul. Expert coordination for UK, Ireland, Netherlands, Belgium and Romania patients.',
  keywords: ['dental implants Istanbul','Turkey dental tourism','veneers Istanbul','cheap dental implants','MMV Medical'],
  authors: [{ name: 'MMV Medical' }],
  creator: 'MMV Medical',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'MMV Medical',
    title: 'MMV Medical — World-Class Dental Care in Istanbul',
    description: 'Save up to 70% on dental treatment. Expert English-speaking coordination from your first enquiry to your final smile.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MMV Medical — Dental Tourism Istanbul',
    description: 'Save up to 70% on dental implants & veneers in Istanbul. Trusted by UK, Irish & European patients.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts loaded at runtime — works in all environments */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
