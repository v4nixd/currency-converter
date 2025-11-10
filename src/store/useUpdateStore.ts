import { create } from "zustand";

interface UpdateState {
  lastUpdate: Date | null;
  setLastUpdate: (date: Date) => void;
}

export const useUpdateStore = create<UpdateState>((set) => ({
  lastUpdate: null,
  setLastUpdate: (date: Date) => set({ lastUpdate: date }),
}));
