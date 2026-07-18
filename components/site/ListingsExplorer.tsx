'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MagnifyingGlass } from '@phosphor-icons/react'
import {
  listings,
  listingTypes,
  priceBands,
  type ListingType,
  type PriceBand,
} from '@/lib/listings'
import PropertyCard from './PropertyCard'

const bandValues = priceBands.map((b) => b.value)

export default function ListingsExplorer() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rawBand = searchParams.get('band')
  const rawType = searchParams.get('type')
  const band = bandValues.includes(rawBand as PriceBand) ? (rawBand as PriceBand) : null
  const type = listingTypes.includes(rawType as ListingType) ? (rawType as ListingType) : null

  const setFilter = (key: 'band' | 'type', value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false })
  }

  const filtered = useMemo(
    () =>
      listings.filter(
        (l) => (!band || l.band === band) && (!type || l.type === type)
      ),
    [band, type]
  )

  return (
    <div>
      <div className="flex flex-col gap-5">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
            Price range
          </legend>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="All prices"
              active={band === null}
              onClick={() => setFilter('band', null)}
            />
            {priceBands.map((b) => (
              <FilterChip
                key={b.value}
                label={b.label}
                active={band === b.value}
                onClick={() => setFilter('band', b.value)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
            Property type
          </legend>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="All types"
              active={type === null}
              onClick={() => setFilter('type', null)}
            />
            {listingTypes.map((t) => (
              <FilterChip
                key={t}
                label={t}
                active={type === t}
                onClick={() => setFilter('type', t)}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <p className="mt-6 text-sm text-stone-500" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'home' : 'homes'} available
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing, i) => (
            <PropertyCard key={listing.id} listing={listing} index={i} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
          <MagnifyingGlass size={32} className="mx-auto text-stone-400" aria-hidden />
          <h3 className="mt-4 text-lg font-semibold text-stone-800">
            No homes match those filters yet
          </h3>
          <p className="mx-auto mt-2 max-w-[45ch] text-sm leading-relaxed text-stone-600">
            Inventory changes weekly. Clear a filter to see more homes, or reach
            out and we&apos;ll watch the market for you.
          </p>
          <button
            type="button"
            onClick={() => {
              router.replace(pathname, { scroll: false })
            }}
            className="mt-5 rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-800 active:scale-[0.98]"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-[0.98] ${
        active
          ? 'border-teal-700 bg-teal-700 text-white'
          : 'border-stone-300 bg-white text-stone-700 hover:border-teal-700 hover:text-teal-800'
      }`}
    >
      {label}
    </button>
  )
}
