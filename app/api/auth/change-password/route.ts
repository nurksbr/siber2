import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/lib/prisma';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';

// Şifre değiştirme şeması
const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: 'Şifre en az 8 karakter olmalıdır' })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
      message: 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir',
    })
});

// POST /api/auth/change-password
export async function POST(request: NextRequest) {
  try {
    // Oturumu kontrol et
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }
    
    // İsteği doğrula
    const body = await request.json();
    
    const result = changePasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Doğrulama hatası', issues: result.error.issues },
        { status: 400 }
      );
    }
    
    const { currentPassword, newPassword } = result.data;
    
    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }
    
    // Mevcut şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Mevcut şifre yanlış' }, { status: 400 });
    }
    
    // Şifreleri karşılaştır (aynı şifreyi tekrar kullanmayı engelle)
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    
    if (isSamePassword) {
      return NextResponse.json({ error: 'Yeni şifre mevcut şifreyle aynı olamaz' }, { status: 400 });
    }
    
    // Yeni şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Kullanıcının şifresini güncelle
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    
    return NextResponse.json({ message: 'Şifre başarıyla güncellendi' });
  } catch (error) {
    console.error('Şifre değiştirme hatası:', error);
    return NextResponse.json({ error: 'Şifre değiştirilirken bir hata oluştu' }, { status: 500 });
  }
}