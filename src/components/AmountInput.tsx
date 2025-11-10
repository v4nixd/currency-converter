"use client";

import { useState } from "react";
import { useAmountStore } from "@/store/useAmountStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import AmountInputModal from "./AmountInputModal";

const AmountInput = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fromAmount: amount } = useAmountStore();
  const { fromCurrency } = useCurrencyStore();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="w-full bg-surface p-4 rounded-lg text-center text-2xl font-medium"
      >
        {amount} {fromCurrency.symbol}
      </button>
      <AmountInputModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AmountInput;
