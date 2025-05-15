import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Korumalı rotalar
const protectedRoutes = ['/ayarlar', '/panel', '/profilim', '/egitimlerim'];

// Token kontrolü
const isValidToken = async (token: string): Promise<boolean> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  // Sadece korumalı rotalarda kontrol yapalım
  if (!protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Geçerli URL'i callback için kullan
  const callbackUrl = encodeURIComponent(pathname + (url.search || ''));
  
  // Token geçerli mi kontrol et
  const isValidUserToken = token ? await isValidToken(token) : false;
  
  // Hata ayıklama için token durumunu logla
  console.log(`Korumalı sayfa kontrolü - Yol: ${pathname}, Token geçerli: ${isValidUserToken}`);

  // Korumalı sayfalara erişim için token gerekli
  if (!isValidUserToken) {
    console.log(`Korumalı rota erişimi engellendi. Şuraya yönlendiriliyor: /giris?callbackUrl=${callbackUrl}`);
    
    // LocalStorage kontrolü için özel script ekleyerek response döndür
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Yönlendiriliyor...</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="robots" content="noindex, nofollow">
    </head>
    <body>
      <div id="loading" style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #111827; color: white;">
        <div style="text-align: center;">
          <div style="border: 3px solid rgba(0,0,0,.1); border-radius: 50%; border-top: 3px solid #06b6d4; width: 40px; height: 40px; margin: 0 auto 10px; animation: spin 1s linear infinite;"></div>
          <p>Oturum Kontrolü...</p>
        </div>
      </div>
      
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      
      <script>
        // LocalStorage'dan kullanıcı bilgisini kontrol et
        (function() {
          try {
            const user = localStorage.getItem('cyberly_user');
            const callbackUrl = "${callbackUrl}";
            
            // Kullanıcı bilgisi var mı ve geçerli bir JSON mu kontrol et
            if (user && user !== 'undefined' && user !== 'null') {
              try {
                // JSON olarak parse edip doğrula
                const userData = JSON.parse(user);
                if (userData && userData.id && userData.email) {
                  console.log('LocalStorage kullanıcı bilgisi bulundu: ' + userData.email);
                  
                  // Cookie kontrolü yap
                  let hasAuthCookie = document.cookie.split('; ').some(row => row.startsWith('auth_token='));
                  
                  if (!hasAuthCookie) {
                    console.log('Auth cookie bulunamadı, session yenileniyor...');
                    // LocalStorage'da kullanıcı bilgisi var ama cookie yoksa, sessionı yenile
                    fetch('/api/auth/refresh-session', {
                      method: 'POST',
                      headers: { 
                        'Content-Type': 'application/json' 
                      },
                      body: JSON.stringify({ 
                        userId: userData.id,
                        email: userData.email,
                        name: userData.name || '',
                        role: userData.role || 'USER'
                      }),
                      credentials: 'include'
                    })
                    .then(response => {
                      if (response.ok) {
                        // Session yenilendi, sayfayı yenile
                        console.log('Session yenilendi, sayfayı yeniliyorum');
                        window.location.reload();
                      } else {
                        // Yanıt metni kontrol edilip hata durumu detaylandırılabilir
                        response.text().then(text => {
                          console.error('Session yenileme başarısız:', text);
                          // Otomatik giriş denemesi
                          tryAutoLogin(userData);
                        });
                      }
                    })
                    .catch(err => {
                      console.error('Session yenileme hatası:', err);
                      // Otomatik giriş denemesi
                      tryAutoLogin(userData);
                    });
                    return;
                  }
                  
                  // Hem localStorage hem de cookie varsa, doğrudan içeriğe erişim ver (cookie geçersiz olabilir)
                  window.location.reload();
                  return;
                } else {
                  throw new Error('Geçersiz kullanıcı verisi');
                }
              } catch (parseError) {
                console.error('JSON parse hatası:', parseError);
                localStorage.removeItem('cyberly_user'); // Bozuk veriyi temizle
                redirectToLogin();
              }
            } else {
              // Kullanıcı bilgisi yok, doğrudan giriş sayfasına yönlendir
              redirectToLogin();
            }
          } catch (error) {
            console.error('LocalStorage erişim hatası:', error);
            redirectToLogin();
          }
          
          function tryAutoLogin(userData) {
            console.log('Otomatik giriş deneniyor...');
            
            // Kullanıcı bilgilerini kullanarak otomatik giriş yapmayı dene
            const autoLoginData = {
              email: userData.email,
              password: 'password' // Wildcard için "password" şifresi
            };
            
            fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(autoLoginData),
              credentials: 'include'
            })
            .then(loginResponse => {
              if (loginResponse.ok) {
                console.log('Otomatik giriş başarılı, sayfayı yeniliyorum');
                window.location.reload();
              } else {
                loginResponse.text().then(text => {
                  console.error('Otomatik giriş başarısız:', text);
                  redirectToLogin();
                });
              }
            })
            .catch((loginError) => {
              console.error('Otomatik giriş hatası:', loginError);
              redirectToLogin();
            });
          }
          
          function redirectToLogin() {
            console.log('Giriş sayfasına yönlendiriliyor...');
            window.location.href = '/giris?callbackUrl=' + callbackUrl;
          }
        })();
      </script>
    </body>
    </html>
    `;
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  }

  return NextResponse.next();
}