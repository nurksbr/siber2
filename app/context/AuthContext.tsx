'use client';

import { createContext, useState, useEffect, useContext, ReactNode, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// Kullanıcı tipi
export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

// Auth context tipleri
export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// LocalStorage anahtarı
const USER_STORAGE_KEY = 'cyberly_user';

// Özel olay ekleyelim - oturum değişikliği için
export const AUTH_CHANGE_EVENT = 'auth_state_changed';

// LocalStorage'dan kullanıcı bilgisini al
const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('LocalStorage hatası:', error);
    return null;
  }
};

// LocalStorage'a kullanıcı bilgisini kaydet
const storeUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // Mevcut kullanıcıyı kontrol et
    const existingUserStr = localStorage.getItem(USER_STORAGE_KEY);
    const existingUser = existingUserStr ? JSON.parse(existingUserStr) : null;
    
    // Aynı kullanıcı ise gereksiz yere event tetikleme ve localstorage güncelleme
    if (user && existingUser && user.id === existingUser.id) {
      // Eğer aynı kullanıcıysa, sadece kritik alanlar değişmişse güncelle
      if (JSON.stringify(user) === JSON.stringify(existingUser)) {
        // Tamamen aynıysa hiçbir şey yapma
        return;
      }
    }
    
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      // Özel olay tetikle
      const authEvent = new CustomEvent(AUTH_CHANGE_EVENT, { detail: { user } });
      window.dispatchEvent(authEvent);
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
      // Özel olay tetikle - çıkış durumu
      const authEvent = new CustomEvent(AUTH_CHANGE_EVENT, { detail: { user: null } });
      window.dispatchEvent(authEvent);
    }
  } catch (error) {
    console.error('LocalStorage kayıt hatası:', error);
  }
};

