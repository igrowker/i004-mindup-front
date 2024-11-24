import { create } from 'zustand';

interface UserState {
  user: any | null;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));


  // MODAL +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  interface ModalState {
    openModal: boolean;
    toggleModal: () => void;
  }
  
  export const useModalStore = create<ModalState>((set) => ({
    openModal: false,
    toggleModal: () => set((state) => ({ openModal: !state.openModal })),
  }));