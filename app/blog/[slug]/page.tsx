import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Blog yazıları veritabanı - normalde bir veritabanından çekilir
const blogPostsData = [
  {
    slug: 'zero-trust-guvenlik-modeli-sirketler-icin-uygulama-rehberi',
    title: 'Zero Trust Güvenlik Modeli: Şirketler İçin Uygulama Rehberi',
    excerpt: '"Hiçbir şeye güvenme, her şeyi doğrula" prensibiyle çalışan Zero Trust modelini kurumunuza nasıl entegre edebilirsiniz?',
    content: `
      <h2>Zero Trust: "Hiçbir Şeye Güvenme, Her Şeyi Doğrula"</h2>
      <p>Geleneksel güvenlik modelleri genellikle "kale ve hendek" yaklaşımını benimsemiştir. Bu yaklaşımda, kurumsal ağın dış sınırları güçlü bir şekilde korunurken, iç ağa erişim sağlayan kullanıcı ve cihazlara daha fazla güven gösterilir. Ancak, iç tehditler ve karmaşık tedarik zinciri saldırılarının artması bu modelin zayıflıklarını ortaya çıkarmıştır.</p>
      
      <p>Zero Trust güvenlik modeli, güveni varsayılan olarak ortadan kaldırır ve her erişim talebini potansiyel bir tehdit olarak değerlendirir. Bu model şu temel prensipler üzerine kuruludur:</p>
      
      <ol>
        <li><strong>Kimlik doğrulama ve yetkilendirmenin sürekli olması:</strong> Her erişim talebinde kullanıcının kimliği ve yetkisi doğrulanır.</li>
        <li><strong>En az ayrıcalık prensibi:</strong> Kullanıcılara ve sistemlere sadece görevlerini yerine getirmeleri için gereken minimum yetki verilir.</li>
        <li><strong>Mikro-segmentasyon:</strong> Ağ, daha küçük ve izole parçalara bölünerek yanal hareketin engellenmesi sağlanır.</li>
        <li><strong>Çok faktörlü kimlik doğrulama (MFA):</strong> Tüm kritik sistemlere erişim için birden fazla faktör gerektiren doğrulama mekanizmaları kullanılır.</li>
        <li><strong>Cihaz sağlığının sürekli izlenmesi:</strong> Erişim sağlayan tüm cihazların güvenlik durumu sürekli olarak değerlendirilir.</li>
      </ol>
      
      <h2>Zero Trust Modelini Uygulamak: Adım Adım Yaklaşım</h2>
      
      <h3>1. Korunacak Değerli Varlıkları Belirleme</h3>
      <p>Öncelikle, kurumunuzdaki en değerli varlıkları (hassas veriler, kritik sistemler vb.) belirleyin ve sınıflandırın. Bu, koruma stratejinizi önceliklendirmenize yardımcı olacaktır.</p>
      
      <h3>2. Erişim Kontrol Stratejisi Oluşturma</h3>
      <p>Kimlik ve erişim yönetimi (IAM) çözümünüzü, rol tabanlı erişim kontrolü (RBAC) ile birlikte kullanarak, her kullanıcı için en az ayrıcalık prensibini uygulayın. Erişim hakları düzenli olarak gözden geçirilmeli ve gereksiz yetkiler kaldırılmalıdır.</p>
      
      <h3>3. Kimlik Doğrulama Mekanizmalarını Güçlendirme</h3>
      <p>Çok faktörlü kimlik doğrulama (MFA) tüm kurumsal hesaplar için zorunlu hale getirilmelidir. Özellikle kritik sistemlere ve hassas verilere erişim için biyometrik faktörler veya donanım anahtarları gibi güvenli yöntemler tercih edilmelidir.</p>
      
      <h3>4. Ağ Segmentasyonu ve Mikro-Segmentasyon</h3>
      <p>Ağınızı mantıksal olarak ayrı segmentlere bölün ve her segment arasındaki trafiği sınırlandırın. Mikro-segmentasyon uygulaması, saldırganların ağ içinde yatay hareketini engeller. Yazılım tabanlı ağlar (SDN) bu konuda etkin çözümler sunabilir.</p>
      
      <h3>5. Sürekli İzleme ve Doğrulama</h3>
      <p>Tüm ağ trafiğini, kullanıcı davranışlarını ve sistem aktivitelerini gerçek zamanlı olarak izleyin. Anormal davranışları tespit edebilen gelişmiş güvenlik bilgileri ve olay yönetimi (SIEM) çözümleri kullanın.</p>
      
      <h3>6. Otomatik Tehdit Yanıtı</h3>
      <p>Şüpheli aktiviteler tespit edildiğinde otomatik yanıt mekanizmaları devreye girebilmelidir. Örneğin, anormal bir giriş tespitinde hesap kilitlenebilir veya ek doğrulama istenebilir.</p>
      
      <h2>Zero Trust Modelinin Zorluklarıyla Başa Çıkmak</h2>
      
      <h3>Kullanıcı Deneyimi Dengesi</h3>
      <p>Zero Trust uygulamaları bazen kullanıcı deneyimini olumsuz etkileyebilir. Sürtünmesiz bir deneyim sunmak için, risk bazlı kimlik doğrulama kullanılabilir. Bu yaklaşımda, düşük riskli erişimler için daha az zorlayıcı doğrulama mekanizmaları devreye girer.</p>
      
      <h3>Eski Sistemlerle Entegrasyon</h3>
      <p>Eski sistemler genellikle modern kimlik doğrulama mekanizmalarını desteklemez. Bu sistemler için proxy tabanlı erişim kontrolleri veya API ağ geçitleri kullanılabilir.</p>
      
      <h3>Yatırım Maliyeti</h3>
      <p>Zero Trust modelini uygulamak önemli bir yatırım gerektirebilir. Bu maliyeti yönetmek için, kademeli bir yaklaşım benimseyebilir ve öncelikle en kritik varlıkları korumaya odaklanabilirsiniz.</p>
      
      <h2>Sonuç</h2>
      <p>Zero Trust modeli, günümüzün karmaşık tehdit ortamında organizasyonların güvenliğini sağlamak için en etkili yaklaşımlardan biridir. Bu modeli başarıyla uygulamak için teknik çözümler kadar, kurumsal kültür ve süreçlerin de dönüşümü gereklidir. Güvenliği bir ürün değil, sürekli gelişen bir süreç olarak görmek ve buna uygun stratejiler geliştirmek, başarılı bir Zero Trust uygulamasının temelidir.</p>
    `,
    date: '5 Nisan 2024',
    readTime: '10 dk okuma',
    author: 'Fevziye Nur Kesebir',
    category: 'Güvenlik Önlemleri',
    relatedPosts: [
      'api-guvenligi-rest-ve-graphql-uygulamalarinda-guvenlik-riskleri',
      'tehdit-avi-threat-hunting-proaktif-siber-guvenlik-yaklasimi'
    ]
  },
  {
    slug: 'sosyal-muhendislik-saldirilari-guncel-teknikler-ve-savunma',
    title: 'Sosyal Mühendislik Saldırıları: Güncel Teknikler ve Savunma',
    excerpt: 'Değişen sosyal mühendislik taktikleri, işyerinde ve günlük hayatta kendinizi ve kurumunuzu nasıl koruyabilirsiniz?',
    content: `
      <h2>Sosyal Mühendislik: İnsan Psikolojisini Hedefleyen Siber Tehdit</h2>
      <p>Sosyal mühendislik, teknik güvenlik önlemlerini aşmak için insan psikolojisini, güveni ve doğal eğilimleri manipüle eden siber saldırı yöntemidir. Teknolojik çözümler ne kadar gelişirse gelişsin, insan faktörü her zaman bir sistemdeki en zayıf halka olmaya devam etmektedir.</p>
      
      <p>Son yıllarda sosyal mühendislik taktikleri daha karmaşık, hedefli ve ikna edici hale gelmiştir. Bu yazıda güncel sosyal mühendislik tekniklerini ve bunlara karşı alınabilecek önlemleri inceleyeceğiz.</p>
      
      <h2>Güncel Sosyal Mühendislik Teknikleri</h2>
      
      <h3>1. Hedefli Kimlik Avı (Spear Phishing)</h3>
      <p>Standart kimlik avı saldırılarının aksine, hedefli kimlik avı belirli bir kişi veya kuruma yönelik özelleştirilmiş içeriklerle gelir. Saldırganlar, hedefin sosyal medya profilleri, profesyonel bağlantıları ve çevrimiçi etkinliklerini araştırarak kişiselleştirilmiş ve inandırıcı mesajlar oluşturur.</p>
      <p><strong>Örnek:</strong> Bir çalışan, şirketin gerçek İK direktöründen gelmiş gibi görünen, şirket içi bir promosyon veya bonus programıyla ilgili kişiselleştirilmiş bir e-posta alır. E-posta, çalışanın gerçek bilgilerini içerir ve şirket formatını tam olarak taklit eder.</p>
      
      <h3>2. İş E-postası Ele Geçirme (BEC) Saldırıları</h3>
      <p>Bu saldırılarda, saldırganlar üst düzey bir yöneticinin e-posta hesabını ele geçirir veya taklit eder ve genellikle finans departmanındaki çalışanlara sahte ödeme talepleri gönderir.</p>
      <p><strong>Örnek:</strong> Bir muhasebe çalışanı, CFO'dan gelen ve "acil" bir tedarikçi ödemesi yapılmasını isteyen bir e-posta alır. E-posta, CFO'nun gerçek imzasını ve iletişim bilgilerini içerir, ancak ödeme bilgileri saldırganın hesabına yönlendirilmiştir.</p>
      
      <h3>3. Deepfake ve Yapay Zeka Destekli Sahtekarlıklar</h3>
      <p>Yapay zeka teknolojilerinin gelişmesiyle, saldırganlar artık ses klonlama ve video manipülasyonu kullanarak üst düzey yöneticileri taklit edebilmektedir.</p>
      <p><strong>Örnek:</strong> Bir finans yöneticisi, CEO'nun sesinin klonlandığı bir telefon görüşmesi alır ve "gizli bir satın alma" için acil bir EFT yapması istenir. Ses, CEO'nun konuşma tarzını ve aksanını mükemmel şekilde taklit etmektedir.</p>
      
      <h3>4. Çok Platformlu Sosyal Mühendislik</h3>
      <p>Modern sosyal mühendislik saldırıları tek bir iletişim kanalıyla sınırlı kalmaz. Saldırganlar, hedefin güvenini kazanmak için birden fazla platformu kullanır.</p>
      <p><strong>Örnek:</strong> Bir saldırgan önce hedefin LinkedIn profilinden şirket bilgilerini toplar, ardından e-posta ile bağlantı kurar. Güven oluşturmak için sahte bir WhatsApp hesabından mesaj gönderir ve sonunda telefon görüşmesi yaparak hassas bilgiler ister.</p>
      
      <h3>5. Tarama/Vishing (Telefon Dolandırıcılığı)</h3>
      <p>Telefon üzerinden yapılan dolandırıcılık saldırıları, çoğunlukla teknik destek dolandırıcılığı veya banka/resmi kurum yetkilileri gibi davranmayı içerir.</p>
      <p><strong>Örnek:</strong> Kurbanı arayan kişi kendini bankadan arayan bir güvenlik yetkilisi olarak tanıtır ve hesapta şüpheli işlemler olduğunu bildirir. Kurbandan doğrulama amacıyla kart bilgileri veya OTP kodları istenir.</p>
      
      <h2>Sosyal Mühendislik Saldırılarından Korunma Yöntemleri</h2>
      
      <h3>1. Farkındalık Eğitimi</h3>
      <p>En etkili koruma yöntemi, tüm çalışanların sosyal mühendislik teknikleri konusunda düzenli olarak eğitilmesidir.</p>
      <ul>
        <li>Düzenli farkındalık eğitimleri ve simülasyonlar düzenleyin</li>
        <li>Gerçek olaylara dayalı senaryolar ve vaka çalışmaları kullanın</li>
        <li>Yeni ve gelişen sosyal mühendislik taktikleri hakkında güncellemeler sağlayın</li>
      </ul>
      
      <h3>2. Doğrulama Protokolleri Oluşturun</h3>
      <p>Özellikle para transferleri, hassas bilgi paylaşımı veya kimlik bilgilerinin sağlanması gibi yüksek riskli işlemler için çoklu doğrulama süreçleri oluşturun.</p>
      <ul>
        <li>Büyük finansal işlemler için ikinci bir kanal üzerinden doğrulama yapın (telefon araması + e-posta onayı)</li>
        <li>Para transferleri için yüz yüze veya video konferans doğrulaması isteyin</li>
        <li>Ödeme bilgilerindeki değişiklikler için özel doğrulama protokolleri uygulayın</li>
      </ul>
      
      <h3>3. Teknolojik Önlemler</h3>
      <p>İnsan faktörüne ek olarak, teknolojik savunma katmanları da eklenmeli:</p>
      <ul>
        <li>Gelişmiş e-posta filtreleme ve oltalama koruması</li>
        <li>Çok faktörlü kimlik doğrulama (MFA)</li>
        <li>E-posta güvenlik ağ geçitleri ve dış e-postaları belirten uyarı bantları</li>
        <li>Gelen e-postalardaki harici bağlantıları görselleştiren araçlar</li>
      </ul>
      
      <h3>4. "Güven Ama Doğrula" Kültürünü Teşvik Edin</h3>
      <p>Kurumsal kültürünüzde, alışılmadık istekleri sorgulama ve doğrulama davranışını teşvik edin. Çalışanlar, üst yönetimden gelen olağandışı talepleri bile sorgulayabileceklerini bilmelidir.</p>
      <ul>
        <li>Olağandışı istekleri doğrulama konusunda çalışanları destekleyin</li>
        <li>Sorgulamayı teşvik eden bir kültür oluşturun</li>
        <li>Hiyerarşik konumdan bağımsız olarak, şüpheli durumları bildirme konusunda çalışanları yetkilendirin</li>
      </ul>
      
      <h3>5. Olay Müdahale Planı Oluşturun</h3>
      <p>Bir sosyal mühendislik saldırısı gerçekleştiğinde ne yapılacağına dair net bir plan oluşturun:</p>
      <ul>
        <li>Olayı kime ve nasıl bildireceğiniz</li>
        <li>Kanıtları nasıl toplayacağınız</li>
        <li>Zararı nasıl sınırlayacağınız</li>
        <li>Gelecekteki saldırıları önlemek için hangi adımları atacağınız</li>
      </ul>
      
      <h2>Günlük Hayatta Sosyal Mühendisliğe Karşı İpuçları</h2>
      
      <ol>
        <li><strong>Her zaman sorgulayın:</strong> Beklenmedik e-postalar, mesajlar veya aramalara karşı sağlıklı bir şüphecilik geliştirin.</li>
        <li><strong>Aciliyet baskısına direnin:</strong> Sosyal mühendisler, kurbanlara düşünmek için zaman bırakmamak adına genellikle aciliyet yaratır. "Hemen şimdi" isteklerine karşı temkinli olun.</li>
        <li><strong>Bağımsız doğrulama yapın:</strong> Kritik istekleri her zaman alternatif bir iletişim kanalından doğrulayın.</li>
        <li><strong>Bilgileri bölümlendirin:</strong> Hassas bilgileri farklı kanallarda paylaşın (örneğin, bir dosya paylaşım bağlantısını e-posta ile gönderin, şifreyi SMS ile gönderin).</li>
        <li><strong>Gizlilik ayarlarınızı kontrol edin:</strong> Sosyal medya ve profesyonel ağlardaki gizlilik ayarlarınızı düzenli olarak gözden geçirin.</li>
      </ol>
      
      <h2>Sonuç</h2>
      <p>Sosyal mühendislik saldırıları, teknoloji ilerledikçe daha karmaşık hale gelmeye devam edecektir. Ancak farkındalık, eğitim ve sağlam protokollerle, bu tehditlere karşı dirençli bir organizasyon oluşturulabilir. Unutmamak gerekir ki, siber güvenlik sadece teknolojik önlemlerden ibaret değildir; insan faktörünün güçlendirilmesi en az o kadar önemlidir.</p>
      
      <p>Şirketinizde veya kişisel hayatınızda sosyal mühendislik farkındalığını artırmak, dijital çağda güvenliğinizin temel bir bileşenidir.</p>
    `,
    date: '28 Mart 2024',
    readTime: '8 dk okuma',
    author: 'Nisanur Gökçen Usta',
    category: 'Sosyal Mühendislik',
    relatedPosts: [
      'zero-trust-guvenlik-modeli-sirketler-icin-uygulama-rehberi',
      'kvkk-ve-gdpr-uyumlu-veri-koruma-stratejileri'
    ]
  },
  // Diğer blog yazıları buraya eklenebilir
]

