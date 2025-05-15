'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PrivacyPolicyPage() {
  const router = useRouter();
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/shield-lock.svg"
                alt="CYBERLY Logo"
                width={40}
                height={40}
                className="text-cyan-500"
                priority
              />
            </div>
            <span className="text-xl font-bold text-cyan-400">CYBERLY</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center px-4 py-2 rounded-md border border-gray-700 hover:border-cyan-400 hover:text-cyan-400 transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Geri Dön
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-cyan-400 mb-8">Gizlilik Politikası</h1>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8">
            <p className="text-gray-300 mb-4">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <div className="prose prose-invert prose-cyan max-w-none">
              <h2>1. Giriş</h2>
              <p>
                CYBERLY (&quot;Biz&quot;, &quot;Bizim&quot;, &quot;Platform&quot;) olarak, kişisel verilerinizin gizliliğini korumayı taahhüt ediyoruz. 
                Bu gizlilik politikası, verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
              </p>
              <p>
                Platformumuzu kullanarak, bu politikada belirtilen uygulamaları kabul etmiş olursunuz. Herhangi bir sorunuz 
                veya endişeniz varsa, info@cyberly.com.tr adresinden bizimle iletişime geçebilirsiniz.
              </p>
              
              <h2>2. Topladığımız Bilgiler</h2>
              <h3>2.1. Kişisel Bilgiler</h3>
              <p>
                Platformumuza kayıt olduğunuzda, aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul>
                <li>Ad ve soyadı</li>
                <li>E-posta adresi</li>
                <li>Şifre (şifrelenmiş formatta)</li>
                <li>Profil fotoğrafı (isteğe bağlı)</li>
                <li>İletişim bilgileri (isteğe bağlı)</li>
              </ul>
              
              <h3>2.2. Kullanım Verileri</h3>
              <p>
                Platformumuzu kullandığınızda, aşağıdaki bilgileri otomatik olarak toplayabiliriz:
              </p>
              <ul>
                <li>IP adresi</li>
                <li>Tarayıcı bilgileri</li>
                <li>Cihaz bilgileri</li>
                <li>Platformda harcanan süre</li>
                <li>Ziyaret edilen sayfalar</li>
                <li>Tıklama verileri</li>
                <li>Tamamlanan kurslar ve ilerlemeler</li>
              </ul>
              
              <h3>2.3. Çerezler (Cookies)</h3>
              <p>
                Kullanıcı deneyimini iyileştirmek için çerezler kullanıyoruz. Çerezler, tarayıcınız tarafından 
                cihazınıza yerleştirilen küçük metin dosyalarıdır. Bunlar, tercihlerinizi hatırlamak, kullanım 
                istatistiklerini toplamak ve platformu geliştirmek için kullanılır.
              </p>
              
              <h2>3. Bilgilerin Kullanımı</h2>
              <p>
                Topladığımız bilgileri aşağıdaki amaçlar için kullanabiliriz:
              </p>
              <ul>
                <li>Hesabınızı oluşturmak ve yönetmek</li>
                <li>Platformda size kişiselleştirilmiş içerik sunmak</li>
                <li>Kullanıcı deneyimini iyileştirmek</li>
                <li>Platform güvenliğini sağlamak</li>
                <li>Hizmeti geliştirmek ve yeni özellikler eklemek</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                <li>Size önemli güncellemeler ve bildirimler göndermek</li>
              </ul>
              
              <h2>4. Bilgilerin Paylaşımı</h2>
              <p>
                Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmıyoruz:
              </p>
              <ul>
                <li>Açık izniniz olduğunda</li>
                <li>Hizmet sağlayıcılarımızla işbirliği yaparken (ör. ödeme işlemcileri, sunucu sağlayıcıları)</li>
                <li>Yasal bir zorunluluk olduğunda (mahkeme kararı, yasal talep)</li>
                <li>Şirket birleşmesi veya satın alınması durumunda</li>
              </ul>
              
              <h2>5. Veri Güvenliği</h2>
              <p>
                Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz. Bu önlemler 
                arasında şifreleme, güvenli bağlantılar (SSL/TLS), düzenli güvenlik denetimleri ve erişim kontrolü 
                bulunmaktadır.
              </p>
              <p>
                Ancak, internet üzerinden hiçbir veri iletiminin veya depolamasının %100 güvenli olmadığını 
                unutmayın. Kişisel bilgilerinizi korumak için elimizden geleni yapsak da, mutlak güvenliği 
                garanti edemeyiz.
              </p>
              
              <h2>6. Veri Saklama Süresi</h2>
              <p>
                Kişisel verilerinizi, hizmetlerimizi sunmak için gerekli olduğu sürece veya yasal 
                yükümlülüklerimizi yerine getirmek için gereken süre boyunca saklıyoruz. Hesabınızı silmeniz 
                durumunda, verileriniz (yasal olarak saklanması gereken bilgiler hariç) makul bir süre içinde 
                sistemlerimizden kaldırılacaktır.
              </p>
              
              <h2>7. Kullanıcı Hakları</h2>
              <p>
                Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
              </p>
              <ul>
                <li>Verilerinize erişim ve bilgi alma hakkı</li>
                <li>Verilerinizin düzeltilmesini veya güncellenmesini talep etme hakkı</li>
                <li>Verilerinizin silinmesini talep etme hakkı</li>
                <li>Veri işleme faaliyetlerine itiraz etme hakkı</li>
                <li>Veri taşınabilirliği hakkı</li>
              </ul>
              <p>
                Bu haklarınızı kullanmak için info@cyberly.com.tr adresinden bizimle iletişime geçebilirsiniz.
              </p>
              
              <h2>8. Üçüncü Taraf Bağlantıları</h2>
              <p>
                Platformumuz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu web sitelerinin gizlilik 
                uygulamalarından sorumlu değiliz. Bu sitelere eriştiğinizde, kendi gizlilik politikalarını 
                okumanızı öneririz.
              </p>
              
              <h2>9. Çocukların Gizliliği</h2>
              <p>
                Hizmetlerimiz 18 yaşın altındaki kişilere yönelik değildir. Bilerek 18 yaşın altındaki 
                kişilerden kişisel bilgi toplamıyoruz. 18 yaşın altındaki bir çocuğun bize kişisel bilgi 
                sağladığını fark edersek, bu bilgileri kayıtlarımızdan silmek için adımlar atarız.
              </p>
              
              <h2>10. Politika Değişiklikleri</h2>
              <p>
                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler yapıldığında, 
                platformumuzda bir bildirim yayınlayacağız veya size e-posta ile bildirimde bulunacağız. 
                Politikadaki değişiklikleri düzenli olarak gözden geçirmenizi öneririz.
              </p>
              
              <h2>11. İletişim</h2>
              <p>
                Bu gizlilik politikası hakkında herhangi bir sorunuz veya endişeniz varsa, lütfen 
                info@cyberly.com.tr adresinden bizimle iletişime geçin.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link href="/giris" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition duration-200">
              Giriş Yap
            </Link>
            <Link href="/uye-ol" className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition duration-200">
              Üye Ol
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/shield-lock.svg"
                alt="CYBERLY Logo"
                width={32}
                height={32}
                className="text-cyan-500 mr-2"
              />
              <span className="text-cyan-400 font-bold">CYBERLY</span>
            </div>
            
            <div className="flex space-x-6">
              <Link href="/kullanim-sartlari" className="text-gray-400 hover:text-cyan-400">
                Kullanım Şartları
              </Link>
              <Link href="/gizlilik-politikasi" className="text-gray-400 hover:text-cyan-400">
                Gizlilik Politikası
              </Link>
              <Link href="/iletisim" className="text-gray-400 hover:text-cyan-400">
                İletişim
              </Link>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm mt-8">
            &copy; {new Date().getFullYear()} CYBERLY. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
} 