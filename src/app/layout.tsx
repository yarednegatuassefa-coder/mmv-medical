import type { Metadata, Viewport } from 'next'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'
import './globals.css'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export const viewport: Viewport = {
  themeColor: '#12243a',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mmvmedical.org'),
  title: {
    default: 'MMV Medical — Dental Care Coordination in Istanbul',
    template: '%s | MMV Medical',
  },
  description: 'Explore dental treatment options in Istanbul with personal coordination for international patients. Start with an informed, no-obligation conversation.',
  keywords: ['dental care coordination Istanbul','dental tourism Türkiye','dental implants Istanbul','MMV Medical'],
  authors: [{ name: 'MMV Medical' }],
  creator: 'MMV Medical',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'MMV Medical',
    title: 'MMV Medical — Dental Care Coordination in Istanbul',
    description: 'Personal coordination for international patients exploring dental care in Istanbul.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MMV Medical — Dental Care Coordination in Istanbul',
    description: 'Dental care coordination in Istanbul for international patients.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Cookiebot — MUST be first script so it blocks GTM & HubSpot before they fire */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="5599b925-cd80-4c9a-b060-b06c928a9e4c"
          data-blockingmode="auto"
          type="text/javascript"
          async
        />
<link rel="manifest" href="/manifest.json" />
<link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        {/* Google Ads / GTM — blocked by Cookiebot until user consents */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18093103815"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18093103815');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <FloatingWhatsApp />
        {/* HubSpot Tracking — EU1 — blocked by Cookiebot until user consents */}
        <Script
          id="hubspot-tracking"
          src="//js-eu1.hs-scripts.com/147400010.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
