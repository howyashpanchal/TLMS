import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function getTenantDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error('Not authenticated');

  // Fetch user with active lease
  const user = await db.user.findUnique({
    where: { id: userId as string},
    include: {
      leases: {
        // where: { status: 'ACTIVE' },
        include: {
          unit: {
            include: {
              property: true
            }
          }
        }
      }
    }
  });

  if (!user) throw new Error('User not found');

  return user;
}

export async function getNextPayment(userId: string) {
  return db.payment.findFirst({
    where: {
      lease: { tenantId: userId },
      status: "pending"
    },
    orderBy: { dueDate: 'asc' }
  });
}

export async function getOpenMaintenanceRequests(userId: string) {
  return db.maintenanceRequest.findMany({
    where: {
      reportedById: userId,
      status: 'PENDING'
    }
  });
}

export async function getRecentDocuments(userId: string) {
  return db.document.findMany({
    where: { uploadedById: userId },
    orderBy: { createdAt: 'desc' },
    take: 5
  });
}

export async function getRecentActivities(userId: string) {
  // Combine notifications and maintenance requests
  const notifications = await db.notification.findMany({
    where: { userId, isRead: false },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const maintenanceRequests = await db.maintenanceRequest.findMany({
    where: { reportedById: userId },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  return {
    notifications,
    maintenanceRequests
  };
}