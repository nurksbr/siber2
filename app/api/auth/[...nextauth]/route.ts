import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '@/app/lib/prisma';

// Kullanıcı oturumunu kontrol etme işlevi
export async function GET(request: NextRequest) {
  // Kullanıcı oturumunu kontrol et
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 401 });
  }
  
  try {
    // Token doğrulama
    const decodedToken = verify(token, process.env.JWT_SECRET || 'fallback_secret') as JwtPayload;
    
    // console.log('Decoded token:', decodedToken); // Debug için

    // Kullanıcı ID'sini kontrol et
    if (!decodedToken.userId && !decodedToken.sub) {
      console.error('Token içinde userId veya sub bulunamadı:', decodedToken);
      return NextResponse.json({ error: 'Geçersiz token yapısı' }, { status: 401 });
    }
    
    // userId veya sub'ı kullan
    const userId = decodedToken.userId || decodedToken.sub;
    
    // Kullanıcı bilgilerini getir
    const user = await prisma.user.findUnique({
      where: { id: userId as string },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return NextResponse.json({ error: 'Geçersiz veya süresi dolmuş oturum' }, { status: 401 });
  }
}

// Çıkış yapma işlevi
export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    // Cookie'yi sil
    cookieStore.delete('auth-token');
    
    return NextResponse.json(
      { message: 'Başarıyla çıkış yapıldı' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Çıkış hatası:', error);
    return NextResponse.json(
      { error: 'Çıkış yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
}