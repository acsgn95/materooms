'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Listing {
  id: string;
  title: string;
  city: string;
  district: string;
  rent_full: number;
  listing_type: string;
  latitude: number | null;
  longitude: number | null;
}

function MapBounds({ listings }: { listings: Listing[] }) {
  const map = useMap();
  useEffect(() => {
    const valid = listings.filter(l => l.latitude && l.longitude);
    if (valid.length > 0) {
      const bounds = L.latLngBounds(valid.map(l => [l.latitude!, l.longitude!]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [listings, map]);
  return null;
}

const TYPE_LABELS: Record<string, string> = {
  room_available: 'Oda Var',
  looking_for_room: 'Oda Arıyor',
  looking_together: 'Birlikte Arıyor',
};

export default function ListingsMap({ listings }: { listings: Listing[] }) {
  const validListings = listings.filter(l => l.latitude && l.longitude);

  return (
    <MapContainer
      center={[39.0, 35.0]}
      zoom={6}
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validListings.length > 0 && <MapBounds listings={validListings} />}
      {validListings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.latitude!, listing.longitude!]}
          icon={redIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-semibold text-sm mb-1">{listing.title}</p>
              <p className="text-xs text-gray-500 mb-1">{listing.city}, {listing.district}</p>
              <p className="text-xs text-gray-500 mb-2">{TYPE_LABELS[listing.listing_type] || listing.listing_type}</p>
              <p className="font-bold text-red-600 mb-2">{listing.rent_full.toLocaleString('tr-TR')} ₺</p>
              <Link
                href={`/listings/${listing.id}`}
                className="block text-center text-xs bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
              >
                İlanı Gör
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
      {validListings.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none">
          <div className="bg-white/90 rounded-xl px-6 py-4 text-gray-500 text-sm shadow">
            Haritada gösterilecek koordinatlı ilan yok
          </div>
        </div>
      )}
    </MapContainer>
  );
}
