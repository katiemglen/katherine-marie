"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, BookOpen, Calendar } from "lucide-react";

interface TripCardProps {
  name: string;
  slug: string;
  description: string;
  postCount: number;
  coverImage?: string;
  dateRange?: string;
  index?: number;
}

export function TripCard({
  name,
  slug,
  description,
  postCount,
  coverImage,
  dateRange,
  index = 0,
}: TripCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Link href={`/trips/${slug}`} className="block group">
        <div className="glass-card overflow-hidden relative">
          {coverImage && (
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={coverImage}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/40 to-transparent" />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-golden-400" />
              {dateRange && (
                <span className="flex items-center gap-1 text-xs text-golden-300/80">
                  <Calendar className="w-3 h-3" />
                  {dateRange}
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl font-bold text-white group-hover:text-jungle-300 transition-colors mb-2">
              {name}
            </h3>

            <p className="text-sm text-slate-300/80 line-clamp-2 mb-3">
              {description}
            </p>

            <div className="flex items-center gap-1.5 text-sm text-jungle-400">
              <BookOpen className="w-4 h-4" />
              {postCount} {postCount === 1 ? "story" : "stories"}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
