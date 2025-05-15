import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { verifyTwoFactorCode } from '@/app/lib/twoFactorAuth';

const prisma = new PrismaClient();

// Doğrulama şeması
const disableSchema = z.object({
  code: z.string().min(6).max(6)
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

// 2FA devre dışı bırakma API endpoint'i
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
    const result = disableSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Doğrulama hatası', issues: result.error.issues },
        { status: 400 }
      );
    }

    const { code } = result.data;

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: { twoFactorSecret: true, twoFactorEnabled: true }
    });

    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı veya 2FA etkin değil' },
        { status: 404 }
      );
    }

    // Doğrulama kodunu kontrol et
    const isValid = verifyTwoFactorCode(code, user.twoFactorSecret);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Geçersiz doğrulama kodu' },
        { status: 400 }
      );
    }

    // 2FA'yı devre dışı bırak
    await prisma.user.update({
      where: { id: decodedToken.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        backupCodes: []
      }
    });

    return NextResponse.json(
      { message: 'İki faktörlü kimlik doğrulama başarıyla devre dışı bırakıldı' },
      { status: 200 }
    );
  } catch (error) {
    console.error('2FA devre dışı bırakma hatası:', error);
    return NextResponse.json(
      { error: 'İki faktörlü kimlik doğrulama devre dışı bırakılırken bir hata oluştu' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 