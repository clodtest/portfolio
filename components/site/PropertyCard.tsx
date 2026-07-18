import Image from 'next/image'
import { Bathtub, Bed, MapPin, Ruler } from '@phosphor-icons/react/dist/ssr'
import { formatPrice, type Listing } from '@/lib/listings'

export default function PropertyCard({
  listing,
  index = 0,
  priority = false,
}: {
  listing: Listing
  index?: number
  priority?: boolean
}) {
  return (
    <article
      className="fade-up group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm shadow-stone-300/50 transition-shadow hover:shadow-md hover:shadow-stone-300/60"
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {/* TODO(Higgsfield): swap SVG placeholder for the generated photo —
            prompts in public/images/HIGGSFIELD_PROMPTS.md */}
        <Image
          src={listing.image}
          alt={`${listing.type} at ${listing.address}, ${listing.city}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700 backdrop-blur">
          {listing.type}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xl font-semibold tabular-nums text-stone-900">
          {formatPrice(listing.price)}
        </p>
        <h3 className="mt-1 text-base font-medium text-stone-800">{listing.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
          <MapPin size={15} aria-hidden />
          {listing.address}, {listing.city}
        </p>

        <dl className="mt-4 flex items-center gap-4 border-t border-stone-100 pt-4 text-sm text-stone-600">
          <div className="flex items-center gap-1.5">
            <Bed size={17} aria-hidden />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{listing.beds} bd</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Bathtub size={17} aria-hidden />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{listing.baths} ba</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler size={17} aria-hidden />
            <dt className="sr-only">Square feet</dt>
            <dd className="tabular-nums">{listing.sqft.toLocaleString('en-US')} sqft</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
