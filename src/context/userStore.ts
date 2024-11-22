import { create } from 'zustand';

interface UserState {
  user: any | null;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
