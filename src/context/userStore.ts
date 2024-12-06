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

export const selectedProfessionalStore = create<SelectedProfessionalState>(
  (set) => ({
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

// Logout Modal Store
interface LogoutModalState {
  openLogoutModal: boolean;
  toggleLogoutModal: () => void;
}

export const useLogoutModalStore = create<LogoutModalState>((set) => ({
  openLogoutModal: false,
  toggleLogoutModal: () =>
    set((state) => ({ openLogoutModal: !state.openLogoutModal })),
}));

// Recovery Password Modal Store
interface RecoveryModalState {
  openRecoveryModal: boolean;
  toggleRecoveryModal: () => void;
}

export const useRecoveryModalStore = create<RecoveryModalState>((set) => ({
  openRecoveryModal: false,
  toggleRecoveryModal: () =>
    set((state) => ({ openRecoveryModal: !state.openRecoveryModal })),
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

// Questionnaire Modal Store
interface QuestionnaireModalState {
  openQuestionnaireModal: boolean;
  toggleQuestionnaireModal: () => void;
}

export const useQuestionnaireModalStore = create<QuestionnaireModalState>(
  (set) => ({
    openQuestionnaireModal: false,
    toggleQuestionnaireModal: () =>
      set((state) => ({
        openQuestionnaireModal: !state.openQuestionnaireModal,
      })),
  })
);

interface EmergencyModalState {
  openEmergencyModal: boolean;
  toggleEmergencyModal: () => void;
}

export const useEmergencyModalStore = create<EmergencyModalState>((set) => ({
  openEmergencyModal: false,
  toggleEmergencyModal: () =>
    set((state) => ({ openEmergencyModal: !state.openEmergencyModal })),
}));

interface availableForUrgenciesState {
  openAvailableForUrgencies: boolean;
  toggleAvailableForUrgencie: () => void;
}

export const useAvailableForUrgenciesStore = create<availableForUrgenciesState>(
  (set) => ({
    openAvailableForUrgencies: false,
    toggleAvailableForUrgencie: () =>
      set((state) => ({
        openAvailableForUrgencies: !state.openAvailableForUrgencies,
      })),
  })
);
