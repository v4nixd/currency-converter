"use client";

import { FC, useState } from "react";
import { ChevronDown, ArrowRightLeft } from "lucide-react";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import CurrencySelectModal from "./CurrencySelectModal";

interface CurrencySelectorGroupProps {
  children?: React.ReactNode;
}

interface CurrencySelectorProps {
  label?: "From" | "To";
  code?: string;
  name?: string;
}

const CurrencySelectorGroup: FC<CurrencySelectorGroupProps> = () => {
  const { fromCurrency, toCurrency } = useCurrencyStore();

  return (
    <>
      <div className="flex items-center gap-4 w-full mt-4">
        <CurrencySelector
          label="From"
          code={fromCurrency.code}
          name={fromCurrency.name}
        />
        <SwapButton />
        <CurrencySelector
          label="To"
          code={toCurrency.code}
          name={toCurrency.name}
        />
      </div>
    </>
  );
};

const CurrencySelector: FC<CurrencySelectorProps> = ({ label = "From" }) => {
  const [open, setOpen] = useState(false);
  const { fromCurrency, toCurrency } = useCurrencyStore();

  const selectedCurrency = label === "From" ? fromCurrency : toCurrency;

  return (
    <div className="w-full relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-center items-center gap-4 p-4 w-full bg-surface hover:bg-surface-hover rounded-lg text-lg text-text-muted cursor-pointer"
      >
        <p>{label}</p>
        <p className="text-4xl text-text-primary font-title">
          {selectedCurrency.code}
        </p>
        <ChevronDown
          className={`text-text-primary size-8 mt-2 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
        <p>{selectedCurrency.name}</p>
      </button>
      <CurrencySelectModal
        label={label}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

function SwapButton() {
  const swapCurrencies = useCurrencyStore((s) => s.swapCurrencies);

  return (
    <button
      onClick={swapCurrencies}
      className="absolute left-1/2 -translate-x-1/2 bg-background z-10 h-min p-3 sm:p-4 rounded-full cursor-pointer"
    >
      <ArrowRightLeft className="text-text-primary size-8 sm:size-12" />
    </button>
  );
}

export default CurrencySelectorGroup;
