'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fade_in_up, viewport_config, stagger_container, scale_in } from '@/lib/animations/config';

// ─────────────────────────────────────────────────────────────────────────────
// StoryThreadsSection — "The Awakening: Book 1"
// Replaces the abstract theme-card layout with a suspense-driven story
// preview that sells Book 1. Structured as five escalating acts with a
// hard buy CTA before the ending is revealed.
// ─────────────────────────────────────────────────────────────────────────────

interface Act {
  id: string;
  number: string;
  label: string;
  headline: string;
  body: string;
  tension: string;       // one-line hook at the bottom of each card
  pov?: string;          // whose eyes we're in
}

const ACTS: Act[] = [
  {
    id: 'desert',
    number: 'I',
    label: 'The Desert March',
    headline: 'A Roman soldier carries a dead man into the wilderness — and cannot stop thinking about what he saw.',
    body: 'Longinus Mercator has served Rome faithfully for twenty years. His eyes are failing. His faith in the empire is cracking. When ordered to escort the body of a crucified Jew named Jesus into the Judean desert, he expects a routine burial detail. Instead, the march becomes the first test of a loyalty he didn\'t know he had — when Jewish resisters ambush the procession and Longinus chooses, for reasons he can\'t explain, to show mercy rather than make an example.',
    tension: 'Malchus, a servant who witnessed the arrest and the healing, watches Longinus and says nothing. But he sees everything.',
    pov: 'Longinus',
  },
  {
    id: 'vanishing',
    number: 'II',
    label: 'The Breaking',
    headline: 'The body vanishes. The spear begins to glow. Rome wants answers — and will torture them out of anyone who has them.',
    body: 'At the burial site, the impossible happens. The body of Jesus of Nazareth disappears. No grave robbers. No tracks. No explanation Rome is willing to accept. What remains is the spear Longinus used at the crucifixion — a weapon that now behaves like no weapon he has ever held. The Arcani, Rome\'s coordinated intelligence apparatus, mobilize immediately: military pressure from Brutus, economic strangulation from Corvus, psychological warfare from Maximus, enforcement brutality from Horatius. They are not panicking. They are hunting.',
    tension: 'Longinus drove that spear through flesh that should not have bled the way it did. He knows what he felt. He cannot unknow it.',
    pov: 'Longinus',
  },
  {
    id: 'cost',
    number: 'III',
    label: 'The Cost of Knowing',
    headline: 'A follower is arrested. The scourging begins. Longinus must decide how much the truth is worth.',
    body: 'The Arcani make their first move against the growing community of witnesses. A follower is taken, questioned, and beaten — not for information Rome already needs, but as a demonstration of what happens to those who refuse to recant what they saw. Longinus is no longer just a soldier with a crisis of conscience. He is now someone who knows where the spear is hidden, who the witnesses are, and what Rome will do to silence them. Malchus moves between Longinus and the community — bridge, guardian, risk.',
    tension: 'The question is no longer whether Longinus believes. The question is whether belief is enough to die for.',
    pov: 'Malchus',
  },
  {
    id: 'light',
    number: 'IV',
    label: 'The Spear\'s Light',
    headline: 'Those who stand near it are changed. Rome realizes it cannot control what it cannot understand.',
    body: 'The spear\'s presence begins to do what no doctrine or argument could: it reveals. Those who encounter it cannot pretend anymore — not about Rome\'s brutality, not about their own compromises, not about what they witnessed at Golgotha. A community member dies. Then does not stay dead. Horatius, Rome\'s most efficient enforcer, witnesses something that shatters his certainty about the nature of the world. The Arcani escalate. They begin systematically targeting the spear\'s core guardians — not to capture it, but to erase the people who know what it means.',
    tension: 'The executions are coming. Longinus knows it. Malchus knows it. The only question is who dies first — and whether their deaths will silence the story or seal it.',
    pov: 'Longinus & Malchus',
  },
];

const HIDDEN_ACT_TEASER = [
  'In the center of this clearing stood a figure unlike the others.',
  'The man was heavily shackled—chains that suggested Rome feared him beyond ordinary prisoner calculation. His frame was lean but powerful, etched with the evidence of years of violence. His bare chest was a record of brutality: whip scars that had healed into ridged tissue, burn marks that had faded into permanent discoloration, the systematic evidence of abuse designed not simply to punish but to break the will to resist.',
  'But it was his eyes that marked him as truly different.',
];

