import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';
// import prisma from '@/app/lib/prisma'; // Prisma hatası nedeniyle kapatıyoruz

// Test kullanıcıları - demo ve geliştirme için
const TEST_USERS = [
  {
    id: 'test123',
    email: 'test@example.com',
    name: 'Test Kullanıcı',
    role: 'USER'
  },
  {
    id: 'user123',
    email: 'fevziyenur@icloud.com',
    name: 'Fevziye Nur',
    role: 'USER'
  },
  // Diğer test kullanıcıları
  {
    id: 'user456',
    email: 'admin@example.com',
    name: 'Admin Kullanıcı',
    role: 'ADMIN'
  }
];

export async function POST(request: NextRequest) {
  console.log('API: Refresh Session endpoint çağrıldı');
  
  try {
    // İsteği JSON olarak parse et
    let body;
    try {
      const text = await request.text();
      console.log('API: Ham istek gövdesi:', text);
      body = JSON.parse(text);
      console.log('API: İstek gövdesi başarıyla parse edildi');
    } catch (parseError) {
      console.error('API: JSON parse hatası:', parseError);
      return new NextResponse(
        JSON.stringify({ error: 'Geçersiz istek formatı', success: false }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        }
      );
    }
    
    const { userId, email, name, role } = body;
    console.log('API: Session yenileme isteği:', { userId, email });

    // Kullanıcı ID kontrolü
    if (!userId || !email) {
      console.log('API: Eksik bilgilerle session yenileme denemesi');
      return new NextResponse(
        JSON.stringify({ error: 'Kullanıcı bilgileri eksik', success: false }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // LocalStorage'dan Gelen Kullanıcı Verisi ile Doğrudan Token Oluştur
    if (email) {
      console.log('API: LocalStorage kullanıcı bilgisi ile session yenileniyor:', email);
      
      // İsteğe bağlı olarak, bilinen kullanıcıları doğrulayabilirsiniz
      // (Şu an için herhangi bir kullanıcıya izin veriyoruz)
      let userRole = role || 'USER';
      let userName = name || email.split('@')[0];
      
      // Test kullanıcıları için doğrulama (opsiyonel)
      const testUser = TEST_USERS.find(user => user.email === email);
      if (testUser) {
        console.log('API: Test kullanıcısı bulundu:', testUser.email);
        userRole = testUser.role;
        userName = testUser.name;
      }
      
      // JWT token oluştur
      const token = sign(
        {
          userId: userId,
          email: email,
          role: userRole,
        },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
      );

      // Kullanıcı bilgileri
      const userData = {
        id: userId,
        email: email,
        name: userName,
        role: userRole,
      };

      console.log('API: Token oluşturuldu, yanıt hazırlanıyor');
      
      // Cookie ayarla
      const response = new NextResponse(
        JSON.stringify({ 
          message: 'Session başarıyla yenilendi', 
          user: userData,
          success: true
        }),
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        }
      );

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 gün
        path: '/',
      });

      console.log('API: Session yenileme başarılı, yanıt gönderiliyor');
      return response;
    }

    // Veritabanı kullanıcıları yerine şimdilik test kullanıcıları ile devam ediyoruz
    // Prisma hatası nedeniyle DB işlemleri yerine test kullanıcıları kullanılıyor
    
    // Test kullanıcısı eşleşmesi varsa
    const testUser = TEST_USERS.find(user => user.id === userId || user.email === email);
    if (testUser) {
      console.log('API: Test kullanıcısı için session yenileniyor:', testUser.email);
      
      // JWT token oluştur
      const token = sign(
        {
          userId: testUser.id,
          email: testUser.email,
          role: testUser.role,
        },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
      );

      // Kullanıcı bilgileri
      const userData = {
        id: testUser.id,
        email: testUser.email,
        name: testUser.name,
        role: testUser.role,
      };

      console.log('API: Test kullanıcısı için token oluşturuldu, yanıt hazırlanıyor');
      
      // Cookie ayarla
      const response = new NextResponse(
        JSON.stringify({ 
          message: 'Session başarıyla yenilendi (Test kullanıcısı)', 
          user: userData,
          success: true
        }),
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        }
      );

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 gün
        path: '/',
      });

      console.log('API: Test kullanıcısı için session yenileme başarılı, yanıt gönderiliyor');
      return response;
    }

    // Bilinmeyen kullanıcı ama yine de wildcard token oluşturalım
    console.log('API: Bilinmeyen kullanıcı için session oluşturuluyor:', email);

    // JWT token oluştur
    const token = sign(
      {
        userId: userId,
        email: email,
        role: role || 'USER',
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    // Kullanıcı bilgileri
    const userData = {
      id: userId,
      email: email,
      name: name || email.split('@')[0],
      role: role || 'USER',
    };

    console.log('API: Wildcard token oluşturuldu, yanıt hazırlanıyor');
    
    // Cookie ayarla
    const response = new NextResponse(
      JSON.stringify({ 
        message: 'Session başarıyla oluşturuldu', 
        user: userData,
        success: true
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 gün
      path: '/',
    });

    console.log('API: Yeni session oluşturma başarılı, yanıt gönderiliyor');
    return response;
    
    /* Prisma bağlantı hatası nedeniyle bu kısım devre dışı bırakıldı
    // Normal kullanıcı işlemi - Prisma ile veritabanı sorgusu
    try {
      console.log('API: Veritabanında kullanıcı aranıyor:', userId);
      
      try {
        // Prisma kullanılabilirliğini kontrol et
        const isPrismaConnected = await prisma.$queryRaw`SELECT 1 as connected`;
        console.log('API: Prisma bağlantı kontrolü:', isPrismaConnected);
      } catch (connError) {
        console.error('API: Prisma bağlantı hatası:', connError);
        throw new Error('Veritabanı bağlantısı kurulamadı');
      }
      
      // Kullanıcıyı bul
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      // ...veritabanı işlemleri...
    } catch (dbError) {
      console.error('API: Veritabanı işlemi hatası:', dbError);
      // ...hata işleme...
    }
    */
  } catch (error) {
    console.error('API: Genel hata:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Session yenileme işlemi sırasında beklenmeyen bir hata oluştu', 
        success: false 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 