"use client";

import Link from "next/link";
import { Leaf, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-32">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-jungle-950/80 pointer-events-none" />
      <div className="relative bg-jungle-950/80 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-jungle-400" />
                <span className="font-serif text-xl sunbeam-text">Katherine Marie</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Adventures across America and beyond. Every mile a memory, every stop a story.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg text-white/80 mb-4">Road Trips</h3>
              <div className="space-y-2">
                <Link href="/trips/west-coast-2016" className="block text-sm text-white/40 hover:text-jungle-400 transition-colors">
                  🌅 West Coast 2016
                </Link>
                <Link href="/trips/east-coast-2019" className="block text-sm text-white/40 hover:text-jungle-400 transition-colors">
                  🗽 East Coast 2019
                </Link>
                <Link href="/posts" className="block text-sm text-white/40 hover:text-jungle-400 transition-colors">
                  📖 All Posts
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg text-white/80 mb-4">About</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                Katie &amp; Chad&apos;s travel stories — two Minnesotans exploring one road trip at a time.
              </p>
              <Link href="/about" className="text-sm text-jungle-400 hover:text-jungle-300 transition-colors">
                Learn more →
              </Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Katherine Marie. All rights reserved.
            </p>
            <motion.p
              className="text-white/30 text-xs flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              Made with <Heart className="w-3 h-3 text-red-400/60" /> and wanderlust
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
