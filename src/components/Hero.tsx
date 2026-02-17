"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-jungle-gradient" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full">
          <div className="absolute top-0 left-1/4 w-1/3 h-full bg-gradient-to-b from-sunlight-400/[0.04] via-transparent to-transparent rotate-12 origin-top" />
          <div className="absolute top-0 left-1/2 w-1/4 h-full bg-gradient-to-b from-sunlight-300/[0.03] via-transparent to-transparent -rotate-6 origin-top" />
        </div>
        <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-jungle-400/[0.06] blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-ethereal-500/[0.04] blur-3xl"
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-sunlight-400/60 to-transparent mx-auto mb-8" />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-sunlight-400/70 font-light mb-6">Adventures in Living</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="sunbeam-text">Katherine</span><br /><span className="text-white/90">Marie</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Two road trips. Thousands of miles. Endless stories.<br className="hidden sm:block" />
          <span className="text-white/30">A travel journal by Katie &amp; Chad.</span>
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#trips" className="px-8 py-3 rounded-full bg-gradient-to-r from-jungle-600 to-jungle-500 text-white font-medium hover:from-jungle-500 hover:to-jungle-400 transition-all duration-300 shadow-lg shadow-jungle-600/20">Explore the Trips</a>
          <a href="#recent" className="px-8 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300">Latest Posts</a>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown className="w-6 h-6 text-white/20" />
      </motion.div>
    </section>
  );
}
