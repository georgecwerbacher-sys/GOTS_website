import type { AtmosphereLayer } from '@/lib/types/content.types';
import type { StoryThread } from '@/lib/types/content.types';
import type { CallToActionPath } from '@/lib/types/content.types';
import type { Testimonial } from '@/lib/types/testimonial.types';

export const book_1 = {
  videoPath: '/video/Book_Cover_1_ver_1.mp4',
  imagePath: '/images/Book_1/Book_Cover_1.png',
  imageAlt: 'Guardians of the Spear cover',
  title: 'Guardians of the Spear: The Awakening',
  description: "The enemy's greatest weapon is your own will turned against you — and only the light of the spear can unite those strong enough to stand against it.",
};

export const atmosphere_layers: AtmosphereLayer[] = [
  {
    id: 'era',
    text: 'Year 33-34 CE. Roman occupation. Judea. A world where power demands obedience and mercy seems like weakness.',
  },
  {
    id: 'tension',
    text: 'Three perspectives converge: the centurion hiding his failing sight, the predator who commands him, and the prisoner whose mercy will change everything.',
  },
  {
    id: 'promise',
    text: 'A story of grace defeating predation. Of hidden witnesses and the light that breaks through when all seems lost.',
  },
];

export const story_threads: StoryThread[] = [
  {
    id: 'grace-vs-predation',
    title: 'Grace Defeating Predation',
    description: 'The central theme: how grace becomes stronger than violence and control.',
    connections: ['mercy', 'identity', 'community'],
    relatedCharacterIds: ['longinus', 'brutus', 'malchus'],
  },
  {
    id: 'mercy',
    title: 'The Power of Mercy',
    description: 'Exploring mercy as both weakness and ultimate strength.',
    connections: ['grace-vs-predation', 'redemption'],
  },
  {
    id: 'identity',
    title: 'Identity in Occupation',
    description: 'How people maintain their sense of self under oppression.',
    connections: ['grace-vs-predation', 'resistance'],
  },
  {
    id: 'community',
    title: 'Community and Belonging',
    description: 'The bonds that transcend occupation and division.',
    connections: ['grace-vs-predation', 'connection'],
  },
];

export const cta_paths: CallToActionPath[] = [
  {
    id: 'characters',
    label: 'Characters',
    href: '/characters',
    description: 'Explore the Romans and Followers',
    icon: '👤',
  },
  {
    id: 'story',
    label: 'Read the Story',
    href: '/characters/longinus',
    description: 'Start with Longinus\'s journey',
    icon: '📖',
  },
  {
    id: 'groups',
    label: 'Groups',
    href: '/groups',
    description: 'Discover factions and perspectives',
    icon: '◆',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'A profound meditation on grace and human resilience in the face of occupation.',
    author: 'Sarah Mitchell',
    role: 'Literary Critic',
    rating: 5,
    highlight: 'The moment of mercy in Chapter 7 changed how I understand forgiveness.',
  },
  {
    id: '2',
    quote: 'Beautifully written, with characters that feel achingly real and complex.',
    author: 'James Chen',
    role: 'Book Club Member',
    rating: 5,
    highlight: 'The Centurion\'s internal struggle is masterfully portrayed.',
  },
  {
    id: '3',
    quote: 'A story that stays with you long after the final page.',
    author: 'Maria García',
    role: 'Reader',
    rating: 5,
    highlight: 'The ending was both unexpected and inevitable.',
  },
];
