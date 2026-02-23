'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { book_2 } from '@/lib/content/immersive-data';
import {
  fade_in_up,
  stagger_container,
  scale_in,
  viewport_config,
} from '@/lib/animations/config';

// ─────────────────────────────────────────────────────────────────────────────
// GoDeeperSection
// Replaces the existing OptInSection + CallToActionSection "Join" flow.
// Shows five interactive content-pillar panels that reveal on hover,
// then drives visitors to create a free account via the existing SignUpModal.
// ─────────────────────────────────────────────────────────────────────────────

interface Pillar {
  id: string;
  glyph: string;
  label: string;
  hint: string;
  tag: string;
  title: string;
  body: string;
  items: string[];
  cta: string;
  href: string; // destination after login
}

const PILLARS: Pillar[] = [
  {
    id: 'characters',
    glyph: '👤',
    label: 'Character profiles & Groups',
    hint: 'The Romans. The Followers. The ones in between.',
    tag: 'Groups',
    title: 'Full Character Histories',
    body: 'Go beyond what the page shows. Discover allegiances, secret histories, and what happens to each character beyond the final chapter.',
    items: [
      'Gaius Cassius Longinus',
      'Marcus Aurelius Brutus',
      'Margaret of Samaria',
      '+ 12 more profiles',
    ],
    cta: 'Explore all character profiles',
    href: '/characters',
  },
  {
    id: 'maps',
    glyph: '🗺',
    label: 'Maps & Locations',
    hint: 'Every street, garrison, and safe house in occupied Judaea.',
    tag: 'Cartography',
    title: 'Navigate 1st-Century Judaea',
    body: 'An annotated map of every location in the story — from the Praetorium to the hidden archive beneath the lower city.',
    items: [
      'Jerusalem · The Lower City',
      'Golgotha · Caesarea',
      "Margaret's Archive",
      'The Copper Market',
    ],
    cta: 'Open the map',
    href: '/locations',
  },
  {
    id: 'timeline',
    glyph: '📜',
    label: 'Timeline of Events',
    hint: 'Every moment in order — including between the scenes.',
    tag: 'Chronicle',
    title: 'The Living Timeline',
    body: 'Track every event across 33–75 CE. See how threads converge, who knew what and when, and what the book never had room to show.',
    items: [
      'Nisan 14, 33 CE — The Crucifixion',
      'Nisan 17 — The Empty Tomb',
      'Iyyar — The First Gathering',
      'Sivan — The Copper Trap',
    ],
    cta: 'Explore the timeline',
    href: '/timeline',
  },
  {
    id: 'battles',
    glyph: '⚔️',
    label: 'Battles & Conflicts',
    hint: 'Not all battles are fought with swords.',
    tag: 'Conflict Archive',
    title: 'Every Confrontation Decoded',
    body: 'Deep breakdowns of every major conflict — the tactics, the stakes, the cost. Military, political, spiritual, and economic warfare.',
    items: [
      'The Interrogation of Witnesses',
      'The Copper Debt Trap',
      "Longinus's Inner Darkness",
      '+ more conflicts',
    ],
    cta: 'Open the archive',
    href: '/story',
  },
  {
    id: 'chapters',
    glyph: '📖',
    label: 'Early Book II Access',
    hint: 'Read new chapters before anyone else.',
    tag: 'Exclusive · Book II',
    title: 'Chapters Before Release',
    body: 'Members receive new Book II chapters as they are written. Read ahead of the world — and shape what comes next.',
    items: [
      'Ch. 1 — The Exile Begins ✓',
      'Ch. 2 — The Copper Market ✓',
      'Ch. 3 — dropping March 2026',
      'Ch. 4+ — coming soon',
    ],
    cta: 'Read early chapters',
    href: '/dashboard',
  },
];

