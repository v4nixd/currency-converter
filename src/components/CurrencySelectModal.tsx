import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";

import { useCurrencyStore } from "@/store/useCurrencyStore";
import { currencies } from "@/lib/currencies";
import { cn } from "@/lib/utils";

interface CurrencySelectModalProps {
  label: "From" | "To";
  open: boolean;
  onClose: () => void;
}

const CurrencySelectModal: FC<CurrencySelectModalProps> = ({
  label,
  open,
  onClose,
}) => {
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } =
    useCurrencyStore();

  const selectedCurrency = label === "From" ? fromCurrency : toCurrency;
  const setCurrency = label === "From" ? setFromCurrency : setToCurrency;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed bottom-0 sm:max-w-3xl sm:mx-auto left-0 right-0 z-50 h-1/2 bg-background border-t border-t-neutral-800 rounded-t-2xl shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 2 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) onClose();
            }}
          >
            <div className="w-12 h-1 bg-neutral-800 rounded-full mx-auto my-4" />
            <div className="max-h-[70vh] pb-8 overflow-hidden">
              {currencies.map((currency) => (
                <div
                  key={currency.code}
                  onClick={() => {
                    setCurrency(currency);
                    onClose();
                  }}
                  className={cn(
                    "flex justify-between items-center p-2 text-sm sm:text-md cursor-pointer hover:bg-surface-hover",
                    currency.code === selectedCurrency.code
                      ? "bg-surface-hover"
                      : ""
                  )}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-bold font-title text-3xl">
                      {currency.code}
                    </p>
                  </div>
                  <p className="text-lg">{currency.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CurrencySelectModal;
