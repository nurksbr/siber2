import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import * as bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER', // Rol açıkça USER olarak belirtiliyor
        backupCodes: JSON.stringify([]), // SQLite için String tipinde boş bir array
      },
    });
    
    // Hassas bilgileri çıkar
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { message: 'Kullanıcı başarıyla oluşturuldu', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { error: 'Kullanıcı oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 