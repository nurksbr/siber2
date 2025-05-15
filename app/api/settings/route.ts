import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import prisma from '@/app/lib/prisma';

// Prisma hatası nedeniyle geçici çözüm
// GET /api/settings
export async function GET(request: NextRequest) {
  try {
    // Token bilgisini cookie'den al (opsiyonel kontrol)
    const authToken = request.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }
    
    // Statik demo kullanıcı verisi
    const safeUserData = {
      id: 'demo_user',
      name: 'Demo Kullanıcı',
      email: 'kullanici@example.com',
      role: 'USER',
      createdAt: new Date().toISOString(),
      twoFactorEnabled: false,
      settings: {
        theme: 'DARK',
        preferredLanguage: 'tr',
        securityLevel: 'BEGINNER',
        contentPreferences: ['siber-güvenlik', 'yazılım', 'ağ']
      }
    };
    
    return NextResponse.json(safeUserData);
  } catch (error) {
    console.error('Kullanıcı ayarları getirilirken hata:', error);
    return NextResponse.json({ error: 'Kullanıcı ayarları getirilemedi' }, { status: 500 });
  }
} 