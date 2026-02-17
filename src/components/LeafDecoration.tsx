"use client";

import { motion } from "framer-motion";

const leaves = [
  "M12 2C12 2 8 8 8 14C8 20 12 22 12 22C12 22 16 20 16 14C16 8 12 2 12 2Z",
  "M10 2C6 6 2 12 2 16C2 22 8 24 12 22C16 24 22 22 22 16C22 12 18 6 14 2C13 4 11 4 10 2Z",
];

export default function LeafDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.svg className="absolute -top-10 -left-10 w-40 h-40 text-jungle-600/[0.04]" viewBox="0 0 24 24" fill="currentColor"
        animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <path d={leaves[0]} />
      </motion.svg>
      <motion.svg className="absolute top-20 -right-5 w-32 h-32 text-jungle-600/[0.03]" viewBox="0 0 24 24" fill="currentColor"
        animate={{ rotate: [5, -2, 5] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <path d={leaves[1]} />
      </motion.svg>
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-sunlight-400/20"
          style={{ left: `${15 + i * 15}%`, top: `${10 + (i % 3) * 25}%` }}
          animate={{ y: [-20, 20, -20], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} />
      ))}
    </div>
  );
}
