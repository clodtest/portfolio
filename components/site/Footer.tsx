import Link from 'next/link'
import { EnvelopeSimple, House, MapPin, Phone } from '@phosphor-icons/react/dist/ssr'
import { navLinks, site } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white">
              <House size={20} weight="fill" aria-hidden />
            </span>
            <span className="text-lg font-semibold text-stone-900">{site.name}</span>
          </div>
          <p className="mt-4 max-w-[45ch] text-sm leading-relaxed text-stone-600">
            Helping buyers at every price point find the right home — and the right
            loan to go with it. {site.serviceArea}.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            Explore
          </h2>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-stone-700 transition-colors hover:text-teal-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            Get in touch
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-teal-800"
              >
                <EnvelopeSimple size={16} aria-hidden />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-teal-800"
              >
                <Phone size={16} aria-hidden />
                {site.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={16} aria-hidden />
              {site.officeAddress}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Equal Housing Opportunity. Licensed real estate professional.</p>
        </div>
      </div>
    </footer>
  )
}
