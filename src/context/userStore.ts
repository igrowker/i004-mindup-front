import { create } from "zustand";

interface DecodedUser {
  id: string;
  email: string;
  role: string;
  professional?: string;
  name?: string;
  image?: string;
}

interface UserState {
  user: DecodedUser | null;
  registering: boolean; // Indica si el usuario está en proceso de registro
  setUser: (user: DecodedUser | null) => void;
  setRegistering: (registering: boolean) => void; // Nueva función para actualizar el estado de registro
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  registering: false, // Inicialmente no está en registro
  setUser: (user) => set({ user }),
  setRegistering: (registering) => set({ registering }),
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
