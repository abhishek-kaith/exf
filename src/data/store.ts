import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IUser } from "./types/auth.types";

interface UserState {
  user: IUser | null;
  isLogedIn: boolean;
  setCredentials: (user: IUser) => void;
  logout: () => void;
  setIsLogIn: (isLogIn: boolean) => void;
}
export const authStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLogedIn: false,
        setCredentials: (user) =>
          set(() => ({
            user,
            isLogedIn: true,
          })),
        setIsLogIn: (isLogedIn) => set(() => ({ isLogedIn })),
        logout: () => set(() => ({ user: null, isLogedIn: false })),
      }),
      {
        name: "user-store",
      }
    )
  )
);
