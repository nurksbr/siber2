// Kimlik doğrulama ile ilgili tip tanımlamaları

// Kullanıcı rolleri
export enum Role {
  USER = 'USER',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

// Kullanıcı tipi
export type User = {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

// Kimlik doğrulama yanıtı
export type AuthResponse = {
  user: Omit<User, 'password'> | null;
  message?: string;
  error?: string;
};

// Giriş formu verileri
export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

// Kayıt formu verileri
export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreeTerms?: boolean;
};

// JWT içeriği
export type JWTPayload = {
  id: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
};