import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const PAGE_CONFIG: Record<
  string,
  { title: string; description: string }
> = {
  about: {
    title: 'About',
    description:
      'Learn about Guardians of the Spear — the historical fiction series set in first-century Jerusalem.',
  },
  chapters: {
    title: 'Chapters',
    description:
      'Explore the chapters of Guardians of the Spear and follow the journey of Longinus, Malchus, and the Spear of Destiny.',
  },
  world: {
    title: 'World',
    description:
      'Discover the world of Guardians of the Spear — Jerusalem, Judea, and the Roman Empire in the first century.',
  },
  terms: {
    title: 'Terms of Service',
    description:
      'Terms of service for Guardians of the Spear website and community.',
  },
  privacy: {
    title: 'Privacy Policy',
    description:
      'Privacy policy for Guardians of the Spear — how we collect, use, and protect your information.',
  },
  support: {
    title: 'Support',
    description:
      'Get support for Guardians of the Spear — contact information and frequently asked questions.',
  },
};

type PageParams = { PAGE: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { PAGE } = await params;
  const config = PAGE_CONFIG[PAGE];

  if (!config) {
    return {};
  }

  const route = `/${PAGE}`;

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `${siteUrl}${route}`,
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<ReactNode> {
  const { PAGE } = await params;
  const config = PAGE_CONFIG[PAGE];

  if (!config) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="bg-gradient-to-b from-gots-charred to-gots-dark py-16 px-6 text-center border-b-2 border-dashed border-gots-accent">
        <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4">
          {config.title}
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto">
          {config.description}
        </p>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-gots-content text-center">
          This page is coming soon.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center">
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded font-semibold transition-colors bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
