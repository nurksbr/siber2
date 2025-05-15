import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/lib/prisma';

// PUT /api/profile/notifications
export async function PUT(request: NextRequest) {
  try {
    // Get the current session to verify the user
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }
    
    // Get the current user
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }
    
    // Get the request body
    const {
      emailNotifications,
      smsNotifications,
      securityAlerts,
      newsUpdates,
      courseUpdates,
      marketingEmails,
    } = await request.json();
    
    // Get user profile
    const profile = await prisma.profile.findUnique({
      where: { userId: currentUser.id },
      include: { notificationPrefs: true },
    });
    
    if (!profile) {
      return NextResponse.json({ error: 'Profil bulunamadı' }, { status: 404 });
    }
    
    // Update notification preferences
    if (profile.notificationPrefs) {
      // Update existing notification preferences
      await prisma.notificationPreferences.update({
        where: { id: profile.notificationPrefs.id },
        data: {
          emailNotifications: emailNotifications !== undefined ? emailNotifications : profile.notificationPrefs.emailNotifications,
          smsNotifications: smsNotifications !== undefined ? smsNotifications : profile.notificationPrefs.smsNotifications,
          securityAlerts: securityAlerts !== undefined ? securityAlerts : profile.notificationPrefs.securityAlerts,
          newsUpdates: newsUpdates !== undefined ? newsUpdates : profile.notificationPrefs.newsUpdates,
          courseUpdates: courseUpdates !== undefined ? courseUpdates : profile.notificationPrefs.courseUpdates,
          marketingEmails: marketingEmails !== undefined ? marketingEmails : profile.notificationPrefs.marketingEmails,
        },
      });
    } else {
      // Create new notification preferences
      await prisma.notificationPreferences.create({
        data: {
          profileId: profile.id,
          emailNotifications: emailNotifications !== undefined ? emailNotifications : true,
          smsNotifications: smsNotifications !== undefined ? smsNotifications : false,
          securityAlerts: securityAlerts !== undefined ? securityAlerts : true,
          newsUpdates: newsUpdates !== undefined ? newsUpdates : true,
          courseUpdates: courseUpdates !== undefined ? courseUpdates : true,
          marketingEmails: marketingEmails !== undefined ? marketingEmails : false,
        },
      });
    }
    
    return NextResponse.json({
      message: 'Bildirim tercihleri başarıyla güncellendi',
    });
  } catch (error) {
    console.error('Bildirim tercihleri güncellenirken hata:', error);
    return NextResponse.json({ error: 'Bildirim tercihleri güncellenemedi' }, { status: 500 });
  }
}