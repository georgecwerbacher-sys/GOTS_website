'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { asset_image_path } from '@/lib/asset-paths';

interface relationship_item {
  name: string;
  dynamic: string;
  character_id?: string;
}

interface CharacterRelationshipLinkProps {
  relationship: relationship_item;
}

export function CharacterRelationshipLink({ relationship }: CharacterRelationshipLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [characterData, setCharacterData] = useState<{
    name: string;
    image?: string;
    brief_description?: string;
    full_description?: string;
    occupation?: string;
    origin?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!relationship.character_id) return;
      setIsOpen(true);
      setLoading(true);
      setError(null);
      setCharacterData(null);
      fetch(`/api/characters/${relationship.character_id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Character not found');
          return res.json();
        })
        .then((data) => setCharacterData(data))
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
        .finally(() => setLoading(false));
    },
    [relationship.character_id]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setCharacterData(null);
    setError(null);
  }, []);

  const hasProfile = Boolean(relationship.character_id);

  return (
    <li>
      {hasProfile ? (
        <>
          <button
            type="button"
            onClick={openModal}
            className="text-gots-accent font-semibold hover:text-gots-accent-light hover:underline underline-offset-2 transition-colors text-left"
          >
            {relationship.name}
          </button>
          {' : '}
          <span className="text-gots-content">{relationship.dynamic}</span>
        </>
      ) : (
        <>
          <span className="text-gots-accent font-semibold">{relationship.name}:</span>{' '}
          <span className="text-gots-content">{relationship.dynamic}</span>
        </>
      )}

      {isOpen && hasProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={closeModal}
          onKeyDown={(e) => e.key === 'Escape' && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="relationship-modal-title"
        >
          <div
            className="relative max-w-md w-full max-h-[85vh] overflow-y-auto bg-gots-charred rounded-lg border-2 border-gots-accent shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gots-dark/80 text-gots-accent hover:bg-gots-accent hover:!text-black flex items-center justify-center text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>

            <div className="p-6">
              {loading && (
                <div className="text-gots-accent text-center py-8">Loading...</div>
              )}
              {error && (
                <div className="text-red-400 text-center py-8">{error}</div>
              )}
              {characterData && !loading && (
                <>
                  <h2
                    id="relationship-modal-title"
                    className="text-2xl font-bold text-gots-accent mb-4 pr-10"
                  >
                    {characterData.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    {characterData.image && (
                      <div className="relative w-full sm:w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gots-dark">
                        <Image
                          src={asset_image_path(characterData.image)}
                          alt={characterData.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <p className="text-gots-content text-sm line-clamp-4">
                        {characterData.brief_description ||
                          characterData.full_description ||
                          'No description available.'}
                      </p>
                      {characterData.occupation && (
                        <p className="text-gots-content text-sm mt-2">
                          <span className="text-gots-accent font-semibold">Occupation:</span>{' '}
                          {characterData.occupation}
                        </p>
                      )}
                      {characterData.origin && (
                        <p className="text-gots-content text-sm">
                          <span className="text-gots-accent font-semibold">Origin:</span>{' '}
                          {characterData.origin}
                        </p>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/characters/${relationship.character_id}`}
                    className="inline-block mt-4 px-4 py-2 rounded font-semibold bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black transition-colors text-center"
                  >
                    View full profile →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
