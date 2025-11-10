"use client";

import { FC, useState, useEffect } from "react";
import { useUpdateStore } from "@/store/useUpdateStore";
import { timeAgo } from "@/lib/timeAgo";
import { motion } from "framer-motion";

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: FC<HeaderBarProps> = ({ title = "Title" }) => {
  return (
    <motion.header
      className="w-full border-b border-neutral-600/50 flex items-center justify-between p-2"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
    >
      <h1 className="font-title text-2xl sm:text-3xl">{title}</h1>
      <StatusIndicator />
    </motion.header>
  );
};

export default HeaderBar;

function StatusIndicator() {
  const lastUpdate = useUpdateStore((s) => s.lastUpdate);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!lastUpdate) return;
    const updateText = () => setText(timeAgo(lastUpdate));
    updateText();

    const interval = setInterval(updateText, 1_000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  if (!lastUpdate)
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="bg-red-600 size-2 rounded-full" />
        <div>Never updated</div>
      </div>
    );

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="bg-green-600 size-2 rounded-full" />
      {text}
    </div>
  );
}
