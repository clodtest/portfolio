import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clod Salvador — AI Automation Specialist',
  description:
    'Chat with my AI avatar — I build intelligent automation systems that eliminate manual bottlenecks and scale businesses. N8N · Make.com · GoHighLevel · ChatGPT.',
  openGraph: {
    title: 'Clod Salvador — AI Automation Specialist',
    description:
      'AI-powered portfolio. Ask me anything about my projects, skills, or how I can automate your business.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clod Salvador — AI Automation Specialist',
    description: 'AI-powered portfolio. Chat with my AI to learn how I can automate your business.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'light') document.documentElement.classList.add('light');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
