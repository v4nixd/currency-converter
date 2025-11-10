import { motion, AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import { Delete, Check } from "lucide-react";
import { TextMorph } from "../../components/motion-primitives/text-morph";

import { useAmountStore } from "@/store/useAmountStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { cn } from "@/lib/utils";

interface AmountInputModalProps {
  open: boolean;
  onClose: () => void;
}

const AmountInputModal: FC<AmountInputModalProps> = ({ open, onClose }) => {
  const { fromAmount: amount, setFromAmount: setAmount } = useAmountStore();
  const { fromCurrency } = useCurrencyStore();
  const [value, setValue] = useState<string>("");

  const handlePress = (key: string) => {
    let newValue = value;

    if (key === "C") newValue = "";
    else if (key === "del") newValue = value.slice(0, -1);
    else if (key === "." && value.includes(".")) return;
    else if (key === "ok") onClose();
    else newValue = value + key;

    setValue(newValue);

    if (/[0-9]/.test(newValue)) {
      setAmount?.(parseFloat(newValue));
    } else {
      setAmount?.(0);
    }
  };

  const keys = [
    "7",
    "8",
    "9",
    "del",
    "4",
    "5",
    "6",
    "C",
    "1",
    "2",
    "3",
    "ok",
    "",
    "0",
    "",
    "",
  ];

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
            className="fixed top-24 left-0 right-0 z-50 flex justify-center pointer-events-none"
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
          >
            <TextMorph className="font-title text-7xl">
              {amount !== null && amount !== undefined
                ? `${amount}${fromCurrency.symbol}`
                : `0${fromCurrency.symbol}`}
            </TextMorph>
          </motion.div>

          <motion.div
            className="fixed bottom-0 sm:max-w-3xl sm:mx-auto left-0 right-0 z-50 h-2/3 bg-background border-t border-t-neutral-800 shadow-xl"
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
            <div className="max-h-[70vh] py-8 overflow-hidden">
              <div className="grid grid-cols-4 gap-3 w-full">
                {keys.map((k) => (
                  <button
                    key={k}
                    onClick={() => handlePress(k)}
                    className={cn(
                      "flex items-center justify-center aspect-square bg-surface rounded-xl text-5xl font-medium text-text-primary font-title transition select-none",
                      k === "ok"
                        ? "bg-green-400"
                        : k === ""
                        ? ""
                        : "hover:bg-surface-hover active:bg-surface-pressed"
                    )}
                  >
                    {k === "del" ? (
                      <Delete className="size-16" />
                    ) : k === "ok" ? (
                      <Check strokeWidth={4} className="size-16" />
                    ) : (
                      k
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AmountInputModal;
