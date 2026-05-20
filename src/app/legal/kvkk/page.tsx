import Link from 'next/link';

export const metadata = {
  title: 'KVKK Aydınlatma Metni — MateRooms',
};

export default function KvkkPage() {
  return (
    <div className="min-h-dvh bg-black text-white/80">
      <div className="h-0.5 bg-secondary" />

      <header className="container-main py-6">
        <Link href="/" className="text-white font-bold tracking-[0.24em] text-lg uppercase hover:text-secondary transition">
          MateRooms
        </Link>
      </header>

      <main className="container-main pb-16 max-w-3xl">
        <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          <strong>Demo/Test Ortamı:</strong> MateRooms şu an demo aşamasındadır. Bu sürümü ticari veya gerçek kullanım için kullanmayınız. Gerçek kimlik, finansal bilgi veya hassas veri girmeyiniz.
        </div>

        <h1 className="text-3xl font-serif font-light text-white mb-6">KVKK Aydınlatma Metni</h1>

        <p className="text-sm text-white/40 mb-8">Son güncelleme: 20.05.2026</p>

        <section className="space-y-6 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca veri sorumlusu sıfatıyla,
              kişisel verilerinizi aşağıdaki kapsamda işliyoruz. İletişim için:{' '}
              <a href="mailto:hello@materooms.com" className="text-secondary hover:underline">
                hello@materooms.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. İşlenen Kişisel Veriler</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kimlik bilgileri: ad-soyad, yaş, cinsiyet</li>
              <li>İletişim bilgileri: cep telefonu numarası</li>
              <li>Konum bilgileri: şehir, semt/mahalle</li>
              <li>Profil bilgileri: meslek, bütçe aralığı, yaşam tarzı tercihleri (sigara, evcil hayvan, uyku düzeni vb.)</li>
              <li>Doğrulama bilgileri: telefon OTP, varsa kimlik/yüz doğrulama kayıtları</li>
              <li>Kullanım verileri: ilan, mesaj, oturum kayıtları</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Verilerin İşlenme Amaçları</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Üyelik oluşturma ve kimlik doğrulama (telefon OTP)</li>
              <li>Ev/oda arayan kullanıcıları uygun ilanlarla eşleştirme</li>
              <li>Kullanıcılar arası güvenli mesajlaşmanın sağlanması</li>
              <li>Sahte hesapların engellenmesi, dolandırıcılık önleme</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. İşlemenin Hukuki Sebebi</h2>
            <p>
              Verileriniz, KVKK m. 5/2 uyarınca sözleşmenin kurulması veya ifası, hukuki yükümlülük ve meşru
              menfaat hukuki sebeplerine ve gereken hallerde KVKK m. 5/1 uyarınca <strong>açık rızanıza</strong>{' '}
              dayanılarak işlenir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Verilerin Aktarımı</h2>
            <p>
              Kişisel verileriniz yalnızca platformun çalışması için gerekli altyapı sağlayıcılarıyla
              (barındırma ve veritabanı: Render.com Inc. — ABD; önbellek: Upstash — AB) paylaşılır. Yurt dışı
              aktarımları KVKK m. 9 kapsamında uygun güvenceler ile gerçekleştirilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Saklama Süresi</h2>
            <p>
              Veriler, üyeliğiniz sürdüğü müddetçe ve üyelik sona erdikten sonra ilgili mevzuatta öngörülen
              azami süre kadar saklanır. Bu sürenin sonunda veriler silinir, yok edilir veya anonim hâle
              getirilir.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">7. Haklarınız (KVKK m. 11)</h2>
            <p>Veri sahibi olarak;</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>İşlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse bilgi talep etme</li>
              <li>Amaca uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içi/dışı aktarılan üçüncü kişileri bilme</li>
              <li>Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
              <li>Aktarılan kişilere bildirilmesini isteme</li>
              <li>Otomatik analiz sonucu aleyhinize çıkan sonuca itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramışsanız tazminat talep etme</li>
            </ul>
            <p className="mt-2">
              Bu haklarınızı kullanmak için yukarıdaki e-posta adresine başvurabilirsiniz.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">8. Açık Rıza</h2>
            <p>
              Kayıt sırasında işaretlediğiniz onay kutusu, bu metinde belirtilen kişisel verilerinizin platform
              hizmetinin sağlanması amacıyla işlenmesine açık rızanız anlamına gelir. Rızanızı dilediğiniz zaman
              geri alabilirsiniz.
            </p>
          </div>
        </section>

        <div className="mt-12 pt-6 border-t border-white/10">
          <Link href="/auth/register" className="text-secondary hover:underline text-sm">
            ← Kayıt sayfasına dön
          </Link>
        </div>
      </main>
    </div>
  );
}
