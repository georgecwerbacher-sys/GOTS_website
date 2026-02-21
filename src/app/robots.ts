import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://guardiansofthespear.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: 'Googlebot',
      allow: '/',
      disallow: ['/api/', '/auth/', '/_next/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
