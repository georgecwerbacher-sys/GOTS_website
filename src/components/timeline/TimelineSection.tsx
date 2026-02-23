'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './TimelineSection.module.css';

interface TimelineNode {
  part: string;
  title: string;
  teaser: string;
  desc?: string;
  comingSoon?: boolean;
  spoilerProtected?: boolean;
}

const BOOK1_NODES: TimelineNode[] = [
  {
    part: 'Part 1',
    spoilerProtected: true,
    title: 'The Desert March',
    teaser:
      'A Roman century crosses the wilderness toward Jerusalem — and toward a fate none of them can foresee.',
    desc: "Longinus's hidden wound: A Roman soldier marches toward Jerusalem carrying two secrets: a body going blind and a loyalty that has become indistinguishable from fear. When the road ends, one secret will break him open — and the other will save him.",
  },
  {
    part: 'Part 2',
    spoilerProtected: true,
    title: 'The Breaking',
    teaser:
      'The city closes in. Loyalties fracture. Something ancient begins to stir beneath the surface of ordinary days.',
    desc: "Longinus's descent: Stripped of his rank and handed to the Death Squad, Longinus discovers that surviving Brutus's mercy may cost him more than dying would have. Some men are broken by violence — this one is being broken by precision.",
  },
  {
    part: 'Part 3',
    spoilerProtected: true,
    title: 'Scourging and Presentation',
    teaser:
      'The condemned man is brought before the crowd. Violence precedes judgment. History holds its breath.',
    desc: "What survives the scourging: They stripped him, flogged him, crowned him with thorns, and dressed him in mockery — and still couldn't break him. For Brutus, a man who has broken everything Rome handed him, the prisoner's silence is the most terrifying thing he has ever encountered.",
  },
  {
    part: 'Part 4',
    spoilerProtected: true,
    title: 'The Crucifixion',
    teaser:
      'At Golgotha, the world divides into before and after. Those who witness it will never return to who they were.',
    desc: "The before and after: Three crosses rise against the Jerusalem sky, and the men who built them will spend the rest of their lives trying to explain what they witnessed to themselves. They were soldiers performing a task. Then the task was finished — and nothing was the same.",
  },
  {
    part: 'Part 5',
    spoilerProtected: true,
    title: 'Piercing and the Light',
    teaser:
      "A soldier drives the spear. Light erupts from the wound. Two men are marked forever — one who held the weapon, one who was healed by it.",
    desc: "The two men marked: One soldier drives the spear and his blindness vanishes. Across the crowd, a servant of the Sanhedrin touches his ear where a wound no longer exists. Two men, marked by the same light — and neither one will ever be able to explain what happened to them.",
  },
  {
    part: 'Part 6',
    spoilerProtected: true,
    title: 'The Resurrection and the Witness',
    teaser:
      'The tomb is empty. Those who walked away changed now must decide what to do with what they saw.',
    desc: "Two exiles, one purpose: Rome and the Sanhedrin agree on one thing: the witnesses must go. What neither power understands is that sending the blind centurion and the healed servant on the same road is not a solution — it's the beginning of everything they feared.",
  },
  {
    part: 'Part 7',
    spoilerProtected: true,
    title: 'Tirathana Rising',
    teaser:
      "A Samaritan prophet commands thousands. His power grows. And the spear draws closer to the center of something larger than one man's faith.",
    desc: "The broken making room: A Roman soldier and a Temple servant arrive at a Samaritan settlement with nothing but miracles they can't explain — and find that broken people recognize broken people in ways the powerful never could. What begins as exile becomes something Rome will eventually have to destroy.",
  },
  {
    part: 'Part 8',
    spoilerProtected: true,
    title: 'The Sacrifice',
    teaser:
      'Someone will pay the price for what the spear has set in motion. Not all guardians survive their calling.',
    desc: "Who inherits the weight: A young Temple servant who spent his life invisible arrives at a hollow in Samaria carrying a spear he doesn't fully understand yet — and a community chooses him anyway. Guardianship isn't given. It's inherited through grief.",
  },
  {
    part: 'Part 9',
    spoilerProtected: true,
    title: 'The Plot Against Jonathan',
    teaser:
      'Power moves against the high priest. Those who protect the spear find themselves entangled in the machinery of Rome and the Temple.',
    desc: "An aide who has spent years doing the work while his brother holds the title discovers that one piece of intelligence, properly used, can accomplish what years of service never could. Ambition this patient doesn't announce itself. It simply waits for the right room.",
  },
  {
    part: 'Part 10',
    spoilerProtected: true,
    title: 'The Binding',
    teaser:
      "The guardians are bound to one another — and to something greater. A covenant forms in the shadow of Rome's growing reach.",
    desc: "The binding itself: In Jerusalem, a man dies and does not stay dead. Across an impossible distance, a spear blazes upward over a Samaritan massacre. Two events. One cosmic moment. The guardians who survive it will spend the rest of their lives trying to understand what they were bound to — and why.",
  },
  {
    part: 'Part 11',
    spoilerProtected: true,
    title: 'The Aftermath',
    teaser:
      "The dust of catastrophe settles. Those who remain must count the cost — and ask whether the spear is worth what it demands.",
    desc: "The cost of surviving: The guardians count what Gerizim took from them — the dead, the scattered, the ten soldiers who vanished into the wilderness rather than return to Rome. Survival carries its own weight, and the spear has never promised its guardians safety. Only purpose.",
  },
  {
    part: 'Part 12',
    spoilerProtected: true,
    title: 'Followers Leave Mount Gerizim',
    teaser:
      'The community scatters. The mountain that sheltered them is no longer safe. The movement must survive by moving.',
    desc: "Fifty out of two hundred: A hundred and fifty bodies lie in the basin at Mount Gerizim. Fifty survivors stand among them. Malchus holds the spear in one hand and an old woman's hand in the other, and understands that cosmic power and human care are not separate things — they are the same work.",
  },
  {
    part: 'Part 13',
    spoilerProtected: true,
    title: 'The Four Bind',
    teaser:
      'Four officers move in concert. Their coordination reveals something systemic — and dangerous. The guardians are not the only ones who have found their purpose.',
    desc: "One consciousness, four bodies: In a sealed chamber beneath the Fortress of Antonia, four Roman officers take turns dying and rising — and what emerges from the last resurrection is no longer four men. It is one mind wearing four faces. The guardians have found their purpose. So have the Four.",
  },
];

