# CYBERLY - Siber Güvenlik Farkındalık Platformu
Ürün Gereksinim Dokümanı (PRD)

## 1. Genel Bakış

CYBERLY, kullanıcıların siber güvenlik konusunda farkındalığını artırmayı amaçlayan kapsamlı bir web platformudur. Bu platform, bireysel kullanıcılar ve kurumlar için siber güvenlik eğitimleri, güncel tehdit bilgileri ve interaktif öğrenme deneyimleri sunmaktadır.

## 2. Hedef Kitle

- Bireysel kullanıcılar (siber güvenlik konusunda bilgi edinmek isteyenler)
- Kurumsal kullanıcılar (çalışanlarına siber güvenlik eğitimi vermek isteyen şirketler)
- BT profesyonelleri ve güvenlik uzmanları
- Eğitim kurumları ve öğrenciler

## 3. Temel Özellikler

### 3.1 Kullanıcı Yönetimi ve Profil

- [x] Kullanıcı kaydı ve giriş sistemi
- [x] Rol tabanlı erişim kontrolü (admin, eğitmen, kullanıcı)
- [x] Profil yönetimi ve kişiselleştirme
- [x] Kullanıcı ilerleme takibi ve başarı rozetleri
  - Kullanıcı seviye sistemi ve deneyim puanları
  - Çeşitli kategorilerde kazanılabilir rozetler (kurs tamamlama, düzenli giriş, güvenlik farkındalığı vb.)
  - Haftalık ve aylık öğrenme hedefleri
  - Sosyal karşılaştırma ve liderlik tabloları
  - Özel meydan okumalar ve zaman sınırlı etkinlikler
- [x] Çok faktörlü kimlik doğrulama (2FA) desteği

### 3.2 Siber Güvenlik Eğitimleri

- [x] Temel, orta ve ileri seviye eğitim modülleri
- [x] Video tabanlı eğitim içerikleri
- [ ] İnteraktif kurslar ve sınavlar
- [ ] Sertifika programları
- [ ] Eğitim tamamlama ilerleme çubuğu
- [ ] Eğitim içeriklerinin düzenli güncellenmesi

### 3.3 Siber Tehdit Bilgi Merkezi

- [ ] Güncel siber tehdit haberleri ve uyarıları
- [ ] Tehdit türlerine göre kategorize edilmiş bilgi bankası
- [ ] Tehdit seviyesi göstergeleri ve risk değerlendirmeleri
- [ ] Coğrafi tehdit haritası ve istatistikler
- [ ] Tehdit istihbarat raporları ve analizleri

### 3.4 İnteraktif Simülasyonlar ve Alıştırmalar

- [x] Phishing simülasyonları (sahte e-posta tanıma alıştırmaları)
  - Örnek Senaryo: Kullanıcıya gerçek ve sahte e-postalar gösterilerek hangilerinin phishing olduğunu tespit etmesi istenir
- [x] Sosyal mühendislik senaryoları
  - Örnek Senaryo: Kullanıcıya bir telefon görüşmesi simülasyonu sunularak, karşı tarafın sosyal mühendislik tekniklerini nasıl kullandığını tespit etmesi istenir
- [x] Güvenli şifre oluşturma ve yönetme alıştırmaları
  - Örnek Senaryo: Kullanıcının oluşturduğu şifrelerin güvenlik seviyesini ölçen ve iyileştirme önerileri sunan interaktif bir araç
- [x] Zararlı yazılım tespit etme alıştırmaları
  - Örnek Senaryo: Kullanıcıya şüpheli dosya ve uygulamalar gösterilerek, hangilerinin zararlı olabileceğini tespit etmesi istenir
- [x] Veri sızıntısı önleme senaryoları
  - Örnek Senaryo: Kullanıcıya bir ofis ortamı simülasyonu sunularak, potansiyel veri sızıntısı risklerini tespit etmesi istenir

### 3.5 Kişisel Güvenlik Değerlendirme Araçları

- [ ] Güvenlik durum değerlendirme anketi
- [ ] Şifre güvenliği kontrol aracı
- [ ] Veri ihlali kontrol hizmeti (e-posta adresinin veri ihlallerinde yer alıp almadığını kontrol)
- [ ] Cihaz güvenlik tarama tavsiyeleri
- [ ] Kişisel güvenlik planı oluşturma sihirbazı

### 3.6 Kurumsal Özellikler

- [ ] Kurum içi siber güvenlik eğitim kampanyaları oluşturma
- [ ] Çalışan performans ve ilerleme takibi
- [ ] Özelleştirilebilir phishing simülasyon kampanyaları
- [ ] Departmana özel eğitim içerikleri
- [ ] Kurum genelinde güvenlik durum raporu
- [ ] Uyumluluk ve düzenlemelere uygunluk raporları

### 3.7 Topluluk ve İşbirliği

- [ ] Kullanıcı forumları ve tartışma alanları
- [ ] Soru-cevap bölümü
- [ ] Uzman webinarları ve canlı etkinlikler
- [ ] Güvenlik uzmanlarıyla bağlantı kurma imkanı
- [ ] Topluluk katkılı güvenlik ipuçları ve kaynaklar

### 3.8 Tehdit İzleme ve Uyarı Sistemi

