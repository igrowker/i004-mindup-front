import { create } from "zustand";

interface DecodedUser {
  id: string;
  email: string;
  role: string;
}

interface UserState {
  user: DecodedUser | null;
  setUser: (user: DecodedUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Modal Store
interface ModalState {
  openModal: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModal: false,
  toggleModal: () => set((state) => ({ openModal: !state.openModal })),
}));
