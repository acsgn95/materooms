import Link from "next/link";
import { ArrowRight, Lock, Zap, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-main py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">RoomMate</div>
          <div className="flex gap-4">
            <Link href="/auth/login" className="hover:text-primary transition">
              Giriş Yap
            </Link>
            <Link href="/auth/register" className="btn-primary">
              Kaydol
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container-main">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-dark mb-6">
              Güvenilir Arkadaş Bul, Huzur İçinde Yaşa
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              RoomMate, Turkey'nin ilk doğrulanmış ortak yaşam platformu. Kimlik doğrulaması, güvenli ödemeler ve objektif puanlama sistemiyle flatmate bulma artık daha güvenli.
            </p>
            <div className="flex gap-4">
              <Link href="/auth/register" className="btn-primary flex items-center gap-2">
                Hemen Başla <ArrowRight size={20} />
              </Link>
              <Link href="#features" className="btn-outline">
                Daha Fazla Bilgi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container-main">
          <h2 className="text-4xl font-bold text-center mb-16">Neden RoomMate?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Doğrulanmış Kimlik</h3>
              <p className="text-gray-600">
                Çok katmanlı KYC doğrulaması: telefon, TC kimlik, yüz eşleştirmesi ve suç kaydı kontrolü
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-secondary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Güvenli Ödemeler</h3>
              <p className="text-gray-600">
                İyzico ile işletilen kiralık ödemeler. Otomatik komisyon kesintisi ve anında aktarım
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-success" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Flatmate Puanı</h3>
              <p className="text-gray-600">
                Ödeme davranışından türetilen taşınamaz puanlama sistemi. Geleceğinizi taşıyın
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-dark text-white py-16">
        <div className="container-main">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">340%</div>
              <p>Kira artışı (3 yıl)</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">3</div>
              <p>Büyük Şehir</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">1000+</div>
              <p>İlk Kullanıcı</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-warning mb-2">0%</div>
              <p>Gizlilik Endişesi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-16">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold mb-6">Arkadaşını Bul, Hayatını Başlat</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Güvenilir, doğrulanmış ve şeffaf bir platform ile kira bulma süreci artık daha kolay
          </p>
          <Link href="/auth/register" className="btn-primary inline-flex items-center gap-2">
            Ücretsiz Kaydol <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-gray-400 py-12">
        <div className="container-main">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">RoomMate</h4>
              <p className="text-sm">Türkiye'nin doğrulanmış flatmate platformu</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ürün</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Nasıl Çalışır</a></li>
                <li><a href="#" className="hover:text-white">Fiyatlandırma</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Yasal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Gizlilik</a></li>
                <li><a href="#" className="hover:text-white">Kullanıcı Sözleşmesi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">İletişim</h4>
              <ul className="text-sm space-y-2">
                <li><a href="mailto:hello@roommate.com" className="hover:text-white">hello@roommate.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 RoomMate. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
