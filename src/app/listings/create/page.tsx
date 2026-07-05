'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { ArrowLeft, Upload } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { createListing } from '@/lib/listings';
import { ApiCallError } from '@/lib/api';
import type { ListingType } from '@/types/api';
import { CITY_NAMES, getCityCoords } from '@/lib/cities';

const LocationPicker = dynamic(() => import('@/components/LocationPicker'), { ssr: false });

export default function CreateListingPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [step, setStep] = useState<'type' | 'details' | 'amenities' | 'photos'>('type');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    latitude: null as number | null,
    longitude: null as number | null,
  });

  const amenitiesList = [
    'furnished',
    'internet',
    'washing_machine',
    'balcony',
    'ac',
    'heating',
    'kitchen',
    'parking',
  ];

  const steps = ['type', 'details', 'amenities', 'photos'];

  const toggleAmenity = (id: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(id)
        ? formData.amenities.filter((a) => a !== id)
        : [...formData.amenities, id],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'type') { setStep('details'); return; }
    if (step === 'details') { setStep('amenities'); return; }
    if (step === 'amenities') { setStep('photos'); return; }

    setError(null);
    setSubmitting(true);
    try {
      const created = await createListing({
        listing_type: formData.type as ListingType,
        title: formData.title,
        description: formData.description || undefined,
        city: formData.city,
        district: formData.district,
        neighborhood: formData.neighborhood || undefined,
        rent_full: Number(formData.monthlyRent),
        rent_per_person: formData.perPersonRent ? Number(formData.perPersonRent) : undefined,
        move_in_date: formData.moveInDate,
        residents_current: formData.currentResidents ? Number(formData.currentResidents) : 0,
        residents_total: Number(formData.totalResidents),
        house_rules: {
          smoking: formData.smoking,
          pets: formData.pets,
          gender_preference: formData.genderPreference,
        },
        amenities: formData.amenities,
        latitude: formData.latitude ?? undefined,
        longitude: formData.longitude ?? undefined,
      });
      router.push(`/listings/${created.id}`);
    } catch (err) {
      const e = err as ApiCallError;
      setError(e.message || 'İlan oluşturulamadı.');
      setSubmitting(false);
    }
  };

  const stepIdx = steps.indexOf(step);

  return (
    <div className="min-h-dvh bg-black">
      <DashboardHeader />

      <main className="container-main py-6 sm:py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          {t('common.actions.back')}
        </Link>

        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-white mb-6 sm:mb-8">{t('createListing.title')}</h1>

          {/* Progress */}
          <div className="flex gap-1.5 mb-8 sm:mb-12">
            {steps.map((_, i) => (
              <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors ${i <= stepIdx ? 'bg-secondary' : 'bg-white/10'}`} />
            ))}
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Listing Type */}
            {step === 'type' && (
              <div className="card space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">{t('createListing.steps.typeTitle')}</h2>
                {[
                  'room_available',
                  'looking_for_room',
                  'looking_together',
                ].map((type) => (
                  <label key={type}
                    className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition ${
                      formData.type === type ? 'border-secondary bg-secondary/5' : 'border-white/10 hover:border-white/30'
                    }`}>
                    <input type="radio" name="type" value={type}
                      checked={formData.type === type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="mt-1 accent-secondary" />
                    <div>
                      <p className="font-semibold text-white">{t(`common.listingTypes.${type}`)}</p>
                      <p className="text-sm text-white/40">{t(`createListing.types.${type}.description`)}</p>
                    </div>
                  </label>
                ))}

                <button type="submit" disabled={!formData.type} className="btn-primary w-full disabled:opacity-50 mt-8">
                  {t('common.actions.continue')}
                </button>
              </div>
            )}

            {/* Step 2: Listing Details */}
            {step === 'details' && (
              <div className="card space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">{t('createListing.steps.detailsTitle')}</h2>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.title')}</label>
                  <input type="text" placeholder={t('createListing.placeholders.title')}
                    value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field" required />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.description')}</label>
                  <textarea placeholder={t('createListing.placeholders.description')}
                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field resize-none h-24" required />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.city')}</label>
                    <select
                      value={formData.city}
                      onChange={(e) => {
                        const city = e.target.value;
                        const coords = getCityCoords(city);
                        setFormData({
                          ...formData,
                          city,
                          latitude: coords?.lat ?? formData.latitude,
                          longitude: coords?.lng ?? formData.longitude,
                        });
                      }}
                      className="input-field" required>
                      <option value="">{t('createListing.placeholders.select')}</option>
                      {CITY_NAMES.map((city) => <option key={city} value={city.toLowerCase()}>{city}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.district')}</label>
                    <input type="text" placeholder={t('createListing.placeholders.district')} value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="input-field" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.neighborhood')}</label>
                  <input type="text" placeholder={t('createListing.placeholders.neighborhood')} value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="input-field" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Konum (Haritadan İşaretle)</label>
                  <LocationPicker
                    lat={formData.latitude}
                    lng={formData.longitude}
                    centerLat={formData.city ? getCityCoords(formData.city)?.lat : undefined}
                    centerLng={formData.city ? getCityCoords(formData.city)?.lng : undefined}
                    onChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.monthlyRent')}</label>
                    <input type="number" placeholder="15000" value={formData.monthlyRent}
                      onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                      className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.perPersonRent')}</label>
                    <input type="number" placeholder="7500" value={formData.perPersonRent}
                      onChange={(e) => setFormData({ ...formData, perPersonRent: e.target.value })}
                      className="input-field" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.moveInDate')}</label>
                  <input type="date" value={formData.moveInDate}
                    onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                    className="input-field" required />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">{t('createListing.fields.residents')}</label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-white/30">{t('createListing.fields.currentResidents')}</label>
                      <input type="number" min="0" value={formData.currentResidents}
                        onChange={(e) => setFormData({ ...formData, currentResidents: e.target.value })}
                        className="input-field mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-white/30">{t('createListing.fields.totalResidents')}</label>
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
                    {t('createListing.fields.smoking')}
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-white/60 text-sm">
                    <input type="checkbox" checked={formData.pets}
                      onChange={(e) => setFormData({ ...formData, pets: e.target.checked })}
                      className="accent-secondary" />
                    {t('createListing.fields.pets')}
                  </label>
                </div>

                <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:gap-4">
                  <button type="button" onClick={() => setStep('type')} className="btn-outline flex-1">{t('common.actions.back')}</button>
                  <button type="submit" className="btn-primary flex-1">{t('common.actions.continue')}</button>
                </div>
              </div>
            )}

            {/* Step 3: Amenities */}
            {step === 'amenities' && (
              <div className="card space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">{t('createListing.steps.amenitiesTitle')}</h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {amenitiesList.map((amenity) => (
                    <label key={amenity}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                        formData.amenities.includes(amenity) ? 'border-secondary bg-secondary/5' : 'border-white/10 hover:border-white/30'
                      }`}>
                      <input type="checkbox" checked={formData.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="accent-secondary" />
                      <span className="font-medium text-white/70">{t(`common.amenities.${amenity}`)}</span>
                    </label>
                  ))}
                </div>

                <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:gap-4">
                  <button type="button" onClick={() => setStep('details')} className="btn-outline flex-1">{t('common.actions.back')}</button>
                  <button type="submit" className="btn-primary flex-1">{t('createListing.actions.uploadPhotos')}</button>
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {step === 'photos' && (
              <div className="card space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">{t('createListing.steps.photosTitle')}</h2>

                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 sm:p-12 text-center">
                  <Upload className="mx-auto mb-4 text-white/30" size={40} />
                  <p className="font-semibold text-white mb-1">Foto yükleme yakında</p>
                  <p className="text-sm text-white/40">MVP&apos;de fotoğraf yükleme henüz aktif değil — ilanınız fotoğrafsız oluşturulacak.</p>
                </div>

                <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:gap-4">
                  <button type="button" onClick={() => setStep('amenities')} className="btn-outline flex-1" disabled={submitting}>{t('common.actions.back')}</button>
                  <button type="submit" className="btn-primary flex-1 disabled:opacity-50" disabled={submitting}>
                    {submitting ? 'Oluşturuluyor...' : t('createListing.actions.create')}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
