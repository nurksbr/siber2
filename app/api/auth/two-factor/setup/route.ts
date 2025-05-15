import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { generateTwoFactorSecret, generateQRCode, generateBackupCodes } from '@/app/lib/twoFactorAuth';

const prisma = new PrismaClient();

// Kullanıcı kimlik doğrulama işlevi
async function authenticateUser(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// 2FA kurulum API endpoint'i
export async function GET(request: NextRequest) {
  try {
    // Kullanıcı kimlik doğrulama
    const decodedToken = await authenticateUser(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Kimlik doğrulama gerekli' },
        { status: 401 }
      );
    }

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: { email: true, twoFactorEnabled: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Eğer 2FA zaten etkinse, hata döndür
    if (user.twoFactorEnabled) {
      return NextResponse.json(
        { error: 'İki faktörlü kimlik doğrulama zaten etkin' },
        { status: 400 }
      );
    }

    // 2FA sırrı ve yedek kodlar oluştur
    const { secret, otpauth } = generateTwoFactorSecret(user.email);
    const qrCode = await generateQRCode(otpauth);
    const backupCodes = generateBackupCodes();

    // Kullanıcı veritabanını güncelle
    await prisma.user.update({
      where: { id: decodedToken.userId },
      data: {
        twoFactorSecret: secret,
        backupCodes: backupCodes,
        // Henüz etkinleştirilmedi, doğrulama sonrası etkinleştirilecek
      }
    });

    return NextResponse.json(
      { 
        message: 'İki faktörlü kimlik doğrulama kuruluma hazır',
        qrCode,
        secret,
        backupCodes
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('2FA kurulum hatası:', error);
    return NextResponse.json(
      { error: 'İki faktörlü kimlik doğrulama kurulurken bir hata oluştu' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 