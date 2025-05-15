'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// Kullanıcı tipi tanımı
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  avatarUrl?: string;
}

// Kimlik doğrulama bağlamı tipi
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; twoFactorRequired?: boolean }>;
  logout: () => void;
  checkSession: () => Promise<boolean>;
  verifyTwoFactor: (code: string) => Promise<{ success: boolean; message?: string }>;
}

// Kimlik doğrulama bağlamını oluşturma
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth sağlayıcı props tipi
interface AuthProviderProps {
  children: React.ReactNode;
}

// AuthProvider bileşeni
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Kullanıcı token'ından veri çıkarma işlevi
  const extractUserFromToken = (token: string): User | null => {
    try {
      const decoded: {
        userId: string;
        email: string;
        firstName?: string;
        lastName?: string;
        role?: string;
        avatarUrl?: string;
      } = jwtDecode(token);
      return {
        id: decoded.userId,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded.role,
        avatarUrl: decoded.avatarUrl
      };
    } catch (error) {
      console.error('Token decode hatası:', error);
      return null;
    }
  };

  // Oturum kontrolü
  const checkSession = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      const token = Cookies.get('auth_token');
      
      if (!token) {
        setUser(null);
        return false;
      }
      
      // Token geçerliliğini kontrol et
      const response = await fetch('/api/auth/session', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Oturum doğrulanamadı');
      }
      
      const userData = extractUserFromToken(token);
      if (userData) {
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Oturum kontrolü hatası:', error);
      Cookies.remove('auth_token');
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading]);

  // Sayfa yüklendiğinde kullanıcı oturumunu kontrol et
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Giriş fonksiyonu
  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string; twoFactorRequired?: boolean }> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Giriş hatası');
      }
      
      // İki faktörlü doğrulama kontrolü
      if (data.twoFactorRequired) {
        return { 
          success: true,
          twoFactorRequired: true,
          message: 'İki faktörlü doğrulama kodu gerekli'
        };
      }
      
      // Token'ı cookie'ye kaydet
      if (data.token) {
        Cookies.set('auth_token', data.token, { expires: 7 });
        const userData = extractUserFromToken(data.token);
        if (userData) {
          setUser(userData);
        }
      }
      
      // URL'deki callback parametresini kontrol et ve yönlendir
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get('callbackUrl');
      
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/panel');
      }
      
      return { success: true, message: 'Giriş başarılı' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Giriş sırasında bir hata oluştu';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // İki faktörlü doğrulama fonksiyonu
  const verifyTwoFactor = async (code: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/two-factor/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Doğrulama hatası');
      }
      
      // Token'ı cookie'ye kaydet
      if (data.token) {
        Cookies.set('auth_token', data.token, { expires: 7 });
        const userData = extractUserFromToken(data.token);
        if (userData) {
          setUser(userData);
        }
      }
      
      // URL'deki callback parametresini kontrol et ve yönlendir
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get('callbackUrl');
      
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/panel');
      }
      
      return { success: true, message: 'Doğrulama başarılı' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Doğrulama sırasında bir hata oluştu';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Çıkış fonksiyonu
  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
    router.push('/giris');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        checkSession,
        verifyTwoFactor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth; 