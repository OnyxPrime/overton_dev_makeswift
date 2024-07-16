import { MetadataRoute } from 'next'
import { MakeswiftPage, Sitemap } from '@makeswift/runtime/next'
import { client } from '@/lib/makeswift/client'

type NextSitemapItem = MetadataRoute.Sitemap[number]
  
const DOMAIN = 'https://example.com'
const DEFAULT_PRIORITY = 0.75
const DEFAULT_FREQUENCY = 'hourly'

function pageToSitemapEntry(page: MakeswiftPage): NextSitemapItem {
    const pageUrl = new URL(page.path, DOMAIN)
    console.log(page)
    return {
        url: pageUrl.href,
        lastModified: page.createdAt,
        changeFrequency: page.sitemapFrequency ?? DEFAULT_FREQUENCY,
        priority: page.sitemapPriority ?? DEFAULT_PRIORITY,
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return client
        .getPages()
        .filter(page => !page.excludedFromSearch)
        .map(page => pageToSitemapEntry(page))
        .toArray()
  }