const BOOK2_NODES: TimelineNode[] = [
  {
    part: 'Part 1',
    title: 'The Settlement at Qumran',
    teaser:
      "The next chapter begins in the desert. But what that means — you'll have to read Book II to find out.",
    comingSoon: true,
  },
  {
    part: 'Part 2',
    title: 'Pilate Summons Brutus',
    teaser: "The governor has not forgotten. The spear's story is far from over.",
    comingSoon: true,
  },
  {
    part: 'Parts 3–13',
    title: 'The Reckoning Continues…',
    teaser: 'The Dybbuk. The Shadows. The Warriors. The Spear Revealed. The Fall.',
    comingSoon: true,
  },
];

function TimelineNodeCard({
  node,
  side,
  isRevealed,
  onReveal,
  onOpenModal,
}: {
  node: TimelineNode;
  side: 'left' | 'right';
  isRevealed?: boolean;
  onReveal?: () => void;
  onOpenModal: (node: TimelineNode) => void;
}) {
  const isSpoilerHidden =
    node.spoilerProtected && !isRevealed && !node.comingSoon;

  const handleClick = () => {
    if (node.comingSoon) return;
    if (isSpoilerHidden && onReveal) {
      onReveal();
      return;
    }
    if (node.desc) {
      onOpenModal(node);
    }
  };

  return (
    <div
      className={`${styles.node} ${styles[side]}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
    >
      <div
        className={`${styles.nodeCard} ${
          node.comingSoon || isSpoilerHidden ? styles.grayed : ''
        } ${isSpoilerHidden ? styles.spoilerReveal : ''}`}
      >
        {isSpoilerHidden ? (
          <>
            <div className={styles.spoilerAlert}>⚠ Spoiler</div>
            <div className={styles.nodePart}>{node.part}</div>
            <div className={styles.spoilerHint}>Click to reveal book details</div>
          </>
        ) : (
          <>
            <div className={styles.nodePart}>{node.part}</div>
            <div className={styles.nodeTitle}>{node.title}</div>
            <div className={styles.nodeTeaser}>{node.teaser}</div>
            {node.comingSoon && <div className={styles.nodeComing}>Coming Soon</div>}
          </>
        )}
      </div>
      <div
        className={`${styles.nodeDot} ${
          node.comingSoon || isSpoilerHidden ? styles.grayed : ''
        }`}
      />
      <div className={styles.nodeConnector} />
    </div>
  );
}

export function TimelineSection() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [modalNode, setModalNode] = useState<TimelineNode | null>(null);
  const [revealedParts, setRevealedParts] = useState<Set<number>>(new Set());
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const revealPart = useCallback((index: number) => {
    setRevealedParts((prev) => new Set(prev).add(index));
  }, []);

  const handleRevealRequest = useCallback(
    (index: number) => {
      if (authLoading) return;
      if (isAuthenticated) {
        revealPart(index);
      } else {
        setShowLoginPrompt(true);
      }
    },
    [isAuthenticated, authLoading, revealPart]
  );

  const openModal = useCallback((node: TimelineNode) => {
    setModalNode(node);
  }, []);

  const closeModal = useCallback(() => {
    setModalNode(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalNode) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [modalNode, closeModal]);

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="text-center py-16 px-6 border-b border-gots-accent/30 bg-gradient-to-b from-gots-charred to-gots-dark">
        <p className="font-cinzel text-[0.75rem] tracking-[0.35em] uppercase text-gots-accent mb-4">
          A Historical Novel
        </p>
        <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-gots-accent-light mb-4">
          Guardians of the Spear
        </h1>
        <p className="text-gots-medium-gray text-base italic tracking-wide">
          The chronicle of those marked by the light
        </p>
      </header>

      <div className="flex justify-center gap-10 py-6 px-4 font-cinzel text-[0.75rem] tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gots-accent" />
          <span className="text-gots-accent">Book I — The Awakening</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gots-accent/40" />
          <span className="text-gots-accent/60">Book II — The Reckoning</span>
        </div>
      </div>

      <div className={styles.timelineWrapper}>
        <div className={styles.timelineSpine} />

        <div className={styles.bookHeader}>
          <div className={styles.bookHeaderInner}>Book I · The Awakening</div>
        </div>

        {BOOK1_NODES.map((node, i) => (
          <TimelineNodeCard
            key={`book1-${i}`}
            node={node}
            side={i % 2 === 0 ? 'right' : 'left'}
            isRevealed={revealedParts.has(i)}
            onReveal={node.spoilerProtected ? () => handleRevealRequest(i) : undefined}
            onOpenModal={openModal}
          />
        ))}

        <div className={styles.bookHeader} style={{ marginTop: 60 }}>
          <div className={`${styles.bookHeaderInner} ${styles.grayed}`}>
            Book II · The Reckoning
          </div>
        </div>

        {BOOK2_NODES.map((node, i) => (
          <TimelineNodeCard
            key={`book2-${i}`}
            node={node}
            side={i % 2 === 0 ? 'right' : 'left'}
            onOpenModal={openModal}
          />
        ))}
      </div>

      {showLoginPrompt && (
        <div
          className={`${styles.modalBackdrop} ${styles.open}`}
          onClick={(e) => e.target === e.currentTarget && setShowLoginPrompt(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-prompt-title"
        >
          <div
            className={styles.modal}
            style={{ maxWidth: 360 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setShowLoginPrompt(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h2 id="login-prompt-title" className={styles.modalTitle} style={{ fontSize: '1.1rem', marginBottom: 12 }}>
              Sign in to reveal spoilers
            </h2>
            <p className={styles.modalDesc} style={{ marginBottom: 20, fontSize: '0.9rem' }}>
              Create a free account or log in to unlock timeline details.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link
                href="/auth/login"
                className="inline-block flex-1 text-center px-4 py-2 rounded font-semibold border border-gots-accent text-gots-accent hover:bg-gots-accent/20 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="inline-block flex-1 text-center px-4 py-2 rounded font-semibold bg-gots-accent !text-black hover:bg-gots-accent-light transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}

      {modalNode && (
        <div
          className={`${styles.modalBackdrop} ${styles.open}`}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>
            <div className={styles.modalPart}>{modalNode.part}</div>
            <h2 id="modal-title" className={styles.modalTitle}>
              {modalNode.title}
            </h2>
            <div className={styles.modalDivider} />
            <div className={styles.modalDesc}>
              {modalNode.desc || modalNode.teaser}
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-10 px-6 border-t border-gots-accent/30 text-[0.7rem] tracking-[0.15em] uppercase text-gots-medium-gray">
        Guardians of the Spear · A Chronicle of Light and Reckoning
      </footer>

      <div className="pb-12 pt-8 border-t border-dashed border-gots-accent/30 text-center">
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
