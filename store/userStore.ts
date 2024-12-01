import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserPayload } from "@/context/AuthContext";
import apiService from "@/services/api.service";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

interface AuthState {
  user: UserPayload | null;
  setUser: (user: UserPayload | null) => void;
  editUser: (user: UserPayload | null) => void;
  logout: () => void;
}

const secureStorage = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const userStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      editUser: async (data) => {
        const jwt = await secureStorage.getItem("jwt");
        if (!jwt) throw new Error("Inicia sesión para editar tus datos");
        const response = await apiService.put("/user/update", data, {
          Authorization: jwt,
        });
        const updatedUser = await response.json();

        set({ user: updatedUser });
      },
      logout: async () => {
        const router = useRouter();
        await SecureStore.deleteItemAsync("jwt");
        set({ user: null });
        router.replace("/(auth)/login");
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
