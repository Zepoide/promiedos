import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserPayload } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "@/services/api.service";

interface AuthState {
  user: UserPayload | null;
  setUser: (user: UserPayload | null) => void;
  editUser: (user: UserPayload | null) => void;
}

export const userStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      editUser: async (data) => {
        const jwt = await AsyncStorage.getItem("jwt");
        if (!jwt) throw new Error("Inicia sesión para editar tus datos");
        const response = await apiService.put("/user/update", data, {
          Authorization: jwt,
        });
        const updatedUser = await response.json();

        set({ user: updatedUser });
      },
    }),
    {
      name: "user-storage", // name of the item in the storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
