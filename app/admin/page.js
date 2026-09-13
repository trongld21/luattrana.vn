import { redirect } from 'next/navigation';
import { currentAdmin } from '@/lib/admin';
import AdminDashboard from '@/components/AdminDashboard';
export const dynamic = 'force-dynamic';
export default async function AdminPage() {
  const user = await currentAdmin();
  if (!user) redirect('/admin/login');
  return <AdminDashboard user={user} />;
}
