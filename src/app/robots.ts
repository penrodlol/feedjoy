import type { MetadataRoute } from 'next';

export default function Robots(): MetadataRoute.Robots {
  return {
    host: `${process.env.SITE}`,
    sitemap: `${process.env.SITE}/sitemap.xml`,
    rules: [{ userAgent: '*', disallow: ['/404'] }],
  };
}
