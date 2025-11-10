import { create } from "zustand";

interface AmountState {
  toAmount: number;
  fromAmount: number;
  setToAmount: (amount: number) => void;
  setFromAmount: (amount: number) => void;
}

export const useAmountStore = create<AmountState>((set) => ({
  toAmount: 0,
  fromAmount: 0,
  setToAmount: (amount: number) => set({ toAmount: amount }),
  setFromAmount: (amount: number) => set({ fromAmount: amount }),
}));
