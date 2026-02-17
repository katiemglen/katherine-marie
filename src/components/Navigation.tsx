"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Sun } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trips/west-coast-2016", label: "West Coast \'16" },
  { href: "/trips/east-coast-2019", label: "East Coast \'19" },
  { href: "/posts", label: "All Posts" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
              <Leaf className="w-6 h-6 text-jungle-400" />
            </motion.div>
            <span className="font-serif text-xl md:text-2xl font-semibold sunbeam-text">Katherine Marie</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors group">
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-sunlight-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
            <motion.div className="ml-2" animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Sun className="w-4 h-4 text-sunlight-400/50" />
            </motion.div>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass-nav border-t border-white/5">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={link.href} onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all">{link.label}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