- [ ] Kişiselleştirilmiş tehdit izleme paneli
- [ ] E-posta ve SMS ile güvenlik uyarıları
- [ ] Sektöre özel tehdit istihbaratı
- [ ] Zafiyet takip sistemi
- [ ] Otomatik güvenlik tavsiyeleri

## 4. Teknik Gereksinimler

### 4.1 Platform ve Uyumluluk

- [ ] Responsive tasarım (mobil, tablet ve masaüstü uyumlu)
- [ ] Tüm modern tarayıcılarla uyumluluk
- [ ] PWA (Progressive Web App) desteği
- [ ] Düşük bant genişliği modları

### 4.2 Güvenlik Gereksinimleri

- [ ] End-to-end şifreleme
- [ ] HTTPS zorunluluğu
- [ ] Güvenli oturum yönetimi
- [ ] Rate limiting ve brute force koruması
- [ ] Düzenli güvenlik denetimleri ve penetrasyon testleri
- [ ] GDPR ve veri koruma uyumluluğu

### 4.3 Performans Gereksinimleri

- [ ] Sayfa yüklenme süresi < 3 saniye
- [ ] Yüksek kullanıcı yükü altında stabil performans
- [ ] CDN entegrasyonu
- [ ] Verimli önbellek stratejisi

## 5. Kullanıcı Deneyimi

### 5.1 Arayüz Tasarımı

- [ ] Sezgisel ve kullanıcı dostu arayüz
- [ ] Koyu ve açık tema seçenekleri
- [ ] Erişilebilirlik standartlarına uygunluk (WCAG 2.1)
- [ ] Kişiselleştirilebilir gösterge paneli

### 5.2 İçerik Stratejisi

- [ ] Kullanıcı seviyesine göre uyarlanmış içerik
- [ ] Mikro-öğrenme modülleri (5-10 dakikalık kısa eğitimler)
- [ ] Görsel ve interaktif öğrenme materyalleri
- [ ] Çoklu dil desteği

## 6. Analitik ve Raporlama

- [ ] Kullanıcı ilerleme ve performans raporları
- [ ] Eğitim etkinliği ölçümleri
- [ ] Güvenlik durum skorları ve trendleri
- [ ] Kurumsal kullanım ve ROI raporları
- [ ] Özelleştirilebilir raporlama panelleri

## 7. Entegrasyonlar

- [ ] SSO (Single Sign-On) entegrasyonu
- [ ] LMS (Learning Management System) entegrasyonları
- [ ] SIEM ve güvenlik araçları entegrasyonu
- [ ] HR ve çalışan yönetim sistemleri entegrasyonu
- [ ] API ve webhook desteği

## 8. Gelecek Özellikler ve Yol Haritası

### Faz 1 (İlk Sürüm)
- Temel kullanıcı yönetimi ve profil özellikleri
- Başlangıç seviyesi eğitim içerikleri
- Siber tehdit bilgi merkezi
- Basit güvenlik değerlendirme araçları

### Faz 2 (3 Ay Sonra)
- İnteraktif simülasyonlar ve alıştırmalar
- Gelişmiş eğitim içerikleri ve sertifikalar
- Topluluk özellikleri
- Mobil uygulama

### Faz 3 (6 Ay Sonra)
- Kurumsal özellikler ve kampanya yönetimi
- Gelişmiş analitik ve raporlama
- Tehdit izleme ve uyarı sistemi
- API ve entegrasyon ekosistemi

## 9. Örnek Kullanım Senaryoları

### Senaryo 1: Bireysel Kullanıcı
Mehmet, siber güvenlik konusunda bilgisini artırmak isteyen bir banka çalışanıdır. CYBERLY'ye kaydolur, seviyesini belirlemek için bir değerlendirme testi yapar ve kendisine önerilen eğitim yolunu takip eder. Phishing simülasyonlarını tamamlar, şifre güvenliğini iyileştirir ve düzenli olarak güvenlik ipuçlarını takip eder.

### Senaryo 2: Kurumsal Kullanıcı
ABC Şirketi, çalışanlarının siber güvenlik farkındalığını artırmak için CYBERLY'nin kurumsal planına abone olur. İK departmanı, departmanlara özel eğitim programları oluşturur, düzenli phishing simülasyonları düzenler ve çalışanların ilerlemesini takip eder. Aylık güvenlik durum raporları yönetim kuruluna sunulur.

### Senaryo 3: Eğitim Kurumu
XYZ Üniversitesi, bilgisayar bilimleri öğrencilerine pratik siber güvenlik eğitimi vermek için CYBERLY'yi kullanır. Öğretmenler özel sınıflar oluşturur, öğrencilere görevler atar ve performanslarını değerlendirir. Öğrenciler, gerçek dünya senaryolarıyla pratik yaparak teorik bilgilerini pekiştirir.

## 10. Başarı Kriterleri

- Kullanıcı kayıt ve aktif kullanım oranları
- Eğitim tamamlama oranları
- Kullanıcı memnuniyet skorları
- Phishing simülasyonu başarı oranlarındaki iyileşme
- Kurumsal müşterilerde ölçülebilir güvenlik olaylarında azalma
- Platform kullanımı sonrası güvenlik davranışlarında ölçülebilir değişim