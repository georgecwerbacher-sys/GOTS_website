import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { SiteHeader } from '@/components/common/SiteHeader';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Guardians of the Spear',
  description: 'A historical fiction website',
};

export default function root_layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cinzel.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning>
        <AuthProvider>
          <SiteHeader />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
