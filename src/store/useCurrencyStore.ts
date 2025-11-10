import { create } from "zustand";
import { Currency } from "@/lib/currencies";

interface CurrencyState {
  fromCurrency: Currency;
  toCurrency: Currency;
  setFromCurrency: (currency: Currency) => void;
  setToCurrency: (currency: Currency) => void;
  swapCurrencies: () => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  fromCurrency: {
    code: "USD",
    name: "US Dollar",
    countryCode: "US",
    symbol: "$",
  },
  toCurrency: { code: "EUR", name: "Euro", countryCode: "EU", symbol: "€" },

  setFromCurrency: (currency) => set({ fromCurrency: currency }),
  setToCurrency: (currency) => set({ toCurrency: currency }),

  swapCurrencies: () =>
    set((state) => ({
      fromCurrency: state.toCurrency,
      toCurrency: state.fromCurrency,
    })),
}));
