import { create } from "zustand";

interface UserState {
  user: any;
  getUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  getUser: async () => {
    try {
      const res = await fetch(
        "https://673d45350118dbfe8606b241.mockapi.io/users/pacient",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const user = await res.json();
      console.log(user);
      set((state) => ({
        ...state,
        user,
      }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
}));
