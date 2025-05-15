import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/lib/prisma';

// PUT /api/profile/update
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
      name,
      bio,
      organization,
      title,
      location,
      interests,
      avatarUrl,
      theme,
      preferredLanguage,
      contentPreferences,
      securityLevel,
    } = await request.json();
    
    // Update user name if provided
    if (name) {
      await prisma.user.update({
        where: { id: currentUser.id },
        data: { name },
      });
    }
    
    // Check if profile exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: currentUser.id },
    });
    
    // Update or create profile
    const profileData: any = {};
    
    if (bio !== undefined) profileData.bio = bio;
    if (organization !== undefined) profileData.organization = organization;
    if (title !== undefined) profileData.title = title;
    if (location !== undefined) profileData.location = location;
    if (interests !== undefined) profileData.interests = interests;
    if (avatarUrl !== undefined) profileData.avatarUrl = avatarUrl;
    if (theme !== undefined) profileData.theme = theme;
    if (preferredLanguage !== undefined) profileData.preferredLanguage = preferredLanguage;
    if (contentPreferences !== undefined) profileData.contentPreferences = contentPreferences;
    if (securityLevel !== undefined) profileData.securityLevel = securityLevel;
    
    let profile;
    
    if (existingProfile) {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { userId: currentUser.id },
        data: profileData,
      });
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          ...profileData,
          userId: currentUser.id,
          theme: theme || 'LIGHT',
          securityLevel: securityLevel || 'BEGINNER',
          preferredLanguage: preferredLanguage || 'tr',
          contentPreferences: contentPreferences || [],
          interests: interests || [],
        },
      });
    }
    
    return NextResponse.json({
      message: 'Profil başarıyla güncellendi',
      profile,
    });
  } catch (error) {
    console.error('Profil güncellenirken hata:', error);
    return NextResponse.json({ error: 'Profil güncellenemedi' }, { status: 500 });
  }
}