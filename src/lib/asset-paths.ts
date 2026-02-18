/**
 * Asset path resolver - looks under /assets/ for images and videos.
 * Place media in: public/assets/
 */
const ASSETS_BASE = '/assets';
const HERO_PLACEHOLDER = '/images/hero-placeholder.svg';

export function asset_image_path(path: string | undefined): string {
  if (!path) return HERO_PLACEHOLDER;
  if (path.startsWith('http')) return path;
  if (path.startsWith(ASSETS_BASE)) return path;
  if (path.startsWith('/images/')) return `${ASSETS_BASE}${path}`;
  return `${ASSETS_BASE}/images${path}`;
}

export function asset_media_path(path: string): string {
  if (path.startsWith('http')) return path;
  if (path.startsWith(ASSETS_BASE)) return path;
  if (path.startsWith('/video/')) return `${ASSETS_BASE}${path}`;
  return `${ASSETS_BASE}/video${path}`;
}
