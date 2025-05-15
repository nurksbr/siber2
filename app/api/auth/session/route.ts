import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Next.js 14+ için doğru cookies() kullanımı
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Oturum bulunamadı', isAuthenticated: false },
        { status: 401 }
      );
    }

    try {
      // Token'ı doğrula
      const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as {
        userId: string;
      };

      // Kullanıcıyı bul
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Geçersiz oturum', isAuthenticated: false },
          { status: 401 }
        );
      }

      // Kullanıcı bilgilerini döndür
      return NextResponse.json(
        { user, isAuthenticated: true }, 
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
          } 
        }
      );
    } catch (tokenError) {
      console.error('Token doğrulama hatası:', tokenError);
      return NextResponse.json(
        { error: 'Geçersiz token', isAuthenticated: false },
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        }
      );
    }
  } catch (error) {
    console.error('Oturum kontrolü hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası', isAuthenticated: false },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );
  }
} 