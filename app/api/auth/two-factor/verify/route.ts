import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { verifyTwoFactorCode, verifyBackupCode } from '@/app/lib/twoFactorAuth';

const prisma = new PrismaClient();

// Doğrulama şeması
const verifySchema = z.object({
  code: z.string().min(6).max(8)
});

// Kullanıcı kimlik doğrulama işlevi
async function authenticateUser(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as { id: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// 2FA doğrulama API endpoint'i
export async function POST(request: NextRequest) {
  try {
    // Kullanıcı kimlik doğrulama
    const decodedToken = await authenticateUser(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Kimlik doğrulama gerekli' },
        { status: 401 }
      );
    }

    // Gelen verileri doğrula
    const body = await request.json();
    const result = verifySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Doğrulama hatası', issues: result.error.issues },
        { status: 400 }
      );
    }

    const { code } = result.data;
    const isBackupCode = code.length === 8; // Yedek kodlar 8 karakter

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: { twoFactorSecret: true, backupCodes: true, twoFactorEnabled: true }
    });

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı veya 2FA henüz kurulmamış' },
        { status: 404 }
      );
    }

    let isValid = false;

    // Yedek kod mu yoksa normal kod mu kontrol et
    if (isBackupCode) {
      isValid = await verifyBackupCode(decodedToken.id, code);
    } else {
      isValid = verifyTwoFactorCode(code, user.twoFactorSecret);
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Geçersiz doğrulama kodu' },
        { status: 400 }
      );
    }

    // İlk doğrulama ise 2FA'yı etkinleştir
    if (!user.twoFactorEnabled) {
      await prisma.user.update({
        where: { id: decodedToken.id },
        data: { twoFactorEnabled: true }
      });

      return NextResponse.json(
        { message: 'İki faktörlü kimlik doğrulama başarıyla etkinleştirildi' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Doğrulama başarılı' },
      { status: 200 }
    );
  } catch (error) {
    console.error('2FA doğrulama hatası:', error);
    return NextResponse.json(
      { error: 'Doğrulama sırasında bir hata oluştu' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 