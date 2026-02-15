/**
 * Character Profile Type Definition
 */
export interface character_profile {
  id: string;
  name: string;
  role: 'protagonist' | 'supporting' | 'antagonist' | 'other';
  origin?: string;
  description?: string;
  imageUrl?: string;
  age?: number;
  status?: string;
  [key: string]: any;
}