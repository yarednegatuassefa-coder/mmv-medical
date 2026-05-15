'use client'

export default function ManageCookiesButton() {
  return (
    <button
      onClick={() => {
        // @ts-ignore
        if (typeof window !== 'undefined' && window.Cookiebot) window.Cookiebot.renew()
      }}
      className="text-[#12243a] underline hover:no-underline"
    >
      Manage Cookies
    </button>
  )
}
