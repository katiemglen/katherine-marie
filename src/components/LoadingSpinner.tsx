"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <Compass className="w-10 h-10 text-jungle-400" />
      </motion.div>
      <p className="text-sm text-slate-400 animate-pulse">Loading adventures...</p>
    </div>
  );
}