// ── Single pillar ─────────────────────────────────────────────────────────
function PillarCard({
  pillar,
  onCtaClick,
  onChaptersCardClick,
}: {
  pillar: Pillar;
  onCtaClick: (pillar: Pillar) => void;
  onChaptersCardClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const cardContent = (
    <>
      {/* Crimson sweep bar */}
      <div
        className="h-[3px] bg-red-900 origin-left transition-transform duration-500"
        style={{
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Resting face */}
      <div
        className="flex-1 p-7 flex flex-col justify-between transition-all duration-300"
        style={{
          opacity: hovered ? 0 : 1,
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          pointerEvents: hovered ? 'none' : 'auto',
        }}
      >
        <div>
          <span className="text-3xl mb-4 block transition-transform duration-300" style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}>
            {pillar.glyph}
          </span>
          <p className="font-cinzel text-[0.65rem] font-bold tracking-[0.15em] uppercase text-gots-content mb-2 leading-snug">
            {pillar.label}
          </p>
          <p className="text-sm italic text-gots-medium-gray leading-relaxed">
            {pillar.hint}
          </p>
        </div>
        <p className="font-cinzel text-[0.5rem] tracking-[0.2em] uppercase text-gots-accent/50 mt-4 flex items-center gap-1">
          <span className="text-gots-accent text-[0.45rem]">✦</span>
          Member Access
        </p>
      </div>

      {/* Revealed interior */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-between
                   bg-gradient-to-br from-[#241b0c]/95 to-[#110d07]/98
                   border border-gots-accent/20
                   transition-all duration-400"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(12px)',
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        <div>
          {/* Tag */}
          <p className="font-cinzel text-[0.5rem] tracking-[0.3em] uppercase text-gots-accent mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-gots-accent/50" />
            {pillar.tag}
          </p>
          {/* Title */}
          <h4 className="font-cinzel text-sm font-bold text-white mb-2 leading-snug tracking-wide">
            {pillar.title}
          </h4>
          {/* Body */}
          <p className="text-[0.82rem] italic text-gots-medium-gray leading-relaxed mb-3">
            {pillar.body}
          </p>
          {/* Preview items */}
          <ul className="flex flex-col gap-1">
            {pillar.items.map((item) => (
              <li
                key={item}
                className="font-cinzel text-[0.5rem] tracking-[0.1em] uppercase text-gots-content/80 flex items-center gap-2"
              >
                <span className="text-gots-accent text-[0.38rem] flex-shrink-0">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          className="font-cinzel text-[0.55rem] tracking-[0.2em] uppercase text-gots-accent
                     flex items-center gap-2 mt-4 bg-transparent border-none cursor-pointer
                     hover:gap-3 transition-all duration-200 p-0"
          onClick={(e) => { e.stopPropagation(); onCtaClick(pillar); }}
        >
          {pillar.cta}
          <span>→</span>
        </button>
      </div>
    </>
  );

  const cardClassName = "relative overflow-hidden cursor-pointer min-h-[280px] flex flex-col bg-gots-charred border border-gots-accent/10 transition-colors duration-300 hover:bg-[#2a2318]";

  if (pillar.id === 'characters') {
    return (
      <Link
        href="/characters"
        className={cardClassName}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Explore Character profiles"
      >
        {cardContent}
      </Link>
    );
  }

  if (pillar.id === 'maps') {
    return (
      <Link
        href="/locations"
        className={cardClassName}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Navigate 1st-Century Judaea"
      >
        {cardContent}
      </Link>
    );
  }

  if (pillar.id === 'timeline') {
    return (
      <Link
        href="/timeline"
        className={cardClassName}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="The Living Timeline"
      >
        {cardContent}
      </Link>
    );
  }

  if (pillar.id === 'chapters' && onChaptersCardClick) {
    return (
      <div
        className={cardClassName}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onChaptersCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onChaptersCardClick()}
        aria-label="Early Book II Access — Pre-order"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <div
      className={cardClassName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setHovered((v) => !v)}
      aria-label={`Explore ${pillar.label}`}
    >
      {cardContent}
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export function GoDeeperSection() {
  const router = useRouter();
  const [preorderOpen, setPreorderOpen] = useState(false);

  function handlePillarCta(pillar: Pillar) {
    if (pillar.id === 'characters') {
      router.push('/characters');
    } else if (pillar.id === 'maps') {
      router.push('/locations');
    } else if (pillar.id === 'timeline') {
      router.push('/timeline');
    } else if (pillar.id === 'chapters') {
      setPreorderOpen(true);
    } else {
      router.push(pillar.href);
    }
  }

  return (
    <section
      className="relative bg-gots-body overflow-hidden py-24 px-6"
      aria-label="Go deeper than the book — member content"
    >
      {/* Atmospheric radial gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 15%, rgba(122,92,30,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 35% 30% at 10% 65%, rgba(100,18,18,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 35% 30% at 90% 75%, rgba(122,92,30,0.05) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          <p className="font-cinzel text-[0.58rem] tracking-[0.5em] uppercase text-gots-accent mb-5">
            ✦ The Member World ✦
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none mb-4">
            Go Deeper
            <br />
            <span className="font-cormorant font-light italic text-gots-content/60 text-[0.72em] tracking-wide">
              than the book
            </span>
          </h2>
          <p className="text-base md:text-lg italic text-gots-medium-gray max-w-lg mx-auto leading-relaxed mt-5">
            The story doesn't end on the last page. Hover any vault below
            to see what's waiting inside.
          </p>
        </motion.div>

        {/* Ornamental rule */}
        <motion.div
          className="flex items-center gap-4 mb-12 max-w-sm mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gots-accent/35 to-transparent" />
          <span className="font-cinzel text-[0.7rem] text-gots-accent/60 tracking-widest">✦ ✦ ✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gots-accent/35 to-transparent" />
        </motion.div>

        {/* ── Five pillars ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-gots-accent/10
                     border border-gots-accent/12 mb-16"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={stagger_container}
        >
          {PILLARS.map((pillar) => (
            <motion.div key={pillar.id} variants={scale_in}>
              <PillarCard
                pillar={pillar}
                onCtaClick={handlePillarCta}
                onChaptersCardClick={pillar.id === 'chapters' ? () => setPreorderOpen(true) : undefined}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA block ── */}
        <motion.div
          className="relative border border-gots-accent/20 bg-gradient-to-br from-[#1c1409]/90 to-[#0b0804]/95
                     p-12 md:p-16 text-center overflow-hidden"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          {/* Corner ornaments */}
          {[
            'top-3 left-3 border-t border-l',
            'top-3 right-3 border-t border-r',
            'bottom-3 left-3 border-b border-l',
            'bottom-3 right-3 border-b border-r',
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute w-8 h-8 border-gots-accent/25 pointer-events-none ${pos}`}
              aria-hidden="true"
            />
          ))}

          {/* Wax seal */}
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full
                       bg-gradient-radial from-red-700 to-red-900
                       border border-red-800/60 mb-6 text-lg mx-auto"
            style={{ boxShadow: '0 0 20px rgba(153,27,27,0.3), 0 0 40px rgba(153,27,27,0.1)' }}
            aria-hidden="true"
          >
            ⚔
          </div>

          <p className="font-cinzel text-[0.58rem] tracking-[0.45em] uppercase text-gots-accent mb-4">
            ✦ Coming Soon ✦
          </p>

          <h3 className="font-cinzel text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            Enter the World.<br />
            Go Deeper Than the Book.
          </h3>

          <p className="text-base italic text-gots-medium-gray max-w-md mx-auto leading-relaxed">
            Unlock all five vaults — characters, maps, the living timeline, the battle archive,
            and early Book&nbsp;II chapters. Member access coming soon.
          </p>

        </motion.div>
      </div>

      {/* Preorder modal for Early Book II Access */}
      {preorderOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preorder-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setPreorderOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-gots-charred border border-gots-accent/30 rounded-xl shadow-2xl p-8">
            <button
              type="button"
              onClick={() => setPreorderOpen(false)}
              className="absolute top-4 right-4 text-gots-medium-gray hover:text-gots-accent p-1 rounded transition-colors"
              aria-label="Close preorder modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="font-cinzel text-[0.5rem] tracking-[0.4em] uppercase text-gots-accent mb-3">
              Exclusive · Book II
            </p>
            <h2 id="preorder-modal-title" className="font-cinzel text-2xl font-bold text-white mb-2">
              {book_2.title}
            </h2>
            <p className="text-gots-medium-gray italic mb-6 leading-relaxed">
              {book_2.description}
            </p>
            {book_2.releaseDate && (
              <p className="text-sm text-gots-accent/80 mb-6">
                Release: {book_2.releaseDate}
              </p>
            )}
            <a
              href={book_2.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-8 py-4 bg-gots-accent hover:bg-gots-accent-light
                         !text-black font-cinzel text-[0.65rem] tracking-[0.2em] uppercase font-bold
                         transition-all duration-300 hover:shadow-[0_0_30px_rgba(166,133,85,0.3)]"
            >
              {book_2.buttonText}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
