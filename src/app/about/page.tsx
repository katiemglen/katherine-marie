"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Camera, Coffee } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8 }} className="w-16 h-px bg-gradient-to-r from-transparent via-sunlight-400/50 to-transparent mx-auto mb-8" />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold sunbeam-text mb-6">About</h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">Everyone loves a little mystery.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 md:p-12 mb-12">
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-10">
            <img src="https://katherinemariedotcom.wordpress.com/wp-content/uploads/2019/04/20190426_131954-1.jpg" alt="Katherine Marie" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jungle-900/60 via-transparent to-transparent" />
          </div>
          <div className="space-y-6">
            <p className="text-lg text-white/70 leading-relaxed">That&apos;s why taking part in adventures is such a joy because there is never a known outcome as variables change at every turn. Welcome to life as an adventure, where every joy and heartache is a little mystery waiting to be solved.</p>
            <p className="text-lg text-white/70 leading-relaxed">My name is Katherine Marie, Katie for short. This space describes my passions and allows me a space to write freely. Your journey is underway, as is mine, and it&apos;s a beautiful thing that our paths crossed.</p>
            <blockquote className="border-l-[3px] border-sunlight-400/40 pl-6 py-4 my-8 bg-white/[0.02] rounded-r-xl">
              <p className="text-white/60 italic text-lg leading-relaxed">I am a free spirit. I am a ball of bright love energy. I am a catalyst. I am listening. I am that I am.</p>
            </blockquote>
            <h2 className="font-serif text-2xl sunbeam-text mt-12 mb-6">The Road Trips</h2>
            <p className="text-white/70 leading-relaxed">In December 2016, Chad and I packed up a diesel Jetta and headed west. Three weeks, thousands of miles, from the frozen tundra of Minnesota through Colorado&apos;s mountains, the deserts of Utah and Arizona, and all the way to the California coast.</p>
            <p className="text-white/70 leading-relaxed">In 2019, we did it again &mdash; bigger, bolder. Two months on the East Coast, through the American South, up the Atlantic seaboard, into Canada, and back. From Texas BBQ to Maine lobster, from the streets of Manhattan to the coves of Nova Scotia.</p>
            <p className="text-white/70 leading-relaxed">This blog is our travel journal &mdash; a place where these memories live on. Every post is a snapshot of a moment on the road, written with love and a healthy dose of humor.</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: MapPin, title: "Home Base", text: "Minnesota \u2014 land of 10,000 lakes and two very adventurous people.", color: "text-jungle-400" },
            { icon: Coffee, title: "Fuel", text: "Coffee shops were a non-negotiable stop in every city.", color: "text-sunlight-400" },
            { icon: Camera, title: "Documenting", text: "2,500+ photos across both trips.", color: "text-ethereal-400" },
            { icon: Heart, title: "The Duo", text: "Katie & Chad \u2014 two Minnesotans proving the best adventures are shared.", color: "text-red-400/70" },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
              <h3 className="font-serif text-lg text-white/80 mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-16">
          <p className="text-white/40 mb-6">Ready to hit the road?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/trips/west-coast-2016" className="px-6 py-3 rounded-full bg-gradient-to-r from-jungle-600 to-jungle-500 text-white font-medium hover:from-jungle-500 hover:to-jungle-400 transition-all duration-300">West Coast 2016</Link>
            <Link href="/trips/east-coast-2019" className="px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300">East Coast 2019</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
