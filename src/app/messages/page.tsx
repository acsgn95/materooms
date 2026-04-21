'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Send, Search, MoreVertical, AlertTriangle } from 'lucide-react';

type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  read: boolean;
};

type Conversation = {
  id: string;
  user: { id: string; name: string; score: number; verified: boolean };
  listingTitle: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
};

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string>('c1');
  const [newMessage, setNewMessage] = useState('');

  const conversations: Conversation[] = [
    {
      id: 'c1',
      user: { id: 'u2', name: 'Zeynep Kaya', score: 680, verified: true },
      listingTitle: "Beşiktaş'ta 2+1 Ev",
      lastMessage: "Beşiktaş'taki oda hakkında sorularım var",
      lastMessageAt: '2026-04-20T10:00:00Z',
      unreadCount: 2,
      messages: [
        { id: 'm1', senderId: 'u2', content: "Merhaba! Beşiktaş'taki oda hâlâ müsait mi?", createdAt: '2026-04-20T09:30:00Z', read: true },
        { id: 'm2', senderId: 'me', content: 'Evet, hâlâ müsait. Hakkında ne bilmek istiyorsun?', createdAt: '2026-04-20T09:45:00Z', read: true },
        { id: 'm3', senderId: 'u2', content: 'Ne zaman taşınabilirim? Evcil hayvanım var, sorun olur mu?', createdAt: '2026-04-20T10:00:00Z', read: false },
      ],
    },
    {
      id: 'c2',
      user: { id: 'u3', name: 'Ali Demir', score: 850, verified: true },
      listingTitle: "Şişli'de Oda Arıyorum",
      lastMessage: 'Oda hâlâ müsait mi? Ne zaman taşınabilirim?',
      lastMessageAt: '2026-04-19T15:00:00Z',
      unreadCount: 0,
      messages: [
        { id: 'm4', senderId: 'u3', content: 'Merhaba, ilanınızı gördüm. Oda hâlâ müsait mi?', createdAt: '2026-04-19T14:00:00Z', read: true },
        { id: 'm5', senderId: 'me', content: 'Merhaba Ali, evet müsait.', createdAt: '2026-04-19T14:30:00Z', read: true },
        { id: 'm6', senderId: 'u3', content: 'Ne zaman taşınabilirim?', createdAt: '2026-04-19T15:00:00Z', read: true },
      ],
    },
  ];

  const active = conversations.find((c) => c.id === selectedConversation);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-6">
        <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900" style={{ height: 'calc(100vh - 120px)' }}>
          <div className="flex h-full">
            {/* Sidebar — Conversation List */}
            <div className="w-80 border-r border-white/10 flex flex-col flex-shrink-0">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-xl font-semibold text-white mb-3">Mesajlar</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-white/30" size={16} />
                  <input
                    type="text"
                    placeholder="Konuşma ara..."
                    className="w-full pl-9 pr-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>

              <div className="overflow-y-auto flex-1">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/5 transition ${
                      selectedConversation === conv.id ? 'bg-secondary/5 border-l-2 border-l-secondary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-secondary/20 border border-secondary/30 rounded-full flex items-center justify-center text-secondary font-bold">
                          {conv.user.name[0]}
                        </div>
                        {conv.user.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-black text-xs font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-sm text-white truncate">{conv.user.name}</p>
                          {conv.unreadCount > 0 && (
                            <span className="bg-secondary text-black text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 font-bold">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/30 truncate">{conv.listingTitle}</p>
                        <p className="text-xs text-white/40 truncate mt-1">{conv.lastMessage}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main — Message Thread */}
            {active ? (
              <div className="flex-1 flex flex-col">
                {/* Thread Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/20 border border-secondary/30 rounded-full flex items-center justify-center text-secondary font-bold">
                      {active.user.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{active.user.name}</p>
                      <p className="text-xs text-white/40">Puan: {active.user.score} · {active.listingTitle}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button title="Şikayet Et" className="p-2 border border-white/10 rounded-lg hover:border-red-500/50 hover:text-red-400 text-white/60 transition">
                      <AlertTriangle size={18} />
                    </button>
                    <button className="p-2 border border-white/10 rounded-lg hover:border-white/30 text-white/60 transition">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {active.messages.map((msg) => {
                    const isMe = msg.senderId === 'me';
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
                            isMe
                              ? 'bg-secondary text-black rounded-br-sm'
                              : 'bg-zinc-800 text-white rounded-bl-sm'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className={`text-xs mt-1 ${isMe ? 'text-black/60' : 'text-white/40'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            {isMe && <span className="ml-1">{msg.read ? '✓✓' : '✓'}</span>}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/10">
                  <p className="text-xs text-white/30 mb-2 text-center">
                    Telefon numaraları paylaşılmaz — her iki taraf da onaylamadan
                  </p>
                  <form onSubmit={handleSend} className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Mesajını yaz..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="input-field"
                    />
                    <button type="submit" disabled={!newMessage.trim()} className="btn-primary px-4 disabled:opacity-50">
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/30">
                Bir konuşma seç
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
