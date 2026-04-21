'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { MessageSquare, Home, Eye, BadgeCheck, CreditCard, Bell } from 'lucide-react';

type NotifType = 'message' | 'listing_match' | 'profile_view' | 'verification' | 'payment';

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
};

const typeConfig: Record<NotifType, { icon: React.ReactNode; color: string }> = {
  message:       { icon: <MessageSquare size={20} />, color: 'text-secondary bg-secondary/10' },
  listing_match: { icon: <Home size={20} />,          color: 'text-cyan-400 bg-cyan-400/10' },
  profile_view:  { icon: <Eye size={20} />,           color: 'text-purple-400 bg-purple-400/10' },
  verification:  { icon: <BadgeCheck size={20} />,    color: 'text-secondary bg-secondary/10' },
  payment:       { icon: <CreditCard size={20} />,    color: 'text-amber-400 bg-amber-400/10' },
};

const MOCK: Notification[] = [
  { id: 'n1', type: 'message', title: 'Yeni Mesaj', content: 'Zeynep Kaya sana mesaj gönderdi: "Beşiktaş\'taki oda hakkında sorularım var"', read: false, createdAt: '2026-04-20T10:00:00Z', relatedId: 'c1' },
  { id: 'n2', type: 'listing_match', title: 'Yeni Eşleşen İlan', content: 'Kaydettiğin aramaya uygun yeni bir ilan eklendi: "Kadıköy\'de 2+1 Ev"', read: false, createdAt: '2026-04-20T08:30:00Z', relatedId: '4' },
  { id: 'n3', type: 'profile_view', title: 'Profil Görüntülendi', content: 'Birisi profilini görüntüledi', read: true, createdAt: '2026-04-19T15:00:00Z' },
  { id: 'n4', type: 'verification', title: 'Kimlik Doğrulaması Onaylandı', content: 'TC Kimlik doğrulamanız başarıyla tamamlandı. "ID Verified" rozeti profilinize eklendi.', read: true, createdAt: '2026-04-18T11:00:00Z' },
  { id: 'n5', type: 'listing_match', title: 'Yeni Eşleşen İlan', content: 'Kaydettiğin aramaya uygun yeni bir ilan: "Beşiktaş\'ta 3+1 Daire"', read: true, createdAt: '2026-04-17T09:00:00Z', relatedId: '1' },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK);
  const [filter, setFilter] = useState<'all' | NotifType>('all');

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter);

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} dk önce`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} saat önce`;
    return `${Math.floor(hours / 24)} gün önce`;
  };

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-serif font-light text-white">Bildirimler</h1>
              {unreadCount > 0 && (
                <span className="bg-secondary text-black text-sm font-bold px-2.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-sm text-secondary font-semibold hover:underline">
                Tümünü okundu işaretle
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {([
              { key: 'all', label: 'Tümü' },
              { key: 'message', label: 'Mesajlar' },
              { key: 'listing_match', label: 'İlan Eşleşme' },
              { key: 'profile_view', label: 'Profil Görüntüleme' },
              { key: 'verification', label: 'Doğrulama' },
            ] as { key: 'all' | NotifType; label: string }[]).map((t) => (
              <button key={t.key} onClick={() => setFilter(t.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === t.key
                    ? 'bg-secondary text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Notification List */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Bell size={48} className="mx-auto text-white/10 mb-4" />
              <p className="text-white/40">Bildirim yok</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((notif) => {
                const config = typeConfig[notif.type];
                return (
                  <div key={notif.id} onClick={() => markRead(notif.id)}
                    className={`card cursor-pointer hover:border-white/20 transition ${!notif.read ? 'border-secondary/30 bg-secondary/[0.03]' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}>
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`font-semibold text-sm ${!notif.read ? 'text-white' : 'text-white/60'}`}>{notif.title}</p>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-white/30">{timeAgo(notif.createdAt)}</span>
                            {!notif.read && <span className="w-2 h-2 bg-secondary rounded-full flex-shrink-0" />}
                          </div>
                        </div>
                        <p className="text-sm text-white/40 mt-0.5 line-clamp-2">{notif.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
