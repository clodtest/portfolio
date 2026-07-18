import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ['', '/listings', '/loans', '/about', '/contact'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === '/listings' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
