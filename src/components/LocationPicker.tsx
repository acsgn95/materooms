'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  lat: number | null;
  lng: number | null;
  centerLat?: number;
  centerLng?: number;
  onChange: (lat: number, lng: number) => void;
}

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapCenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

export default function LocationPicker({ lat, lng, centerLat, centerLng, onChange }: Props) {
  const defaultCenter: [number, number] = [centerLat ?? 39.0, centerLng ?? 35.0];
  const defaultZoom = centerLat ? 12 : 6;

  return (
    <div className="space-y-2">
      <p className="text-xs text-white/40">Haritaya tıklayarak ilanın konumunu işaretleyin</p>
      <div style={{ height: '280px', borderRadius: '10px', overflow: 'hidden' }}>
        <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onChange={onChange} />
          {centerLat && centerLng && <MapCenter lat={centerLat} lng={centerLng} />}
          {lat && lng && <Marker position={[lat, lng]} />}
        </MapContainer>
      </div>
      {lat && lng ? (
        <p className="text-xs text-green-400">✓ Konum seçildi: {lat.toFixed(5)}, {lng.toFixed(5)}</p>
      ) : (
        <p className="text-xs text-white/30">Henüz konum seçilmedi</p>
      )}
    </div>
  );
}
