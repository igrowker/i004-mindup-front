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

// Select Store
interface DecodedSelect {
  isBelow35?: boolean;
  gender?: string;
}

interface SelectState {
  select: DecodedSelect;
  setSelect: (select: Partial<DecodedSelect>) => void; // Cambiamos a Partial
}

export const selectStore = create<SelectState>((set) => ({
  select: {},
  setSelect: (partialSelect) =>
    set((state) => ({
      select: { ...state.select, ...partialSelect }, // Combina el estado actual con los nuevos valores
    })),
}));

// Selected Professional Store
interface SelectedProfessionalState {
  selectedProfessional: string | null;
  setSelectedProfessional: (professional: string | null) => void;
}

export const selectedProfessionalStore = create<SelectedProfessionalState>((set) => ({
    selectedProfessional: null,
    setSelectedProfessional: (professional) =>
      set({ selectedProfessional: professional }),
  })
);

// Modal Store
interface ModalState {
  openModal: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModal: false,
  toggleModal: () => set((state) => ({ openModal: !state.openModal })),
}));
