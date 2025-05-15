import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 2FA sırrı oluşturma
export function generateTwoFactorSecret(email: string) {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(email, 'CYBERLY', secret);
  return { secret, otpauth };
}

// QR kod oluşturma
export async function generateQRCode(otpauth: string): Promise<string> {
  try {
    return await qrcode.toDataURL(otpauth);
  } catch (error) {
    console.error('QR kod oluşturma hatası:', error);
    throw new Error('QR kod oluşturulamadı');
  }
}

// Yedek kodlar oluşturma (8 karakter uzunluğunda 10 adet kod)
export function generateBackupCodes(): string[] {
  const codes: string[] = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 8;
  const numberOfCodes = 10;

  for (let i = 0; i < numberOfCodes; i++) {
    let code = '';
    for (let j = 0; j < codeLength; j++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    codes.push(code);
  }

  return codes;
}

// Kod doğrulama
export function verifyTwoFactorCode(token: string, secret: string): boolean {
  return authenticator.verify({ token, secret });
}

// Yedek kod doğrulama
export async function verifyBackupCode(userId: string, code: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { backupCodes: true }
  });

  if (!user || !user.backupCodes.includes(code)) {
    return false;
  }

  // Kullanılan kodu listeden çıkar
  await prisma.user.update({
    where: { id: userId },
    data: {
      backupCodes: user.backupCodes.filter(c => c !== code)
    }
  });

  return true;
} 