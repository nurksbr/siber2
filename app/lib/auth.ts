import { verify } from 'jsonwebtoken';

/**
 * JWT token'ı doğrular ve içeriğini döndürür
 * @param token JWT token
 * @returns Doğrulanmış token içeriği veya null
 */
export function verifyJwtToken(token: string): { userId: string; email: string; role: string } | null {
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as {
      userId: string;
      email: string;
      role: string;
    };
    
    return decoded;
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return null;
  }
} 