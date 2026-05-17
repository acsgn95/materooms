import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type VerificationBadge =
  | 'phone_verified'
  | 'id_verified'
  | 'face_verified'
  | 'photo_verified'
  | 'clean_record';

type User = {
  id: string;
  phone: string;
  email?: string;
  name: string;
  city: string;
  verificationBadges: VerificationBadge[];
  flatmateScore: number;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 30}`;
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        document.cookie = 'auth-token=; path=/; max-age=0';
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    { name: 'materooms-auth' }
  )
);
