"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <Leaf className="w-8 h-8 text-jungle-400/60" />
      </motion.div>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="h-48 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-24 rounded shimmer" />
        <div className="h-6 w-3/4 rounded shimmer" />
        <div className="h-4 w-full rounded shimmer" />
        <div className="flex gap-4"><div className="h-3 w-20 rounded shimmer" /><div className="h-3 w-16 rounded shimmer" /></div>
      </div>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          className="mb-4">
          <Leaf className="w-12 h-12 text-jungle-400/60 mx-auto" />
        </motion.div>
        <p className="text-white/30 text-sm">Loading...</p>
      </motion.div>
    </div>
  );
}
