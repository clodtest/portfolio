// Hero slideshow assets.
//
// TODO(Higgsfield): The Higgsfield MCP connector was not available when this
// site was scaffolded, so each `image` below points at a labeled SVG
// placeholder. Regenerate each asset with Higgsfield Seedance 2.0 using the
// `higgsfieldPrompt` given (16:9, landscape, photorealistic, natural
// daylight), save it to the `targetFile` path, then update `image` to match.
// Keep the same lighting logic / aspect ratio / color grading across all five
// so the carousel feels cohesive.

export interface HeroSlide {
  id: string
  image: string
  targetFile: string
  higgsfieldPrompt: string
  alt: string
  kicker: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'luxury',
    image: '/images/hero-luxury.svg',
    targetFile: '/public/images/hero-luxury.jpg',
    higgsfieldPrompt:
      'Photorealistic exterior of an elegant modern luxury home, warm golden-hour lighting, manicured landscaping, wide front lawn, welcoming (not cold or sterile), architectural photography style',
    alt: 'Elegant modern luxury home at golden hour with manicured landscaping and a wide front lawn',
    kicker: 'Estates and premier homes',
  },
  {
    id: 'family-home',
    image: '/images/hero-family-home.svg',
    targetFile: '/public/images/hero-family-home.jpg',
    higgsfieldPrompt:
      'Photorealistic suburban two-story family home, classic American architecture, well-kept yard, driveway, bright midday light, warm and inviting curb appeal',
    alt: 'Classic two-story suburban family home with a well-kept yard in bright midday light',
    kicker: 'Room for the whole family',
  },
  {
    id: 'new-construction',
    image: '/images/hero-new-construction.svg',
    targetFile: '/public/images/hero-new-construction.jpg',
    higgsfieldPrompt:
      'Photorealistic newly built affordable single-family home, modern minimal design, clean lines, small landscaped yard, bright and fresh, entry-level real estate photography',
    alt: 'Newly built affordable single-family home with modern clean lines and a small landscaped yard',
    kicker: 'Brand new, within reach',
  },
  {
    id: 'beach-house',
    image: '/images/hero-beach-house.svg',
    targetFile: '/public/images/hero-beach-house.jpg',
    higgsfieldPrompt:
      'Photorealistic coastal beach house on stilts, weathered wood and light blue siding, ocean visible in background, blue sky, late afternoon light',
    alt: 'Coastal beach house on stilts with light blue siding and the ocean in the background',
    kicker: 'Life by the water',
  },
  {
    id: 'starter-home',
    image: '/images/hero-starter-home.svg',
    targetFile: '/public/images/hero-starter-home.jpg',
    higgsfieldPrompt:
      'Photorealistic cozy starter home or townhouse, tidy small front porch, friendly and approachable curb appeal, soft natural light',
    alt: 'Cozy starter home with a tidy front porch and approachable curb appeal in soft natural light',
    kicker: 'A first home to be proud of',
  },
]
