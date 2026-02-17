"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, BookOpen, ArrowRight } from "lucide-react";

interface TripCardProps { tripSlug: string; name: string; description: string; dateRange: string; emoji: string; postCount: number; coverImage?: string; index?: number; }

export default function TripCard({ tripSlug, name, description, dateRange, emoji, postCount, coverImage, index = 0 }: TripCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}>
      <Link href={`/trips/${tripSlug}`} className="block group">
        <div className="relative glass-card overflow-hidden">
          {coverImage && (
            <div className="absolute inset-0">
              <img src={coverImage} alt={name} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-jungle-900/90 via-jungle-900/70 to-jungle-900/90" />
            </div>
          )}
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <motion.div className="text-5xl md:text-6xl" whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>{emoji}</motion.div>
              <div className="flex-1">
                <p className="text-xs font-medium tracking-widest uppercase text-sunlight-400/70 mb-2">{dateRange}</p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white/90 group-hover:text-sunlight-300 transition-colors duration-300 mb-3">{name}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-xl">{description}</p>
                <div className="flex items-center gap-6 text-sm text-white/40">
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{postCount} posts</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{tripSlug === "west-coast-2016" ? "MN > CO > UT > NV > AZ > CA" : "MN > TX > FL > NY > Canada"}</span>
                </div>
              </div>
              <motion.div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 group-hover:bg-sunlight-400/10 group-hover:border-sunlight-400/20 transition-all duration-300" whileHover={{ x: 5 }}>
                <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-sunlight-400 transition-colors" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
