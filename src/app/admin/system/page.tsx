'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin';

interface SystemInfo {
  cpu_percent: number;
  ram: { total_gb: number; used_gb: number; percent: number };
  disk: { total_gb: number; used_gb: number; percent: number };
}

function ProgressBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
      <div
        className={`h-2 rounded-full transition-all ${color}`}
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

function MetricCard({ title, percent, detail }: { title: string; percent: number; detail: string }) {
  const color = percent > 85 ? 'bg-red-500' : percent > 60 ? 'bg-yellow-500' : 'bg-green-500';
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <div className="flex justify-between items-start mb-1">
        <p className="text-gray-400 text-sm">{title}</p>
        <span className={`text-lg font-bold ${percent > 85 ? 'text-red-400' : percent > 60 ? 'text-yellow-400' : 'text-green-400'}`}>
          %{percent.toFixed(1)}
        </span>
      </div>
      <ProgressBar percent={percent} color={color} />
      <p className="text-gray-500 text-xs mt-2">{detail}</p>
    </div>
  );
}

export default function AdminSystemPage() {
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const [error, setError] = useState('');

  async function load() {
    try {
      setInfo(await adminApi.getSystem());
    } catch {
      setError('Sistem bilgisi alınamadı');
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <p className="text-red-400">{error}</p>;
  if (!info) return <p className="text-gray-400">Yükleniyor...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Sistem Durumu</h1>
        <span className="text-gray-500 text-xs">Her 10 saniyede güncellenir</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="CPU Kullanımı"
          percent={info.cpu_percent}
          detail="2 çekirdek"
        />
        <MetricCard
          title="RAM Kullanımı"
          percent={info.ram.percent}
          detail={`${info.ram.used_gb} GB / ${info.ram.total_gb} GB`}
        />
        <MetricCard
          title="Disk Kullanımı"
          percent={info.disk.percent}
          detail={`${info.disk.used_gb} GB / ${info.disk.total_gb} GB`}
        />
      </div>
    </div>
  );
}