export function StoryThreadsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      className="py-24 px-6 bg-gots-charred"
      aria-label="Book 1 story preview"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-6"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          <p className="font-cinzel text-[0.58rem] tracking-[0.5em] uppercase text-gots-accent mb-5">
            ✦ Guardians of the Spear · Book I ✦
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            The Awakening
          </h2>
          <p className="text-lg md:text-xl italic text-gots-medium-gray max-w-2xl mx-auto leading-relaxed">
            A Roman centurion. A servant who should have stayed silent.
            A weapon that judged every hand that touched it.
            And a coordinated empire determined to bury what happened at Golgotha before the world found out.
          </p>
        </motion.div>

        {/* Ornamental rule */}
        <motion.div
          className="flex items-center gap-4 mb-16 max-w-xs mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gots-accent/40 to-transparent" />
          <span className="font-cinzel text-[0.65rem] text-gots-accent/60 tracking-widest">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gots-accent/40 to-transparent" />
        </motion.div>

        {/* ── Act cards ── */}
        <motion.div
          className="space-y-3 mb-12"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={stagger_container}
        >
          {ACTS.map((act) => {
            const isOpen = expanded === act.id;
            return (
              <motion.div key={act.id} variants={scale_in}>
                <div
                  className={`relative border transition-all duration-300 cursor-pointer overflow-hidden
                    ${isOpen
                      ? 'border-gots-accent/50 bg-gradient-to-br from-[#2a2318] to-gots-charred'
                      : 'border-gots-accent/15 bg-gots-body hover:border-gots-accent/30 hover:bg-[#1f1c13]'
                    }`}
                  onClick={() => setExpanded(isOpen ? null : act.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setExpanded(isOpen ? null : act.id)}
                  aria-expanded={isOpen}
                  aria-label={`Act ${act.number}: ${act.label}`}
                >
                  {/* Top accent bar — only visible when open */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gots-accent to-transparent transition-opacity duration-300"
                    style={{ opacity: isOpen ? 1 : 0 }}
                  />

                  {/* Collapsed header — always visible */}
                  <div className="flex items-center gap-5 px-6 py-5">
                    {/* Act number */}
                    <div className="flex-shrink-0 w-10 h-10 border border-gots-accent/30 flex items-center justify-center">
                      <span className="font-cinzel text-xs font-bold text-gots-accent">{act.number}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-cinzel text-[0.52rem] tracking-[0.3em] uppercase text-gots-accent/60 mb-1">
                        {act.label}
                      </p>
                      <p className={`font-cormorant text-base md:text-lg font-medium leading-snug transition-colors duration-200
                        ${isOpen ? 'text-white' : 'text-gots-content'}`}>
                        {act.headline}
                      </p>
                    </div>

                    {/* Expand chevron */}
                    <div className="flex-shrink-0 ml-4">
                      <div
                        className="w-5 h-5 flex items-center justify-center transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gots-accent" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expanded body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 ml-15 pl-[4.25rem]">
                          {/* POV tag */}
                          {act.pov && (
                            <p className="font-cinzel text-[0.5rem] tracking-[0.25em] uppercase text-gots-accent/50 mb-3 flex items-center gap-2">
                              <span className="inline-block w-4 h-px bg-gots-accent/30" />
                              Point of View — {act.pov}
                            </p>
                          )}

                          {/* Story body */}
                          <p className="text-base italic text-gots-medium-gray leading-relaxed mb-5 max-w-3xl">
                            {act.body}
                          </p>

                          {/* Tension line */}
                          <div className="border-l-2 border-gots-accent/40 pl-4 py-1">
                            <p className="text-sm font-medium text-gots-content leading-relaxed">
                              {act.tension}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Sealed final act — teaser then buy CTA ── */}
        <motion.div
          className="relative border border-red-900/40 bg-gradient-to-br from-[#1a0a0a]/80 to-gots-charred overflow-hidden"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          {/* Red top bar */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-red-800 to-transparent" />

          <div className="px-6 py-8 md:px-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8">

              {/* Left — the tease */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border border-red-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="font-cinzel text-xs font-bold text-red-700">V</span>
                  </div>
                  <div>
                    <p className="font-cinzel text-[0.52rem] tracking-[0.3em] uppercase text-red-700/70">
                      The Sacrifice · Acts V–XIII
                    </p>
                  </div>
                </div>

                <div className="space-y-4 max-w-xl">
                  {HIDDEN_ACT_TEASER.map((para, i) => (
                    <p key={i} className="text-base md:text-lg italic text-gots-medium-gray leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Blurred "locked" content hint */}
                <div className="space-y-2 select-none pointer-events-none" aria-hidden="true">
                  {[
                    'The executions are methodical. Brutus is precise about it.',
                    'Malchus watches each one and does not look away.',
                    'What Rome creates is not silence. It is something Rome will spend Book II trying to undo.',
                  ].map((line, i) => (
                    <p
                      key={i}
                      className="text-sm text-gots-content/40 leading-relaxed"
                      style={{ filter: 'blur(4px)', userSelect: 'none' }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <p className="font-cinzel text-[0.56rem] tracking-[0.25em] uppercase text-red-700/60 mt-4 flex items-center gap-2">
                  <span>🔒</span> Read the complete story
                </p>
              </div>

              {/* Right — buy CTA */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-4 md:min-w-[200px]">
                <div className="text-center md:text-right">
                  <p className="font-cinzel text-[0.52rem] tracking-[0.3em] uppercase text-gots-accent/60 mb-1">
                    Available Now
                  </p>
                  <p className="font-cinzel text-2xl font-black text-gots-accent">$5.99</p>
                  <p className="text-xs italic text-gots-medium-gray">Ebook · $14.99 Paperback</p>
                </div>

                <a
                  href="https://www.amazon.com/dp/B0GNWQZNQ3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gots-accent hover:bg-gots-accent-light
                             !text-gots-black font-cinzel text-[0.65rem] tracking-[0.2em] uppercase
                             font-bold transition-all duration-300 whitespace-nowrap
                             hover:shadow-[0_0_30px_rgba(166,133,85,0.35)] hover:-translate-y-px"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read Book I
                </a>

                <a
                  href="https://www.amazon.com/dp/B0GNZ6XGFH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel text-[0.58rem] tracking-[0.15em] uppercase
                             text-gots-accent/60 hover:text-gots-accent transition-colors duration-200
                             border border-gots-accent/20 hover:border-gots-accent/40 px-5 py-2"
                >
                  Pre-Order Book II →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
