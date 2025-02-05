import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {db} from '@/lib/db'; // Import your database connection

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch data from your database
    const payments = await db.payment.findMany({
      where: { userId },
    });

    const issues = await db.issue.findMany({
      where: { userId },
    });

    const documents = await db.document.findMany({
      where: { uploadedById: userId },
    });

    const messages = await db.message.findMany({
      where: { recipientId: userId },
    });

    return NextResponse.json({
      payments,
      issues,
      documents,
      messages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
