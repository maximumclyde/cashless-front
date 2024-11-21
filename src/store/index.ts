import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Store, adminSlice } from "./slices";

const useStore = create<Store>()(
  devtools(
    persist(
      (...args) => {
        return {
          ...adminSlice(...args),
        };
      },
      {
        name: "cashless",
        partialize(state) {
          return {
            admin: state.admin,
            token: state.token,
          };
        },
      }
    )
  )
);

export default useStore;