// Cookie alıcı (istemci tarafında çalışır)
const getCookie = (name: string): string | null => {
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
const parseJwt = (token: string) => {
  try {
    return jwtDecode<{
      userId: string;
      email: string;
      role: string;
      exp: number;
    }>(token);
  } catch (e) {
    console.error('Token çözümleme hatası:', e);
    return null;
  }
};

// Token geçerli mi kontrol et
const isTokenValid = (token: string): boolean => {
  const decoded = parseJwt(token);
  if (!decoded) return false;
  
  // Süre kontrolü
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

// AuthProvider bileşeni
export function AuthProvider({ children }: { children: ReactNode }) {
  // Router tanımla
  const router = useRouter();
  
  // LocalStorage'dan başlangıç kullanıcı durumu
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Kullanıcı durumu değiştiğinde LocalStorage'ı güncelle
  // Ancak useEffect her render'da çalışmayı önleyeceğiz
  const userRef = useRef<User | null>(user);
  
  // Sadece kullanıcı değiştiğinde etkileyecek şekilde güncelle
  useEffect(() => {
    // userRef'ten farklıysa güncelle
    if (JSON.stringify(user) !== JSON.stringify(userRef.current)) {
      userRef.current = user;
      storeUser(user);
    }
  }, [user]);

  // Sayfa yüklendiğinde oturum durumunu kontrol et
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Eğer kullanıcı zaten varsa tekrar kontrol etmeye gerek yok
        if (user) {
          setLoading(false);
          return;
        }

        // LocalStorage'daki kullanıcı bilgisini kontrol et
        const storedUser = getStoredUser();
        if (storedUser) {
          // Kullanıcı bilgisi localStorage'da varsa doğrudan kullan
          setUser(storedUser);
          setLoading(false);
          return;
        }

        const isAuthenticated = await checkAuth();
        
        // Callback URL'i kontrol et
        const callbackUrl = searchParams?.get('callbackUrl');
        
        // Kullanıcı giriş yapmış ve bir callback URL varsa, pathname'e bakmaksızın yönlendir
        if (isAuthenticated && callbackUrl && callbackUrl !== pathname) {
          console.log(`Callback URL'e yönlendiriliyor: ${callbackUrl}`);
          router.push(decodeURIComponent(callbackUrl));
        }
      } catch (error) {
        console.error('Oturum kontrolü hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [pathname, router, searchParams]);

  // Kullanıcı oturumunu kontrol et
  const checkAuth = async (): Promise<boolean> => {
    try {
      // LocalStorage'da oturum varsa kontrol et
      const storedUser = getStoredUser();
      if (storedUser) {
        // Sadece istemci tarafı doğrulama yaparak işlemi hızlandır
        setUser(storedUser);
        return true;
      }
      
      // İstemci tarafında cookie kontrolü yap
      const token = getCookie('auth_token');
      
      if (!token) {
        setUser(null);
        storeUser(null);
        return false;
      }
      
      // Token geçerliliğini istemci tarafında kontrol et
      if (!isTokenValid(token)) {
        setUser(null);
        storeUser(null);
        return false;
      }
      
      // Token geçerli, sunucu doğrulamasına git
      try {
        const controller = new AbortController();
        // 10 saniye timeout ekle
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          credentials: 'include',
          cache: 'no-store',
          mode: 'same-origin', // CORS hatalarını önlemek için
          signal: controller.signal // timeout için
        });
        
        // Timeout'u temizle
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          console.error('Oturum doğrulama API hatası:', response.status);
          setUser(null);
          storeUser(null);
          return false;
        }
        
        // JSON parse hatalarını yakala
        let data;
        try {
          data = await response.json();
        } catch (parseError) {
          console.error('Oturum JSON parse hatası:', parseError);
          setUser(null);
          storeUser(null);
          return false;
        }
        
        if (data.user) {
          // Kullanıcı bilgisini güncelle
          setUser(data.user);
          storeUser(data.user);
          return true;
        }
      } catch (fetchError) {
        console.error('Oturum fetch hatası:', fetchError);
        
        // AbortError özel olarak işle - timeout durumunda
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
          console.warn('Oturum doğrulama isteği zaman aşımına uğradı');
        }
        
        // Fetch hatası durumunda - bağlantı veya ağ problemi olabilir
        // Daha önce depolanmış kullanıcı bilgisi varsa, o bilgileri geçici olarak koru
        const existingUser = getStoredUser();
        if (existingUser) {
          setUser(existingUser);
          return true; // Ağ hatası olsa bile kullanıcı bilgisi varsa oturumu açık tut
        }
      }
      
      // Sunucu tarafından doğrulama yapılamadıysa kullanıcı state'ini temizle
      setUser(null);
      storeUser(null);
      return false;
    } catch (error) {
      console.error('checkAuth: Oturum kontrolü hatası:', error);
      setUser(null);
      storeUser(null);
      return false;
    }
  };

  // Giriş fonksiyonu
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    console.log('AuthContext login fonksiyonu başladı');
    try {
      console.log('API isteği gönderiliyor...');
      
      // Ağ hatalarını yakalamak için try-catch
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // Cookie'ler için
          cache: 'no-store',
          mode: 'same-origin' // CORS hatalarını önlemek için
        });

        // Response tipi kontrolü
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('API JSON yanıtı döndürmedi:', contentType);
          throw new Error('Sunucu geçersiz yanıt döndürdü. Lütfen daha sonra tekrar deneyin.');
        }

        // JSON parse hatalarını yakalamak için try-catch
        let data;
        try {
          data = await response.json();
        } catch (parseError) {
          console.error('JSON parse hatası:', parseError);
          throw new Error('Sunucu yanıtı işlenemedi. Lütfen daha sonra tekrar deneyin.');
        }
        
        console.log('API yanıtı alındı:', response.status, data);

        if (!response.ok) {
          throw new Error(data.error || 'Giriş yapılırken bir hata oluştu');
        }

        // Kullanıcı bilgilerini doğrudan yanıttan al
        if (data.user) {
          console.log('Kullanıcı bilgileri alındı, state güncelleniyor');
          setUser(data.user);
          
          // Kullanıcıyı localStorage'a kaydetme işlemini güçlendirelim
          try {
            // Önce localStorage'ı temizle
            localStorage.removeItem(USER_STORAGE_KEY);
            // Sonra yeni kullanıcı bilgilerini kaydet
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
            console.log('Kullanıcı bilgileri localStorage\'a kaydedildi', data.user);
            
            // Kullanıcı state'ini güncelle
            storeUser(data.user);
          } catch (storageError) {
            console.error('LocalStorage kayıt hatası:', storageError);
          }
          
          // Navbar'ı ve diğer bileşenleri bilgilendir
          if (typeof window !== 'undefined') {
            // Olay yayınla - hızlı güncelleme için
            const authEvent = new CustomEvent(AUTH_CHANGE_EVENT, { 
              detail: { user: data.user, loggedIn: true } 
            });
            window.dispatchEvent(authEvent);
          }
          
          // Callback URL varsa doğrudan yönlendir, yoksa ana sayfaya
          const callbackUrl = searchParams?.get('callbackUrl');
          console.log('Callback URL:', callbackUrl);
          
          if (callbackUrl) {
            console.log(`Callback URL'e yönlendiriliyor: ${callbackUrl}`);
            try {
              router.push(decodeURIComponent(callbackUrl));
            } catch (navigateError) {
              console.error('Callback yönlendirme hatası:', navigateError);
              // Hata durumunda alternatif olarak window.location kullan
              window.location.href = decodeURIComponent(callbackUrl);
            }
          } else {
            // Ana sayfaya yönlendir
            console.log('Kullanıcı giriş yaptı, ana sayfaya yönlendiriliyor');
            try {
              router.push('/');
            } catch (navigateError) {
              console.error('Ana sayfa yönlendirme hatası:', navigateError);
              // Hata durumunda alternatif olarak window.location kullan
              window.location.href = '/';
            }
          }
        } else {
          // Oturum durumunu kontrol et
          console.log('Kullanıcı bilgisi bulunamadı, checkAuth çağrılıyor');
          await checkAuth();
        }
      } catch (fetchError) {
        console.error('Fetch hatası:', fetchError);
        
        // Ağ hatalarını özel olarak işle
        if (fetchError instanceof TypeError && fetchError.message.includes('fetch')) {
          throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
        }
        
        // Diğer hataları yeniden fırlat
        throw fetchError;
      }
    } catch (error) {
      console.error('Login fonksiyonu hatası:', error);
      throw error;
    } finally {
      setLoading(false);
      console.log('Login fonksiyonu tamamlandı, loading:', false);
    }
  };

  // Çıkış işlemi
  const logout = async (): Promise<void> => {
    setLoading(true);
    console.log('AuthContext: logout fonksiyonu başladı');
    
    try {
      // LocalStorage temizliği - bu kısmı async/await dışında tut ki hızlıca çalışsın
      if (typeof window !== 'undefined') {
        // Kullanıcı verilerini temizle
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem('cyberly_token');
        // Diğer muhtemel storage öğelerini temizle
        sessionStorage.removeItem(USER_STORAGE_KEY);
        
        // Cookie'yi doğrudan temizle - ekstra önlem
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        console.log('AuthContext: LocalStorage ve cookie temizlendi');
        
        // Olay yayınla - hızlı güncelleme için
        const authEvent = new CustomEvent(AUTH_CHANGE_EVENT, { 
          detail: { user: null, loggedIn: false } 
        });
        window.dispatchEvent(authEvent);
        console.log('AuthContext: AUTH_CHANGE_EVENT tetiklendi');
        
        // Giriş sayfasına yönlendirme
        try {
          console.log('AuthContext: Giriş sayfasına yönlendiriliyor');
          router.push('/giris');
        } catch (routerError) {
          console.error('Router yönlendirme hatası:', routerError);
          window.location.href = '/giris';
        }
      }
      
      // State'i hemen güncelle
      setUser(null);
      
      try {
        // API üzerinden çıkış işlemi - token cookie'sini temizler
        console.log('AuthContext: API üzerinden çıkış yapılıyor');
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        console.log('AuthContext: API çıkış yanıtı alındı', response.status);
      } catch (apiError) {
        console.error('Logout API hatası:', apiError);
        // API hatası olsa bile kullanıcı çıkış yapmış olacak
      }
      
      console.log('AuthContext: logout işlemi başarıyla tamamlandı');
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
      // Hata durumunda da temizlik yapalım
      setUser(null);
      storeUser(null);
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem('cyberly_token');
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // Hata durumunda da giriş sayfasına yönlendir
        window.location.href = '/giris';
      }
    } finally {
      setLoading(false);
      console.log('AuthContext: logout işlemi tamamlandı');
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// Auth context hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth hook must be used within an AuthProvider');
  }
  return context;
}