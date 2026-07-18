import Link from 'next/link'
import type { Metadata } from 'next'
import { Certificate, HeartStraight, MapTrifold, UsersThree } from '@phosphor-icons/react/dist/ssr'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Gretza Roman',
  description: `Meet Gretza Roman — real estate agent and loan specialist serving the ${site.serviceArea.toLowerCase()}. Credentials, philosophy, and service area.`,
}

const credentials = [
  { icon: Certificate, text: 'Licensed real estate salesperson' },
  { icon: Certificate, text: 'Licensed mortgage loan originator (NMLS)' },
  { icon: UsersThree, text: '200+ families guided to closing' },
  { icon: HeartStraight, text: 'First-time buyer specialist' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="text-4xl font-semibold text-stone-900 md:text-5xl">
            Hi, I&apos;m Gretza.
          </h1>
          {/* TODO: Replace this bio with Gretza's real story, license numbers,
              and headshot (a Higgsfield-generated placeholder is fine until a
              real photo shoot). */}
          <div className="mt-6 max-w-[65ch] space-y-4 text-base leading-relaxed text-stone-600">
            <p>
              I started {site.name} because I kept watching the same thing
              happen: buyers with modest budgets getting rushed, and buyers with
              big budgets getting sold instead of advised. Neither felt right.
            </p>
            <p>
              Holding both a real estate license and a loan originator license
              means I can walk you through the whole journey — what you can
              afford, which loan program actually fits, which houses are worth
              your Saturday, and what to offer when you find the one. One person,
              one plan, no hand-offs.
            </p>
            <p>
              About half of my clients are first-time buyers. The other half
              range from growing families to retirees buying their coastal
              dream. The budgets differ; the care doesn&apos;t.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {credentials.map((c) => (
              <li
                key={c.text}
                className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm font-medium text-stone-800 shadow-sm shadow-stone-300/50"
              >
                <c.icon size={22} className="shrink-0 text-teal-700" aria-hidden />
                {c.text}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-3xl bg-stone-100 p-8">
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-teal-800">
            <MapTrifold size={18} aria-hidden /> Service area
          </p>
          <h2 className="mt-3 text-xl font-semibold text-stone-900">
            {site.serviceArea}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Including Maple Glen, Fairhaven, Brookfield, Westbrook Village,
            Seagrove, and Highland Park. Outside the area? Ask anyway — I have a
            referral network of agents I trust.
          </p>
          <div className="mt-6 border-t border-stone-200 pt-6">
            <p className="text-sm font-semibold text-stone-900">Office</p>
            <p className="mt-1 text-sm text-stone-600">{site.officeAddress}</p>
            <p className="mt-3 text-sm font-semibold text-stone-900">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block text-sm text-teal-800 hover:underline"
            >
              {site.email}
            </a>
            <p className="mt-3 text-sm font-semibold text-stone-900">Phone</p>
            <a href={site.phoneHref} className="mt-1 block text-sm text-teal-800 hover:underline">
              {site.phone}
            </a>
          </div>
          <Link
            href="/contact"
            className="mt-8 block rounded-full bg-teal-700 px-6 py-3 text-center text-base font-semibold text-white transition-all hover:bg-teal-800 active:scale-[0.98]"
          >
            Say hello
          </Link>
        </aside>
      </div>
    </div>
  )
}
