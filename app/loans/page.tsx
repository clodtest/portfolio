import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Bank,
  Handshake,
  HouseLine,
  Medal,
  ArrowsClockwise,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr'
import MortgageCalculator from '@/components/site/MortgageCalculator'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mortgage & Loan Services',
  description:
    'Pre-approvals, conventional, FHA, VA, and first-time buyer loan programs, plus refinancing. Estimate your monthly payment with our mortgage calculator.',
}

const loanTypes = [
  {
    icon: Bank,
    name: 'Conventional loans',
    blurb:
      'The most common path for buyers with steady income and fair-to-strong credit. Down payments start around 3–5%.',
  },
  {
    icon: HouseLine,
    name: 'FHA loans',
    blurb:
      'Backed by the FHA to make qualifying easier — lower down payments and more flexible credit requirements.',
  },
  {
    icon: Medal,
    name: 'VA loans',
    blurb:
      'For veterans, active-duty service members, and eligible spouses. Often zero down payment and no mortgage insurance.',
  },
  {
    icon: Sparkle,
    name: 'First-time buyer programs',
    blurb:
      'State and local programs with down-payment assistance and reduced rates. We help you find the ones you qualify for.',
  },
  {
    icon: ArrowsClockwise,
    name: 'Refinancing',
    blurb:
      'Already own? We review whether a new rate or term could lower your payment or pull equity for a project.',
  },
]

export default function LoansPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-stone-900 md:text-5xl">
          Mortgage &amp; loan services
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600">
          Financing shouldn&apos;t be the scary part of buying a home. We explain
          your options in plain language, help you get pre-approved early, and
          stay with you through closing day. {site.name} works with buyers at
          every budget — the process gets the same care at $250K as it does at
          $2M.
        </p>
      </div>

      {/* Loan types */}
      <section className="mt-14" aria-labelledby="loan-types-heading">
        <h2 id="loan-types-heading" className="text-2xl font-semibold text-stone-900 md:text-3xl">
          Loan programs we work with
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loanTypes.map((loan, i) => (
            <div
              key={loan.name}
              className="fade-up rounded-2xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-300/50"
              style={{ '--index': i } as React.CSSProperties}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700/10 text-teal-800">
                <loan.icon size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-stone-900">{loan.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{loan.blurb}</p>
            </div>
          ))}
          <div
            className="fade-up flex flex-col justify-between rounded-2xl bg-teal-700 p-6"
            style={{ '--index': 5 } as React.CSSProperties}
          >
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                <Handshake size={24} aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">Not sure which fits?</h3>
              <p className="mt-2 text-sm leading-relaxed text-teal-100">
                A 15-minute call is usually enough to narrow it down to one or
                two programs.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-teal-900 transition-all hover:bg-teal-50 active:scale-[0.98]"
            >
              Ask us <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]" aria-labelledby="calc-heading">
        <div>
          <h2 id="calc-heading" className="text-2xl font-semibold text-stone-900 md:text-3xl">
            What would your payment look like?
          </h2>
          <p className="mt-3 max-w-[50ch] text-base leading-relaxed text-stone-600">
            Play with the numbers to get a feel for your monthly payment. When
            you&apos;re ready for real rates, a pre-approval gives you an exact
            figure — and makes your offers stronger.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-stone-700">
            <li className="flex gap-2">
              <span className="font-semibold text-teal-800">1.</span>
              Estimate a comfortable monthly payment here
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-teal-800">2.</span>
              Get pre-approved so sellers take your offer seriously
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-teal-800">3.</span>
              Shop with confidence inside your real budget
            </li>
          </ul>
        </div>
        <MortgageCalculator />
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-3xl bg-stone-100 px-8 py-12 text-center md:px-12">
        <h2 className="text-2xl font-semibold text-stone-900 md:text-3xl">
          Ready to get pre-approved?
        </h2>
        <p className="mx-auto mt-3 max-w-[55ch] text-base leading-relaxed text-stone-600">
          Send us a note and we&apos;ll set up a quick call — most buyers walk
          away from it with a clear plan and a document checklist.
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-block rounded-full bg-teal-700 px-8 py-3.5 text-base font-semibold text-white shadow-sm shadow-teal-900/20 transition-all hover:bg-teal-800 active:scale-[0.98]"
        >
          Start my pre-approval
        </Link>
      </section>
    </div>
  )
}
