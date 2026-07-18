import type { Metadata } from 'next'
import { EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react/dist/ssr'
import ContactForm from '@/components/site/ContactForm'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Reach ${site.name} by phone, email, or the contact form. We usually reply within one business day.`,
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-stone-900 md:text-5xl">
        Let&apos;s find your place
      </h1>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-stone-600">
        Buying, selling, or just wondering what you could afford — send a note
        and we&apos;ll get back to you within one business day.
      </p>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-300/50 sm:p-8">
          <ContactForm />
        </div>

        <div className="space-y-8">
          <ul className="space-y-4">
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4 transition-colors hover:border-teal-700/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-700/10 text-teal-800">
                  <Phone size={22} aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-stone-500">Call or text</span>
                  <span className="block font-semibold text-stone-900">{site.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4 transition-colors hover:border-teal-700/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-700/10 text-teal-800">
                  <EnvelopeSimple size={22} aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-stone-500">Email</span>
                  <span className="block font-semibold text-stone-900">{site.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-700/10 text-teal-800">
                <MapPin size={22} aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-stone-500">Office</span>
                <span className="block font-semibold text-stone-900">
                  {site.officeAddress}
                </span>
              </span>
            </li>
          </ul>

          <div className="overflow-hidden rounded-2xl border border-stone-200">
            {/* TODO: point this embed at the real office address once
                confirmed (currently a neutral wide-area map). */}
            <iframe
              title={`Map of the ${site.name} service area`}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-118.60%2C33.90%2C-118.10%2C34.20&layer=mapnik"
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
