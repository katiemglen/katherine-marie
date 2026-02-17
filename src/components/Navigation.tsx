"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Map, Archive, User } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Compass },
  { href: "/trips/2016-west-coast-road-trip", label: "West Coast", icon: Map },
  { href: "/trips/2019-east-coast-road-trip", label: "East Coast", icon: Map },
  { href: "/archive", label: "Archive", icon: Archive },
  { href: "/about", label: "About", icon: User },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card !rounded-none border-x-0 border-t-0 !border-b !border-b-jungle-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <Compass className="w-6 h-6 text-jungle-400 group-hover:text-jungle-300 transition-colors" />
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-jungle-300 to-golden-300 bg-clip-text text-transparent">Katherine Marie</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (<Link key={link.href} href={link.href} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-jungle-300 hover:bg-jungle-900/30 transition-all"><link.icon className="w-4 h-4" />{link.label}</Link>))}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-300 hover:text-jungle-300 transition-colors">{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden glass-card !rounded-none !rounded-b-xl mx-2 mt-1 overflow-hidden">
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (<Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-jungle-300 hover:bg-jungle-900/30 transition-all"><link.icon className="w-5 h-5" />{link.label}</Link>))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
