import { SITE_URL } from '@/lib/constants'

export function SiteStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'MMV Medical',
        url: SITE_URL,
        logo: `${SITE_URL}/icons/icon-512.png`,
        description: 'Patient coordination and facilitation support for people exploring dental care in Istanbul.',
        email: 'hello@mmvmedical.org',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'hello@mmvmedical.org',
          availableLanguage: ['English', 'French', 'Arabic'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'MMV Medical',
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-GB',
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
