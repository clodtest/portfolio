import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  ChatCircleText,
  HandCoins,
  Quotes,
  SealCheck,
} from '@phosphor-icons/react/dist/ssr'
import HeroCarousel from '@/components/site/HeroCarousel'
import PropertyCard from '@/components/site/PropertyCard'
import { featuredListings, priceBands } from '@/lib/listings'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: `${site.name} — Real Estate & Mortgage Help for Every Budget`,
  description: site.description,
}

const testimonials = [
  {
    quote:
      'We were nervous first-time buyers with a modest budget, and Gretza never made us feel like a small client. She found us a townhouse we love and walked us through an FHA loan step by step.',
    name: 'Marisol & Danny T.',
    context: 'First-time buyers, Maple Glen',
  },
  {
    quote:
      'Selling our estate and buying on the coast in the same season felt impossible. Gretza coordinated both closings and the bridge financing without a single missed date.',
    name: 'The Okafor family',
    context: 'Luxury sellers & coastal buyers, Seagrove',
  },
  {
    quote:
      'As a veteran I qualified for a VA loan but had no idea where to start. One call and I had a clear plan, a pre-approval, and keys eight weeks later.',
    name: 'Reggie P.',
    context: 'VA loan buyer, Brookfield',
  },
]

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      {/* Homes for every budget */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl">
            Homes for every budget
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Whether it&apos;s your first place or your forever estate, start with
            the price range that fits your life.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {priceBands.map((band, i) => (
            <Link
              key={band.value}
              href={`/listings?band=${band.value}`}
              className="fade-up group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-300/50 transition-all hover:border-teal-700/40 hover:shadow-md hover:shadow-stone-300/60 active:scale-[0.99]"
              style={{ '--index': i } as React.CSSProperties}
            >
              <p className="text-2xl font-semibold tabular-nums text-teal-800">
                {band.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{band.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-transform group-hover:translate-x-0.5">
                Browse homes <ArrowRight size={16} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Loan services teaser */}
      <section className="bg-teal-900">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-teal-300">
              <HandCoins size={18} aria-hidden /> Loans &amp; financing
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              The right loan matters as much as the right house
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-teal-100">
              We help you compare conventional, FHA, VA, and first-time-buyer
              programs — and get pre-approved before you fall in love with a
              listing. No jargon, no pressure, just a clear number you can shop
              with.
            </p>
            <Link
              href="/loans"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-teal-900 transition-all hover:bg-teal-50 active:scale-[0.98]"
            >
              Explore loan options <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <ul className="grid gap-4">
            {[
              'Pre-approval letters, often within 48 hours',
              'First-time buyer and down-payment assistance programs',
              'Refinancing check-ups for current homeowners',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-white/10 px-5 py-4 text-teal-50"
              >
                <SealCheck
                  size={22}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-teal-300"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured listings */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl">
              Featured listings
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-600">
              A few homes we&apos;re excited about right now, across every price
              range we serve.
            </p>
          </div>
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-teal-700 hover:text-teal-800"
          >
            View all listings <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.slice(0, 6).map((listing, i) => (
            <PropertyCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-stone-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="max-w-xl text-3xl font-semibold text-stone-900 md:text-4xl">
            Buyers of every kind, treated the same way
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className="fade-up flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-300/50"
                style={{ '--index': i } as React.CSSProperties}
              >
                <Quotes size={28} weight="fill" className="text-teal-700/40" aria-hidden />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-stone-700">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-stone-100 pt-4">
                  <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.context}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA band */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-teal-700 px-8 py-12 sm:flex-row sm:items-center md:px-12">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-teal-200">
              <ChatCircleText size={18} aria-hidden /> Let&apos;s talk
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Not sure where to start? That&apos;s what the first call is for.
            </h2>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-teal-900 transition-all hover:bg-teal-50 active:scale-[0.98]"
          >
            Contact {site.shortName}
          </Link>
        </div>
      </section>
    </>
  )
}
