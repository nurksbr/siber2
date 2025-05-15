import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/lib/prisma';

// GET /api/profile/progress/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the current session to verify the user
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }
    
    // Check if the user is requesting their own progress or has admin rights
    const userId = params.id;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });
    
    if (!currentUser || (currentUser.id !== userId && currentUser.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz bulunmuyor' }, { status: 403 });
    }
    
    // Get the user's course progress
    const courseProgress = await prisma.courseProgress.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            title: true,
            level: true,
          },
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
    });
    
    // In a real application, you would fetch achievements from a database
    // For now, we'll return an empty array as a placeholder
    const achievements: any[] = [];
    
    return NextResponse.json({
      courseProgress,
      achievements,
    });
  } catch (error) {
    console.error('İlerleme bilgileri alınırken hata:', error);
    return NextResponse.json({ error: 'İlerleme bilgileri alınamadı' }, { status: 500 });
  }
}