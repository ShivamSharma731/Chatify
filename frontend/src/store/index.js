import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";

export const useAppStore = create()((...a) => ({  // creates a store in zustand for storing userinfo from auth slice
  ...createAuthSlice(...a),   // store configuration function
}));
