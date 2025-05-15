'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TermsOfServicePage() {
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
          <h1 className="text-3xl font-bold text-cyan-400 mb-8">Kullanım Şartları</h1>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8">
            <p className="text-gray-300 mb-4">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <div className="prose prose-invert prose-cyan max-w-none">
              <h2>1. Giriş</h2>
              <p>
                CYBERLY platformunu (&quot;Platform&quot;, &quot;Biz&quot;, &quot;Bizim&quot;) kullanırken, bu kullanım şartları (&quot;Şartlar&quot;) geçerlidir. 
                CYBERLY&apos;yi kullanarak, bu şartları kabul etmiş olursunuz. Şartları kabul etmiyorsanız, lütfen 
                platformumuzu kullanmayın.
              </p>
              
              <h2>2. Tanımlar</h2>
              <p>
                <strong>Kullanıcı:</strong> CYBERLY platformuna kayıt olan ve hizmetlerinden faydalanan gerçek veya tüzel kişi.
              </p>
              <p>
                <strong>İçerik:</strong> Platform üzerinde yer alan tüm metinler, görseller, videolar, eğitimler ve diğer materyaller.
              </p>
              <p>
                <strong>Üyelik:</strong> Kullanıcının CYBERLY platformuna erişim sağlayan hesap.
              </p>
              
              <h2>3. Üyelik ve Hesap Güvenliği</h2>
              <p>
                3.1. CYBERLY&apos;ye üye olmak için 18 yaşından büyük olmanız gerekmektedir.
              </p>
              <p>
                3.2. Kayıt sırasında doğru, güncel ve eksiksiz bilgiler vermeyi kabul edersiniz.
              </p>
              <p>
                3.3. Hesap şifrenizin güvenliğini korumakla yükümlüsünüz ve hesabınız altında gerçekleşen tüm eylemlerden sorumlusunuz.
              </p>
              <p>
                3.4. Hesabınızla ilgili herhangi bir güvenlik ihlali veya yetkisiz kullanımı derhal bize bildirmelisiniz.
              </p>
              
              <h2>4. Kabul Edilebilir Kullanım</h2>
              <p>
                4.1. Platformu Türkiye Cumhuriyeti kanunları ve düzenlemelerine uygun olarak kullanmayı kabul edersiniz.
              </p>
              <p>
                4.2. Platformu aşağıdaki amaçlar için kullanmamayı kabul edersiniz:
              </p>
              <ul>
                <li>Yasa dışı, zararlı, tehdit edici, taciz edici, karalayıcı veya başka bir şekilde sakıncalı içerik yayınlamak</li>
                <li>Başkalarının fikri mülkiyet haklarını ihlal etmek</li>
                <li>Kötü amaçlı yazılım veya virüs yaymak</li>
                <li>Platform'un normal işleyişini bozmak veya aşırı yük bindirmek</li>
                <li>Veri madenciliği, veri toplama veya diğer otomatik veri çıkarma yöntemlerini kullanmak</li>
              </ul>
              
              <h2>5. Fikri Mülkiyet Hakları</h2>
              <p>
                5.1. CYBERLY ve içeriği, fikri mülkiyet hakları tarafından korunmaktadır ve bize veya lisans verenlerimize aittir.
              </p>
              <p>
                5.2. Size platformu kullanma hakkı verilir, ancak bu şu anlama gelmez:
              </p>
              <ul>
                <li>İçeriği çoğaltabilir, değiştirebilir veya üçüncü şahıslara dağıtabilirsiniz.</li>
                <li>İçeriği ticari amaçlar için kullanabilirsiniz.</li>
                <li>Platformdan herhangi bir işaret, logo veya başka özel bilgiyi kaldırabilirsiniz.</li>
              </ul>
              
              <h2>6. Gizlilik</h2>
              <p>
                Kişisel bilgilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz hakkında bilgi için lütfen 
                <Link href="/gizlilik-politikasi" className="text-cyan-400 hover:text-cyan-300"> Gizlilik Politikamıza </Link> 
                bakın.
              </p>
              
              <h2>7. Sınırlı Sorumluluk</h2>
              <p>
                7.1. CYBERLY, platformun kesintisiz veya hatasız olacağını garanti etmez.
              </p>
              <p>
                7.2. Yasaların izin verdiği ölçüde, CYBERLY ve bağlı kuruluşları, platformun kullanımından veya 
                kullanılamamasından kaynaklanan herhangi bir doğrudan, dolaylı, arızi, özel veya sonuç olarak ortaya 
                çıkan zararlardan sorumlu tutulamaz.
              </p>
              
              <h2>8. Değişiklikler</h2>
              <p>
                8.1. Bu şartları dilediğimiz zaman değiştirme hakkını saklı tutarız.
              </p>
              <p>
                8.2. Herhangi bir değişiklik durumunda, güncellenmiş şartları platformda yayınlayacağız. Değişikliklerden 
                sonra platformu kullanmaya devam etmeniz, güncellenen şartları kabul ettiğiniz anlamına gelir.
              </p>
              
              <h2>9. Sözleşmenin Feshi</h2>
              <p>
                9.1. Bu şartları ihlal etmeniz durumunda, hesabınızı askıya alma veya sonlandırma hakkımızı saklı tutarız.
              </p>
              <p>
                9.2. İstediğiniz zaman hesabınızı kapatarak bu sözleşmeyi sonlandırabilirsiniz.
              </p>
              
              <h2>10. İletişim</h2>
              <p>
                Bu şartlar hakkında herhangi bir sorunuz veya endişeniz varsa, lütfen info@cyberly.com.tr adresinden 
                bizimle iletişime geçin.
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