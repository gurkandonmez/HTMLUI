# TABAN Premium Corporate UI Prototype (Option B)

Bu proje, **taban.com.tr bilgi mimarisini koruyarak** daha premium, modern ve kurumsal bir arayüz prototipi üretmek amacıyla hazırlanmış saf **HTML/CSS/JS** çalışmasıdır.

## Çalıştırma

1. Proje klasörüne girin:
   ```bash
   cd /workspace/HTMLUI
   ```
2. Basit bir local server başlatın:
   ```bash
   python3 -m http.server 4173
   ```
3. Tarayıcıda açın:
   ```
   http://localhost:4173
   ```

## Sayfalar

- `index.html` → Home
- `pages/corporate-template.html` → Corporate şablon (Hakkımızda/Sürdürülebilirlik/Logo Story)
- `pages/products.html` → Products
- `pages/product-detail.html` → Product detail
- `pages/hr.html` → İK politika + başvuru
- `pages/news.html` → Haber listesi
- `pages/news-detail.html` → Haber detay
- `pages/contact.html` → İletişim form + harita + iletişim kartları

## Tasarım Kararları

- **Renk Paleti (Seçenek B):**
  - Koyu Lacivert: `#061834`
  - Kırık Beyaz: `#F8F6F1`
  - Vurgu (Zeytin Yeşili): `#5F7C48`
- **Tipografi:** Plus Jakarta Sans
- **Spacing System:** 8pt tabanlı (`8,16,24,32...`)
- **UI Karakteri:** geniş boşluk, güçlü tipografi, yumuşak gölge, yuvarlak kart köşeleri, micro-interaction hover geçişleri
- **Erişilebilirlik/SEO:** semantik section yapısı, heading hiyerarşisi, meta description + OG etiket örnekleri, yeterli kontrast

## Ek Not

Ana sayfada 2 farklı hero görünümü için A/B geçiş butonu vardır:
- Varsayılan: Hero A
- Buton ile: Hero B
