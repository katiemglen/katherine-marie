"use client";

import { motion } from "framer-motion";
import { MapPin, Heart, Car, Camera } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { icon: MapPin, label: "States Visited", value: "30+" },
    { icon: Car, label: "Miles Driven", value: "15,000+" },
    { icon: Camera, label: "Photos Taken", value: "1,000+" },
    { icon: Heart, label: "Stories Told", value: "73" },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-8 text-center">About This Blog</h1>

          <div className="glass-card p-8 sm:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-jungle-900/50 flex items-center justify-center">
                <Heart className="w-5 h-5 text-jungle-400" />
              </div>
              <h2 className="font-serif text-2xl text-golden-200">Katie &amp; Chad</h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>Hi! I am Katie, a writer, adventurer, and lover of road trips. This blog documents two epic journeys Chad and I took across America: our 2016 West Coast road trip and our 2019 East Coast road trip.</p>
              <p>What started as a fun way to keep family and friends updated turned into a collection of stories about the people we met, the places that took our breath away, and the hilarious misadventures of two Minnesotans in a diesel Jetta.</p>
              <p>From sleeping in parking lots at -12 degrees to watching the sunset over the Pacific, from skiing real mountains for the first time to navigating the back roads of the Outer Banks, every post captures a moment that made the miles worth it.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="glass-card p-4 text-center">
                <stat.icon className="w-5 h-5 text-jungle-400 mx-auto mb-2" />
                <div className="font-serif text-2xl font-bold text-golden-300">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="glass-card p-8 sm:p-10">
            <h2 className="font-serif text-2xl text-golden-200 mb-4">The Trips</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg text-jungle-300 mb-2">2016 West Coast Road Trip</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Three weeks in December-January. Minnesota to Colorado, through Utah and Arizona, down to San Diego and up the California coast.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-jungle-300 mb-2">2019 East Coast Road Trip</h3>
                <p className="text-slate-300 text-sm leading-relaxed">An extensive journey along the eastern seaboard. From the Great Smoky Mountains to the Outer Banks, through Washington D.C., Philadelphia, New York City, and beyond.</p>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-8">Originally published on WordPress.com, now reimagined and preserved here.</p>
        </motion.div>
      </div>
    </div>
  );
}
