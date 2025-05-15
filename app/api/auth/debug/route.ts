import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  console.log('API: Debug endpoint çağrıldı');
  
  try {
    // Prisma kullanılabilirliğini kontrol et
    try {
      const isPrismaConnected = await prisma.$queryRaw`SELECT 1 as connected`;
      console.log('API: Prisma bağlantı kontrolü:', isPrismaConnected);
    } catch (connError) {
      console.error('API: Prisma bağlantı hatası:', connError);
      return NextResponse.json(
        { error: 'Veritabanı bağlantısı kurulamadı', details: connError instanceof Error ? connError.message : 'Bilinmeyen hata' },
        { status: 500 }
      );
    }
    
    // Kullanıcıları getir (şifre dahil)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true, // Şifreleri de göster
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    console.log('API: Kullanıcı sayısı:', users.length);
    
    // Veritabanı hakkında genel bilgi
    const prismaClient = prisma as any;
    const dbInfo = {
      provider: prismaClient._engineConfig?.datasourceOverrides?.db || 'Bilinmiyor',
      connectionLimit: prismaClient._engineConfig?.connectionLimit || 'Bilinmiyor',
      users: users.length
    };
    
    return NextResponse.json({
      message: 'Debug bilgileri',
      database: dbInfo,
      users: users
    }, { status: 200 });
  } catch (error) {
    console.error('API: Debug endpoint hatası:', error);
    return NextResponse.json(
      { error: 'Debug bilgileri alınırken bir hata oluştu', details: error instanceof Error ? error.message : 'Bilinmeyen hata' },
      { status: 500 }
    );
  }
} 