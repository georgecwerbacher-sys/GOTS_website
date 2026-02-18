import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

export const metadata = {
  title: 'Dashboard - Guardians of the Spear',
  description: 'Your reading progress and story journey',
};

export default function dashboard_page() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
