"use client";

import { useState, useEffect } from "react";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useAmountStore } from "@/store/useAmountStore";
import { useUpdateStore } from "@/store/useUpdateStore";
import { convertCurrency } from "@/lib/convertCurrency";

const AmountDisplay = () => {
  const { fromCurrency, toCurrency } = useCurrencyStore();
  const { fromAmount } = useAmountStore();
  const { setLastUpdate } = useUpdateStore();
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (!fromAmount) return;
    (async () => {
      const value = await convertCurrency(
        fromAmount,
        fromCurrency.code,
        toCurrency.code
      );
      setResult(Math.round(value * 100) / 100);
      setLastUpdate(new Date());
    })();
  }, [fromAmount, fromCurrency, toCurrency, setLastUpdate]);

  return (
    <div className="w-full bg-surface p-4 rounded-lg text-center text-2xl font-medium">
      {result ? result : 0} {toCurrency.symbol}
    </div>
  );
};

export default AmountDisplay;
