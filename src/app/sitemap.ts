import type { MetadataRoute } from 'next';

export default function Sitemap(): MetadataRoute.Sitemap {
  return ['/', '/about'].map((path) => ({
    url: `${process.env.SITE}${path}`,
    changefreq: 'daily',
    lastModified: new Date().toISOString(),
  }));
}
