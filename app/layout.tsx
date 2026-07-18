import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { site } from '@/lib/site'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Real Estate & Mortgage Help`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    title: `${site.name} — Real Estate & Mortgage Help`,
    description: site.description,
    type: 'website',
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Real Estate & Mortgage Help`,
    description: site.description,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f766e',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
