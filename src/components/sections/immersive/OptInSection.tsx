'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fade_in_up, viewport_config } from '@/lib/animations/config';

export function OptInSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/opt-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      className="py-20 px-6 bg-gots-body"
      aria-label="Join for exclusive content"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="rounded-lg border-2 border-gots-accent/50 bg-gots-charred p-8 md:p-12 text-center"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gots-accent mb-4">
            Join the World of Guardians of the Spear
          </h2>
          <p className="text-base md:text-lg text-gots-medium-gray mb-8 max-w-2xl mx-auto">
            Sign up for exclusive access to Book 2 previews, character insights, locations, and battles — and step into an immersive world of 1st century Judea. Be the first to know about early release details.
          </p>
          {status === 'success' ? (
            <p className="text-gots-accent font-semibold">
              Thank you! Check your inbox to confirm.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 rounded-md bg-gots-dark border-2 border-gots-accent/30 text-white placeholder:text-gots-medium-gray focus:border-gots-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3 bg-gots-accent text-gots-black font-bold tracking-wider uppercase hover:bg-gots-accent-light transition-colors disabled:opacity-70"
              >
                {status === 'loading' ? 'Joining…' : 'Join'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-4">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
