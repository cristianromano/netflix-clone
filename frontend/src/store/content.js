import { create } from "zustand";

export const useContentStore = create((set) => ({
  content: "movies",
  setContent: (content) => set({ content }),
}));
