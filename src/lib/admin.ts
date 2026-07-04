const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ADMIN_COOKIE = 'admin-secret';

export function getAdminSecret(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp(`(^| )${ADMIN_COOKIE}=([^;]+)`));
  return match ? match[2] : '';
}

export function setAdminSecret(secret: string) {
  document.cookie = `${ADMIN_COOKIE}=${secret}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function clearAdminSecret() {
  document.cookie = `${ADMIN_COOKIE}=; path=/; max-age=0`;
}

async function adminFetch(path: string, options: RequestInit = {}) {
  const secret = getAdminSecret();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Secret': secret,
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const adminApi = {
  verifySecret: (secret: string) =>
    fetch(`${API_URL}/admin/stats`, {
      headers: { 'Content-Type': 'application/json', 'X-Admin-Secret': secret },
    }).then((r) => r.ok),

  getStats: () => adminFetch('/admin/stats'),
  getSystem: () => adminFetch('/admin/system'),

  getUsers: (page = 1, search = '') =>
    adminFetch(`/admin/users?page=${page}&limit=20${search ? `&search=${search}` : ''}`),
  toggleUser: (id: string) =>
    adminFetch(`/admin/users/${id}/toggle`, { method: 'PATCH' }),
  deleteUser: (id: string) =>
    adminFetch(`/admin/users/${id}`, { method: 'DELETE' }),

  getListings: (page = 1, search = '') =>
    adminFetch(`/admin/listings?page=${page}&limit=20${search ? `&search=${search}` : ''}`),
  toggleListing: (id: string) =>
    adminFetch(`/admin/listings/${id}/toggle`, { method: 'PATCH' }),
  deleteListing: (id: string) =>
    adminFetch(`/admin/listings/${id}`, { method: 'DELETE' }),
};
