import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      adminToken: null,
      userToken: null,
      setAdminToken: (t) => set({ adminToken: t }),
      setUserToken: (t) => set({ userToken: t }),
      logoutAdmin: () => set({ adminToken: null }),
      logoutUser: () => set({ userToken: null })
    }),
    { name: 'auth-store' }
  )
);