import { Suspense } from 'react'
import type { Metadata } from 'next'
import ListingsExplorer from '@/components/site/ListingsExplorer'

export const metadata: Metadata = {
  title: 'Property Listings',
  description:
    'Browse homes for sale at every price point — starter homes, family houses, new construction, coastal properties, and estates. Filter by price range and property type.',
}

export default function ListingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-stone-900 md:text-5xl">
        Find your next home
      </h1>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-stone-600">
        Every listing here is one we&apos;d be glad to show you in person. Filter
        by price range or property type — or tell us what you&apos;re looking for
        and we&apos;ll do the searching.
      </p>

      <div className="mt-10">
        <Suspense fallback={<ListingsSkeleton />}>
          <ListingsExplorer />
        </Suspense>
      </div>
    </div>
  )
}

function ListingsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-stone-200 bg-white"
        >
          <div className="aspect-[4/3] bg-stone-200" />
          <div className="space-y-3 p-5">
            <div className="h-6 w-1/3 rounded bg-stone-200" />
            <div className="h-4 w-2/3 rounded bg-stone-200" />
            <div className="h-4 w-1/2 rounded bg-stone-200" />
          </div>
        </div>
      ))}
    </div>
  )
}
