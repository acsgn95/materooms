'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { ArrowLeft, Upload } from 'lucide-react';

export default function CreateListingPage() {
  const [step, setStep] = useState<'type' | 'details' | 'amenities' | 'photos'>('type');
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    city: '',
    district: '',
    neighborhood: '',
    monthlyRent: '',
    perPersonRent: '',
    moveInDate: '',
    currentResidents: '',
    totalResidents: '',
    smoking: false,
    pets: false,
    genderPreference: 'mixed',
    amenities: [] as string[],
  });

  const amenitiesList = [
    { id: 'furnished', label: 'Mobilyalı' },
    { id: 'internet', label: 'İnternet' },
    { id: 'washing_machine', label: 'Çamaşır Makinesi' },
    { id: 'balcony', label: 'Balkon' },
    { id: 'ac', label: 'Klima' },
    { id: 'heating', label: 'Isıtma' },
    { id: 'kitchen', label: 'Mutfak' },
    { id: 'parking', label: 'Otopark' },
  ];

  const cities = ['İstanbul', 'Ankara', 'İzmir'];
  const steps = ['type', 'details', 'amenities', 'photos'];

  const toggleAmenity = (id: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(id)
        ? formData.amenities.filter((a) => a !== id)
        : [...formData.amenities, id],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'type') setStep('details');
    else if (step === 'details') setStep('amenities');
    else if (step === 'amenities') setStep('photos');
    else window.location.href = '/dashboard';
  };

  const stepIdx = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Geri Dön
        </Link>

        <div className="max-w-2xl">
          <h1 className="text-4xl font-serif font-light text-white mb-8">Yeni İlan Oluştur</h1>

          {/* Progress */}
          <div className="flex gap-1.5 mb-12">
            {steps.map((_, i) => (
              <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors ${i <= stepIdx ? 'bg-secondary' : 'bg-white/10'}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Listing Type */}
            {step === 'type' && (
              <div className="card space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-6">İlan Türü Seç</h2>
                {[
                  { id: 'room_available', title: 'Oda Var', description: 'Mevcut ev/dairede arkadaş arıyorum' },
                  { id: 'looking_for_room', title: 'Oda Arıyorum', description: 'Var olan bir eve katılmak istiyorum' },
                  { id: 'looking_together', title: 'Birlikte Arat', description: 'Yeni ev için arkadaş bulup beraber kirala' },
                ].map((type) => (
                  <label key={type.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition ${
                      formData.type === type.id ? 'border-secondary bg-secondary/5' : 'border-white/10 hover:border-white/30'
                    }`}>
                    <input type="radio" name="type" value={type.id}
                      checked={formData.type === type.id}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="mt-1 accent-secondary" />
                    <div>
                      <p className="font-semibold text-white">{type.title}</p>
                      <p className="text-sm text-white/40">{type.description}</p>
                    </div>
                  </label>
                ))}

                <button type="submit" disabled={!formData.type} className="btn-primary w-full disabled:opacity-50 mt-8">
                  Devam Et
                </button>
              </div>
            )}

            {/* Step 2: Listing Details */}
            {step === 'details' && (
              <div className="card space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-6">İlan Detayları</h2>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">İlan Başlığı</label>
                  <input type="text" placeholder="Beşiktaş'ta 2+1 ev - Arkadaş Aranıyor"
                    value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field" required />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">İlan Açıklaması</label>
                  <textarea placeholder="Evinin ve arattığın arkadaş profilinin detaylarını yaz..."
                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field resize-none h-24" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Şehir</label>
                    <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="input-field" required>
                      <option value="">Seç</option>
                      {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">İlçe</label>
                    <input type="text" placeholder="Beşiktaş" value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="input-field" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Mahalle</label>
                  <input type="text" placeholder="Ortaköy" value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="input-field" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Aylık Kira</label>
                    <input type="number" placeholder="15000" value={formData.monthlyRent}
                      onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                      className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Kişi Başı Kira</label>
                    <input type="number" placeholder="7500" value={formData.perPersonRent}
                      onChange={(e) => setFormData({ ...formData, perPersonRent: e.target.value })}
                      className="input-field" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Giriş Tarihi</label>
                  <input type="date" value={formData.moveInDate}
                    onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                    className="input-field" required />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Yaşayan Kişi Sayısı</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/30">Şu Anda</label>
                      <input type="number" min="0" value={formData.currentResidents}
                        onChange={(e) => setFormData({ ...formData, currentResidents: e.target.value })}
                        className="input-field mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-white/30">Toplam Olacak</label>
                      <input type="number" min="1" value={formData.totalResidents}
                        onChange={(e) => setFormData({ ...formData, totalResidents: e.target.value })}
                        className="input-field mt-1" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="flex items-center gap-3 cursor-pointer text-white/60 text-sm">
                    <input type="checkbox" checked={formData.smoking}
                      onChange={(e) => setFormData({ ...formData, smoking: e.target.checked })}
                      className="accent-secondary" />
                    Sigara İçme Yasak
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-white/60 text-sm">
                    <input type="checkbox" checked={formData.pets}
                      onChange={(e) => setFormData({ ...formData, pets: e.target.checked })}
                      className="accent-secondary" />
                    Evcil Hayvan Yasak
                  </label>
                </div>

                <div className="flex gap-4 pt-8">
                  <button type="button" onClick={() => setStep('type')} className="btn-outline flex-1">Geri Dön</button>
                  <button type="submit" className="btn-primary flex-1">Devam Et</button>
                </div>
              </div>
            )}

            {/* Step 3: Amenities */}
            {step === 'amenities' && (
              <div className="card space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-6">Evinizin Özellikleri</h2>

                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map((amenity) => (
                    <label key={amenity.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                        formData.amenities.includes(amenity.id) ? 'border-secondary bg-secondary/5' : 'border-white/10 hover:border-white/30'
                      }`}>
                      <input type="checkbox" checked={formData.amenities.includes(amenity.id)}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="accent-secondary" />
                      <span className="font-medium text-white/70">{amenity.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-4 pt-8">
                  <button type="button" onClick={() => setStep('details')} className="btn-outline flex-1">Geri Dön</button>
                  <button type="submit" className="btn-primary flex-1">Fotoğrafları Yükle</button>
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {step === 'photos' && (
              <div className="card space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-6">Fotoğraf Yükle</h2>

                <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-secondary/50 hover:bg-secondary/5 transition">
                  <Upload className="mx-auto mb-4 text-white/30" size={48} />
                  <p className="font-semibold text-white mb-1">Fotoğrafları Sürükle ve Bırak</p>
                  <p className="text-sm text-white/40">Veya bilgisayarından seç (En fazla 10 fotoğraf)</p>
                </div>

                <div className="flex gap-4 pt-8">
                  <button type="button" onClick={() => setStep('amenities')} className="btn-outline flex-1">Geri Dön</button>
                  <button type="submit" className="btn-primary flex-1">İlan Oluştur</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
