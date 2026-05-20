import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, UserProfileOut } from '@/types/api';
import { tokenStorage } from '@/lib/api';

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser) => void;
  setProfile: (profile: UserProfileOut | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setAuth: (user) => set({ user, isAuthenticated: true }),

      setProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, profile } : null,
        })),

      logout: () => {
        tokenStorage.clear();
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: 'materooms-auth' }
  )
);
