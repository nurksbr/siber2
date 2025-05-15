import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
// import * as bcrypt from 'bcrypt'; // Artık kullanmıyoruz

export async function GET(request: NextRequest) {
  console.log('API: Test kullanıcısı oluşturma endpoint çağrıldı');
  
  try {
    // Test kullanıcı bilgileri
    const name = "Test Kullanıcı";
    const email = "test@example.com";
    const password = "Test1234";
    
    console.log('API: Test kullanıcısı için bilgiler:', { name, email, password });
    
    try {
      // Önce bağlantıyı kontrol et
      const prismaTest = await prisma.$queryRaw`SELECT 1 as connected`;
      console.log('API: Prisma bağlantısı başarılı:', prismaTest);
    } catch (dbError) {
      console.error('API: Veritabanı bağlantı hatası:', dbError);
      return NextResponse.json(
        { error: 'Veritabanı bağlantısı kurulamadı', details: dbError instanceof Error ? dbError.message : 'Bilinmeyen hata' },
        { status: 500 }
      );
    }
    
    // E-posta adresi zaten kullanılıyor mu kontrol et
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      
      if (existingUser) {
        console.log('API: Test kullanıcısı zaten var, kullanılabilir:', existingUser);
        return NextResponse.json(
          { 
            message: 'Test kullanıcısı zaten mevcut', 
            user: { 
              id: existingUser.id, 
              name: existingUser.name, 
              email: existingUser.email,
              test_password: password // Kullanıcı şifresi (şifrelenmemiş)
            }
          },
          { status: 200 }
        );
      }
      
      console.log('API: Kullanıcı bulunamadı, yeni kullanıcı oluşturuluyor');
    } catch (findError) {
      console.error('API: Kullanıcı arama hatası:', findError);
      return NextResponse.json(
        { error: 'Kullanıcı arama sırasında hata oluştu', details: findError instanceof Error ? findError.message : 'Bilinmeyen hata' },
        { status: 500 }
      );
    }
    
    // Şifreyi hashleme, doğrudan kullan
    console.log('API: Şifre açık metin olarak kaydediliyor:', password);
    
    // Kullanıcıyı oluştur
    try {
      console.log('API: Kullanıcı oluşturuluyor');
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password, // Açık metin şifre
          role: 'USER',
        },
      });
      
      console.log('API: Test kullanıcısı başarıyla oluşturuldu:', user);
      
      return NextResponse.json(
        { 
          message: 'Test kullanıcısı başarıyla oluşturuldu', 
          user: { 
            id: user.id, 
            name: user.name, 
            email: user.email,
            password: user.password // Şifreyi de göster
          }
        },
        { status: 201 }
      );
    } catch (createError) {
      console.error('API: Kullanıcı oluşturma hatası:', createError);
      return NextResponse.json(
        { error: 'Kullanıcı oluşturulurken bir hata oluştu', details: createError instanceof Error ? createError.message : 'Bilinmeyen hata' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API: Test kullanıcısı oluşturma genel hatası:', error);
    return NextResponse.json(
      { error: 'Kullanıcı oluşturulurken bir hata oluştu', details: error instanceof Error ? error.message : 'Bilinmeyen hata' },
      { status: 500 }
    );
  }
} 