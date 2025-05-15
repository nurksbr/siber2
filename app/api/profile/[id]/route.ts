import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/app/lib/prisma';
import { verifyJwtToken } from '@/app/lib/auth';

// GET /api/profile/[id]
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  console.log('Profil API isteği başladı');

  try {
    // Token kontrolü - cookies() async olduğu için await kullanıyoruz
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      console.log('Token bulunamadı');
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }
    
    // Token doğrulama
    const decoded = verifyJwtToken(token);
    if (!decoded) {
      console.log('Token geçersiz');
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      );
    }
    
    // Next.js 13+ için dinamik parametreleri güvenli bir şekilde kullanma
    const { id } = context.params;
    console.log('Profil API isteği için userId:', id);
    
    // Kullanıcı kendi profilini istiyor mu veya admin mi kontrol et
    const requestedUserId = id;
    const requestingUserId = decoded.userId;
    const isAdmin = decoded.role === 'ADMIN';
    
    if (requestedUserId !== requestingUserId && !isAdmin) {
      console.log('Yetki hatası: Kullanıcı başka bir kullanıcının profiline erişmeye çalışıyor');
      return NextResponse.json(
        { error: 'Bu profili görüntüleme yetkiniz yok' },
        { status: 403 }
      );
    }
    
    // Kullanıcı bilgilerini getir
    const user = await prisma.user.findUnique({
      where: { id: requestedUserId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Ekstra profil alanları
        // ...
      },
    });
    
    if (!user) {
      console.log('Kullanıcı bulunamadı');
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    console.log('Profil verisi başarıyla alındı');
    return NextResponse.json(user);
  } catch (error) {
    console.error('Profil API hatası:', error);
    return NextResponse.json(
      { error: 'Profil bilgileri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}