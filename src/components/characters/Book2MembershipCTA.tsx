'use client';

import { useState } from 'react';
import { SignUpModal } from '@/components/auth/SignUpModal';

interface Book2MembershipCTAProps {
  /** 'overlay' = full overlay with centered box; 'card' = for character card with name */
  variant?: 'overlay' | 'card';
  characterName?: string;
}

export function Book2MembershipCTA({ variant = 'overlay', characterName }: Book2MembershipCTAProps) {
  const [signUpOpen, setSignUpOpen] = useState(false);

  const ctaBox = (
    <button
      type="button"
      onClick={() => setSignUpOpen(true)}
      className="block w-full max-w-sm mx-auto px-8 py-6 rounded-lg border-2 border-gots-accent/50 bg-white/95
                 hover:border-gots-accent hover:bg-white transition-all duration-200
                 cursor-pointer text-left group shadow-lg hover:shadow-gots-accent/20"
      aria-label="Join free membership to access Book 2 content"
    >
      <p className="font-cinzel text-sm font-semibold !text-black uppercase tracking-wider mb-3">
        Book 2 · Requires a free membership
      </p>
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gots-accent font-cinzel text-[0.65rem] tracking-[0.2em] uppercase !text-black group-hover:bg-gots-accent-light group-hover:!text-black transition-colors">
        Join Free
        <span aria-hidden="true">→</span>
      </span>
    </button>
  );

  if (variant === 'overlay') {
    return (
      <>
        <div className="absolute inset-0 flex items-center justify-center bg-gots-charred/40 backdrop-blur-[2px] rounded-lg p-6">
          {ctaBox}
        </div>
        <SignUpModal isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} />
      </>
    );
  }

  // card variant: for Romans group character card
  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gots-charred/60 backdrop-blur-sm">
        {characterName ? (
          <h3 className="text-3xl font-bold text-gots-accent mb-4">{characterName}</h3>
        ) : null}
        {ctaBox}
      </div>
      <SignUpModal isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} />
    </>
  );
}
