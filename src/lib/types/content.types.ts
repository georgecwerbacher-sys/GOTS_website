export interface AtmosphereLayer {
  id: string;
  text: string;
  imageUrl?: string;
  delay?: number;
}

export interface StoryThread {
  id: string;
  title: string;
  description: string;
  connections: string[];
  relatedCharacterIds?: string[];
}

export interface CallToActionPath {
  id: string;
  label: string;
  href: string;
  description: string;
  icon?: string;
  /** When set, opens buy modal instead of navigating */
  buyUrl?: string;
  buyButtonText?: string;
}
