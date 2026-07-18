import listingsData from './listings.json'

export type PriceBand = 'under-300' | '300-600' | '600-1m' | '1m-plus'

export type ListingType =
  | 'Single-family'
  | 'Townhouse'
  | 'Condo'
  | 'New construction'
  | 'Coastal'
  | 'Luxury'

export interface Listing {
  id: string
  title: string
  address: string
  city: string
  price: number
  beds: number
  baths: number
  sqft: number
  type: ListingType
  band: PriceBand
  style: string
  image: string
  featured: boolean
}

// Swap this JSON file for a CMS or MLS/IDX feed later — see README.
export const listings = listingsData as Listing[]

export const featuredListings = listings.filter((l) => l.featured)

export const priceBands: { value: PriceBand; label: string; blurb: string }[] = [
  { value: 'under-300', label: 'Under $300K', blurb: 'Starter homes, condos, and townhouses' },
  { value: '300-600', label: '$300K – $600K', blurb: 'Family homes in established neighborhoods' },
  { value: '600-1m', label: '$600K – $1M', blurb: 'New construction and coastal properties' },
  { value: '1m-plus', label: '$1M+', blurb: 'Estates and premier waterfront homes' },
]

export const listingTypes: ListingType[] = [
  'Single-family',
  'Townhouse',
  'Condo',
  'New construction',
  'Coastal',
  'Luxury',
]

export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}
