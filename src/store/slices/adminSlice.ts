import { StateCreator } from "zustand";
import { AdminType } from "@types";

type PartialAdmin = Omit<AdminType, "memberPassword"> | undefined;

export interface AdminSlice {
  admin: PartialAdmin;
  token: string | undefined;
  setAdmin: (admin: PartialAdmin) => void;
  setToken: (token: string | undefined) => void;
}

export const adminSlice: StateCreator<AdminSlice, [], [], AdminSlice> = (
  set
) => {
  return {
    admin: undefined,
    token: undefined,
    setAdmin(admin) {
      return set({ admin });
    },
    setToken(token) {
      return set({ token });
    },
  };
};
