'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Search, MapPin, DollarSign, Users, ChevronDown, Heart } from 'lucide-react';
import Link from 'next/link';

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    city: 'istanbul',
    district: '',
    minBudget: '',
    maxBudget: '',
    type: 'all',
  });

  const [showFilters, setShowFilters] = useState(false);

  // Mock listings
  const listings = [
    {
      id: '1',
      title: 'Beşiktaş\'ta 2+1 Ev - Arkadaş Aranıyor',
      city: 'İstanbul',
      district: 'Beşiktaş',
      neighborhood: 'Ortaköy',
      monthlyRent: 15000,
      residents: { current: 1, total: 2 },
      owner: 'Ahmet Yılmaz',
      ownerScore: 720,
      images: '🏘️',
      amenities: ['Mobilyalı', 'İnternet', 'Klima'],
    },
    {
      id: '2',
      title: 'Çankırı\'da Oda Arıyorum',
      city: 'İstanbul',
      district: 'Çankırı',
      neighborhood: 'Merkez',
      monthlyRent: 8000,
      residents: { current: 0, total: 2 },
      owner: 'Zeynep Kaya',
      ownerScore: 680,
      images: '🏠',
      amenities: ['İnternet', 'Balkon'],
    },
    {
      id: '3',
      title: 'Taksim\'de Güzel Daire - 3 Kişilik',
      city: 'İstanbul',
      district: 'Beyoğlu',
      neighborhood: 'Taksim',
      monthlyRent: 12000,
      residents: { current: 2, total: 3 },
      owner: 'Ali Demir',
      ownerScore: 850,
      images: '🏢',
      amenities: ['Mobilyalı', 'İnternet', 'Çamaşır Makinesi', 'Balkon'],
    },
    {
      id: '4',
      title: 'Kadıköy\'de Arkadaş Arıyorum',
      city: 'İstanbul',
      district: 'Kadıköy',
      neighborhood: 'Moda',
      monthlyRent: 9500,
      residents: { current: 1, total: 2 },
      owner: 'Selin Çiçek',
      ownerScore: 720,
      images: '🏡',
      amenities: ['Mobilyalı', 'İnternet'],
    },
  ];

  return (
    <div className="min-h-screen bg-light">
      <DashboardHeader />

      <main className="container-main py-12">
        <h1 className="text-4xl font-bold mb-8">İlanları Keşfet</h1>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex gap-4 items-end mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-dark mb-2">
                Şehir
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="input-field"
              >
                <option value="istanbul">İstanbul</option>
                <option value="ankara">Ankara</option>
                <option value="izmir">İzmir</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-dark mb-2">
                En Yüksek Bütçe
              </label>
              <input
                type="number"
                placeholder="20000"
                value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                className="input-field"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center gap-2"
            >
              Filtreler <ChevronDown size={20} />
            </button>

            <button className="btn-primary flex items-center gap-2">
              <Search size={20} />
              Ara
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-6 mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  İlan Türü
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="input-field"
                >
                  <option value="all">Tümü</option>
                  <option value="room_available">Oda Var</option>
                  <option value="looking_for_room">Oda Arıyorum</option>
                  <option value="looking_together">Birlikte Ara</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  En Düşük Bütçe
                </label>
                <input
                  type="number"
                  placeholder="5000"
                  value={filters.minBudget}
                  onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                  className="input-field"
                />
              </div>

              <label className="flex items-center gap-2 pt-6">
                <input type="checkbox" />
                <span className="font-medium">Doğrulanmış Kullanıcılar</span>
              </label>

              <label className="flex items-center gap-2 pt-6">
                <input type="checkbox" />
                <span className="font-medium">Yüksek Puan</span>
              </label>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* Listing Card */}
              <div className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center group">
                  <span className="text-8xl">{listing.images}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition opacity-0 group-hover:opacity-100"
                  >
                    <Heart size={20} className="text-primary" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {listing.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      {listing.city} - {listing.district}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-success" />
                      ₺{listing.monthlyRent.toLocaleString('tr-TR')}/ay
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-secondary" />
                      {listing.residents.current}/{listing.residents.total} kişi
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.amenities.slice(0, 2).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {listing.amenities.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        +{listing.amenities.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Owner Info */}
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{listing.owner}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">⭐ {listing.ownerScore}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/messages';
                      }}
                      className="btn-secondary text-sm px-4 py-2"
                    >
                      Mesaj Gönder
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
