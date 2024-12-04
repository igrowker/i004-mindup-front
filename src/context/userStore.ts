import { create } from "zustand";

interface DecodedUser {
  id: string;
  email: string;
  role: string;
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

// Notification Modal Store
interface ModalState {
  openModal: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModal: false,
  toggleModal: () => set((state) => ({ openModal: !state.openModal })),
}));

// Logout Modal Store
interface LogoutModalState {
  openLogoutModal: boolean;
  toggleLogoutModal: () => void;
}

export const useLogoutModalStore = create<LogoutModalState>((set) => ({
  openLogoutModal: false,
  toggleLogoutModal: () => set((state) => ({ openLogoutModal: !state.openLogoutModal })),
}));

interface SocketData {
  professionalId: string;
  temporalChatId: string;
}

// Store para manejar los datos del socket
interface SocketStore {
  socketData: SocketData | null; // Guardamos los datos del socket
  setSocketData: (data: SocketData | null) => void; // Función para actualizar los datos
}

export const useSocketStore = create<SocketStore>((set) => ({
  socketData: null, // Inicialmente no hay datos del socket
  setSocketData: (data) => set({ socketData: data }), // Función para actualizar los datos del socket
}));