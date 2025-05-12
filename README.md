# E-Commers

## 1. Proje Adı ve Açıklaması
**E-Commers**, kullanıcıların ürünleri görüntüleyip sepetlerine ekleyebilecekleri, modern web teknolojileriyle geliştirilmiş bir e-ticaret uygulamasıdır. Proje, kullanıcı dostu bir arayüz ve basit bir alışveriş deneyimi sunmayı hedefler.

## 2. İçindekiler
- [Kurulum](#3-kurulum)
- [Kullanım](#4-kullanım)
- [Özellikler](#5-özellikler)
- [Katkıda Bulunma](#6-katkıda-bulunma)

## 3. Kurulum
Projeyi çalıştırmak için aşağıdaki adımları izleyin:

```bash
git clone https://github.com/MuhammedZeki/E-Commers.git
cd E-Commers
npm install
npm start
```

Not: Projede kullanılan veritabanı veya API bağlantısı varsa `.env` dosyasını yapılandırmanız gerekebilir.

## 4. Kullanım
Uygulamayı çalıştırdıktan sonra tarayıcınızda `http://localhost:5173` adresine giderek e-ticaret sistemini test edebilirsiniz. Kullanıcılar ürünleri görüntüleyebilir ve sepetlerine ekleyebilirler.

**Admin Paneline Giriş:**  
Yönetici paneline erişmek için tarayıcınıza `/admin` yolunu yazmanız yeterlidir:  
```text
http://localhost:3000/admin
```
Bu panel üzerinden ürün ekleme, düzenleme ve sipariş yönetimi gibi işlemleri gerçekleştirebilirsiniz.

## 5. Özellikler
- Ürün listeleme
- Sepete ürün ekleme
- Admin paneli ile ürün/sipariş yönetimi
- Temiz ve modern arayüz

## 6. Katkıda Bulunma
Katkıda bulunmak isterseniz:
1. Bu repoyu fork'layın
2. Yeni bir branch oluşturun (`git checkout -b feature/yenilik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'i push edin (`git push origin feature/yenilik`)
5. Bir pull request oluşturun
