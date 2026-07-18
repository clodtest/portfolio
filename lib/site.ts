export const site = {
  name: 'Gretza Roman Homes and Loans',
  shortName: 'Gretza Roman',
  tagline: 'Real estate and financing made simple — for every budget',
  description:
    'Gretza Roman Homes and Loans helps buyers at every price point find the right home and the right financing — from first-time starter homes to coastal estates.',
  url: 'https://www.romanhomesandloans.com',
  email: 'gretza@romanhomesandloans.com',
  // TODO: replace with the real office phone number
  phone: '(555) 014-7283',
  phoneHref: 'tel:+15550147283',
  // TODO: replace with the real service area
  serviceArea: 'Greater metro area and surrounding communities',
  officeAddress: '412 Harborview Drive, Suite 210',
} as const

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Listings' },
  { href: '/loans', label: 'Loans' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const
