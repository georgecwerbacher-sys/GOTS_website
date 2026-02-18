import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { SiteHeader } from '@/components/layout/SiteHeader';
import './globals.css';

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
    <html lang="en">
      <body>
        <AuthProvider>
          <SiteHeader />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
