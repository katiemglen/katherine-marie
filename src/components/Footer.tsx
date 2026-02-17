"use client";
import Link from "next/link";
import { Compass, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-jungle-900/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-jungle-400" />
            <span className="font-serif text-lg bg-gradient-to-r from-jungle-300 to-golden-300 bg-clip-text text-transparent">Katherine Marie</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/trips/2016-west-coast-road-trip" className="hover:text-jungle-300 transition-colors">West Coast</Link>
            <Link href="/trips/2019-east-coast-road-trip" className="hover:text-jungle-300 transition-colors">East Coast</Link>
            <Link href="/archive" className="hover:text-jungle-300 transition-colors">Archive</Link>
            <Link href="/about" className="hover:text-jungle-300 transition-colors">About</Link>
          </div>
          <p className="text-sm text-slate-500 flex items-center gap-1">Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> by Katie &amp; Chad</p>
        </div>
      </div>
    </footer>
  );
}
