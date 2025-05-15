import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Oturum kontrolü
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }
    
    // URL'den userId'yi al veya oturumdaki kullanıcıyı kullan
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Eğer userId yoksa, oturum açan kullanıcının ID'sini bul ve kullan
    if (!userId) {
      // Oturum açan kullanıcının e-posta adresinden ID'sini bul
      const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email as string },
        select: { id: true }
      });
      
      if (!currentUser) {
        return NextResponse.json({ error: 'Oturum açan kullanıcı bulunamadı' }, { status: 401 });
      }
      
      // Kullanıcının 2FA durumunu al
      const user = await prisma.user.findUnique({
        where: { id: currentUser.id },
        select: {
          id: true,
          twoFactorEnabled: true
        }
      });
      
      if (!user) {
        return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
      }
      
      return NextResponse.json({
        userId: user.id,
        twoFactorEnabled: user.twoFactorEnabled || false
      });
    }
    
    // Belirtilen userId için kullanıcıyı kontrol et
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        twoFactorEnabled: true,
        email: true,
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }
    
    // Yetki kontrolü - kullanıcı kendisi mi yoksa admin mi?
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: { id: true, role: true }
    });
    
    if (!currentUser) {
      return NextResponse.json({ error: 'Oturum açan kullanıcı bulunamadı' }, { status: 401 });
    }
    
    // Sadece kendisi veya admin erişim sağlayabilir
    if (currentUser.id !== userId && currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu bilgiye erişim yetkiniz yok' }, { status: 403 });
    }
    
    // 2FA durumunu döndür
    return NextResponse.json({
      userId: user.id,
      twoFactorEnabled: user.twoFactorEnabled || false
    });
  } catch (error) {
    console.error('2FA durum kontrolü hatası:', error);
    return NextResponse.json({ error: '2FA durumu kontrol edilirken bir hata oluştu' }, { status: 500 });
  }
} 