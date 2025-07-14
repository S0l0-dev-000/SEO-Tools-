import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateSession, getUserPurchases } from '@/lib/auth';
import { db } from '@/lib/db';
import { DashboardContent } from '@/components/DashboardContent';
import { Navigation } from '@/components/Navigation';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }
  
  const session = await validateSession(token);
  if (!session) {
    redirect('/login');
  }
  
  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  
  if (!user) {
    redirect('/login');
  }
  
  const purchases = await getUserPurchases(session.userId);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="dashboard" />
      <DashboardContent user={user} purchases={purchases} />
    </div>
  );
} 