// Öne çıkan blog yazısı
const featuredPostData = {
  slug: 'featured',
  title: 'Yeni Nesil Fidye Yazılımları ve Korunma Yöntemleri',
  excerpt: 'Son yıllarda evrilen fidye yazılımları, çift taraflı tehdit stratejileri ve kuruluşların alması gereken kapsamlı önlemler hakkında detaylı bir analiz.',
  content: `
    <h2>Fidye Yazılımlarının Evrimi: Yeni Tehditler ve Taktikler</h2>
    <p>Son yıllarda fidye yazılımı saldırıları sadece sayıca artmakla kalmadı, aynı zamanda stratejik olarak da evrim geçirdi. Geleneksel fidye yazılımları, kullanıcıların verilerini şifreleyip fidye talep etmeye odaklanırken, yeni nesil fidye yazılımları çok daha karmaşık ve çok katmanlı saldırı stratejileri kullanıyor.</p>
    
    <h3>Çift Taraflı Tehdit Stratejisi</h3>
    <p>Modern fidye yazılımı saldırılarının en dikkat çekici özelliklerinden biri "çift taraflı tehdit" yaklaşımıdır. Bu stratejide saldırganlar:</p>
    <ol>
      <li>Verilerinizi şifreler ve erişiminizi engeller</li>
      <li>Aynı zamanda hassas verilerinizi çalar ve ödeme yapmamanız durumunda bu verileri ifşa etmekle tehdit eder</li>
    </ol>
    
    <p>Bu yaklaşım, kurbanları üzerinde daha fazla baskı oluşturur çünkü yedeklerden kurtarma yapılsa bile veri sızıntısı tehdidi devam eder. Araştırmalar, 2023 yılında gerçekleşen fidye yazılımı saldırılarının %85'inden fazlasının bu tür çift taraflı tehdit içerdiğini gösteriyor.</p>
    
    <h3>Tedarik Zinciri Saldırıları</h3>
    <p>Fidye yazılımı operatörleri artık doğrudan hedef almak yerine sıklıkla tedarikçiler ve servis sağlayıcılar gibi daha zayıf bağlantıları hedefliyor. Özellikle Yönetilen Servis Sağlayıcıları (MSP) aracılığıyla gerçekleşen saldırılar, tek bir noktadan onlarca hatta yüzlerce kurumu etkileyebiliyor.</p>
    
    <h3>Sıfır Gün Açıklarının Kullanımı</h3>
    <p>Gelişmiş fidye yazılımı grupları, daha önce keşfedilmemiş ve yaması bulunmayan sıfır gün açıklarını satın alarak veya kendileri keşfederek saldırılarını gerçekleştiriyor. Bu tür açıklar, güvenlik önlemlerini aşmak için güçlü bir yol sağlıyor ve savunmaya hazırlanmak neredeyse imkansız hale geliyor.</p>
    
    <h2>Kapsamlı Fidye Yazılımı Savunma Stratejisi</h2>
    
    <h3>1. Çok Katmanlı Güvenlik Yaklaşımı</h3>
    <p>Tek bir güvenlik çözümüne veya teknolojisine güvenmek yerine, katmanlı bir savunma stratejisi oluşturun:</p>
    <ul>
      <li><strong>Ağ Güvenliği:</strong> Gelişmiş güvenlik duvarları, ağ segmentasyonu, IPS/IDS sistemleri</li>
      <li><strong>Uç Nokta Koruması:</strong> EDR/XDR çözümleri, davranış tabanlı analiz yapan antivirüs yazılımları</li>
      <li><strong>E-posta Güvenliği:</strong> Gelişmiş spam filtreleri, URL koruma, eklenti analizi</li>
      <li><strong>Kullanıcı Eğitimi:</strong> Düzenli farkındalık eğitimleri ve phishing simulasyonları</li>
    </ul>
    
    <h3>2. Etkili Yedekleme Stratejisi</h3>
    <p>3-2-1 yedekleme kuralını uygulayın:</p>
    <ul>
      <li>Verilerinizin en az 3 kopyasını saklayın</li>
      <li>2 farklı depolama ortamında yedekleyin</li>
      <li>En az 1 kopyanızı tamamen çevrimdışı ve fiziksel olarak ayrı bir lokasyonda saklayın</li>
    </ul>
    <p>Yedekleme sistemlerinizi düzenli olarak test edin ve kurtarma sürecini periyodik olarak egzersiz edin. Yedeklerinizin fidye yazılımının erişebileceği ana sistemlerden izole olduğundan emin olun.</p>
    
    <h3>3. Sıkılaştırılmış Erişim Kontrolleri</h3>
    <p>En az ayrıcalık prensibini uygulayın ve kullanıcılara sadece görevlerini yerine getirmeleri için gereken minimum erişim haklarını verin. Tüm kritik sistemler için çok faktörlü kimlik doğrulama (MFA) zorunlu hale getirin ve uzak masaüstü protokolü (RDP) gibi yaygın saldırı vektörlerini özellikle güvenli hale getirin.</p>
    
    <h3>4. Yama Yönetimi ve Güvenlik Açıklarının Giderilmesi</h3>
    <p>Güvenlik açıklarının düzenli taranması ve kritik yamaların hızla uygulanması için bir program oluşturun. Özellikle internet'e açık sistemler, VPN sunucuları ve e-posta sunucuları gibi sık hedef alınan sistemlere öncelik verin.</p>
    
    <h3>5. Olay Müdahale Planı</h3>
    <p>Fidye yazılımı saldırısı gerçekleşmeden önce net bir olay müdahale planı hazırlayın:</p>
    <ul>
      <li>Saldırı tespit edildiğinde hangi sistemlerin izole edileceği</li>
      <li>Hangi yetkililere bildirim yapılacağı (USOM, KVKK, müşteriler, vb.)</li>
      <li>Kurtarma sürecinin adımları ve öncelikleri</li>
      <li>İletişim stratejisi ve medya planı</li>
    </ul>
    <p>Bu planı düzenli olarak simülasyonlarla test edin ve güncel tutun.</p>
    
    <h2>Fidye Ödemek: Son Çare mi?</h2>
    <p>Fidye ödemek genellikle tavsiye edilmez. FBI ve diğer güvenlik kurumları, fidye ödemenin daha fazla saldırıyı teşvik ettiğini ve her zaman verilerinizin kurtarılmasını garanti etmediğini belirtmektedir. Bazı araştırmalar, fidye ödeyen kurumların yaklaşık %30'unun verilerine tam olarak erişim sağlayamadığını göstermektedir.</p>
    
    <p>Ancak kritik verilerin kaybı söz konusu olduğunda ve başka hiçbir seçenek kalmadığında, kurumlar bazen fidye ödemeyi tercih edebilir. Bu durumda bile profesyonel müzakereciler ve siber güvenlik uzmanlarıyla çalışmak önemlidir.</p>
    
    <h2>Sonuç</h2>
    <p>Fidye yazılımı tehdidi günümüzde her zamankinden daha karmaşık ve tehlikeli bir hal almıştır. Kurumlar, teknik önlemlerin ötesinde, güvenlik kültürünü tüm organizasyona yayarak ve proaktif bir yaklaşım benimseyerek kendilerini koruyabilirler. Hatırlamak gerekir ki fidye yazılımı savunması bir hedef değil, sürekli evrilmesi gereken bir süreçtir.</p>
  `,
  date: '15 Nisan 2024',
  readTime: '12 dk okuma',
  author: 'Fevziye Nur Kesebir',
  category: 'Siber Tehditler',
  relatedPosts: [
    'tehdit-avi-threat-hunting-proaktif-siber-guvenlik-yaklasimi',
    'zero-trust-guvenlik-modeli-sirketler-icin-uygulama-rehberi'
  ]
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  // Öne çıkan yazı için özel kontrol
  if (slug === 'featured') {
    return {
      title: `${featuredPostData.title} - CYBERLY`,
      description: featuredPostData.excerpt
    }
  }
  
  // Diğer yazılar için veritabanından bulma
  const post = blogPostsData.find(post => post.slug === slug);
  
  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı - CYBERLY',
      description: 'İstediğiniz blog yazısı bulunamadı'
    }
  }
  
  return {
    title: `${post.title} - CYBERLY`,
    description: post.excerpt
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  // İlgili blog yazısını bul
  let post;
  
  if (slug === 'featured') {
    post = featuredPostData;
  } else {
    post = blogPostsData.find(post => post.slug === slug);
  }
  
  // Eğer blog yazısı bulunamazsa 404 sayfasına yönlendir
  if (!post) {
    notFound();
  }
  
  // İlgili blog yazılarını bul
  const relatedPosts = post.relatedPosts 
    ? post.relatedPosts.map(relatedSlug => 
        blogPostsData.find(p => p.slug === relatedSlug) || featuredPostData
      ).filter(Boolean)
    : [];
  
  return (
    <>
      <Navbar />
      
      <main className="bg-gray-900 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-cyan-400 truncate max-w-xs">
                {post.title}
              </li>
            </ol>
          </nav>
          
          {/* Blog başlık ve meta bilgileri */}
          <div className="mb-10">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-900 text-cyan-300">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center border-t border-b border-gray-700 py-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200 font-bold text-xl">
                {post.author.charAt(0)}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">
                  {post.author}
                </p>
                <div className="flex space-x-1 text-sm text-gray-400">
                  <time dateTime="2020-03-16">{post.date}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog içeriği */}
          <div className="prose prose-invert prose-cyan max-w-none mb-16 blog-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* İlgili yazılar */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-gray-700 pt-12">
              <h2 className="text-2xl font-bold text-white mb-8">İlgili Yazılar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <Link 
                    href={`/blog/${relatedPost.slug}`} 
                    key={index}
                    className="block transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="rounded-xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-cyan-700 transition-colors">
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900 text-cyan-300">
                            {relatedPost.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{relatedPost.title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Geri dönüş butonu */}
          <div className="mt-10 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-700 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Tüm Yazılara Dön
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 