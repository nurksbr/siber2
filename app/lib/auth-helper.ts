'use client';

import { jwtDecode } from 'jwt-decode';

// LocalStorage anahtarı
export const USER_STORAGE_KEY = 'cyberly_user';

// User tipi
export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
};

// LocalStorage'dan kullanıcı bilgisini al
export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('LocalStorage okuma hatası:', error);
    return null;
  }
};

// LocalStorage'a kullanıcı bilgisini kaydet
export const storeUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch (error) {
    console.error('LocalStorage yazma hatası:', error);
  }
};

// Cookie yardımcı işlevleri
export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) {
      return part.split(';').shift() || null;
    }
  }
  return null;
};

// JWT token çözümleyici
export const parseJwt = (token: string) => {
  try {
    return jwtDecode<{
      userId: string;
      email: string;
      name: string;
      role: string;
      exp: number;
      iat: number;
    }>(token);
  } catch (e) {
    console.error('Token çözümleme hatası:', e);
    return null;
  }
};

// Token geçerli mi kontrol et
export const isTokenValid = (token: string): boolean => {
  const decoded = parseJwt(token);
  if (!decoded) return false;
  
  // Süre kontrolü
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

// Token'dan kullanıcı bilgisi çıkar
export const getUserFromToken = (token: string): User | null => {
  try {
    const decoded = parseJwt(token);
    if (!decoded) return null;
    
    return {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name || '',
      role: decoded.role || 'USER',
    };
  } catch (error) {
    console.error('Token çözümleme hatası:', error);
    return null;
  }
}; 