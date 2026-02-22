import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { TimelineSection } from '@/components/timeline/TimelineSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Timeline',
  description:
    'Explore the timeline of Guardians of the Spear — Book I: The Awakening and Book II: The Reckoning. The chronicle of those marked by the light.',
  alternates: {
    canonical: `${siteUrl}/timeline`,
  },
};

export default function timeline_page(): ReactNode {
  return <TimelineSection />;
}
