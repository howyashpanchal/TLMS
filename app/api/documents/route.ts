import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { put } from '@vercel/blob';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fixed: Use correct field name from your Prisma schema (uploadedById)
    const documents = await db.document.findMany({
      where: {
        uploadedById: userId // Changed from userId to uploadedById
      },
      orderBy: {
        createdAt: 'desc'
      },
      // Include related data if needed
      include: {
        lease: true,
        property: true
      }
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Error fetching documents' }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const leaseId = formData.get('leaseId') as string; // Add leaseId from form data
    const propertyId = formData.get('propertyId') as string; // Add propertyId from form data

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' }, 
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed types: PDF, Word, JPEG, PNG' }, 
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' }, 
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // Create document with proper field names from your Prisma schema
    const document = await db.document.create({
      data: {
        type: category || 'OTHER', // Match your schema's Document.type field
        name: file.name,
        fileUrl: blob.url, // Changed from url to fileUrl
        uploadedById: userId, // Correct field name from your schema
        leaseId: leaseId || null,
        propertyId: propertyId || null,
        // Add additional fields from your schema if needed
        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // Example expiration
      }
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json(
      { error: 'Error uploading document' }, 
      { status: 500 }
    );
  }
}