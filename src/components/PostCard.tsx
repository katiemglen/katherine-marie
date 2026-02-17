"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface PostCardProps {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  images: string[];
  readingTime: number;
  category: string;
  index?: number;
}

export function PostCard({
  title,
  slug,
  date,
  excerpt,
  images,
  readingTime,
  category,
  index = 0,
}: PostCardProps) {
  const coverImage = images[0];
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const cleanExcerpt = excerpt
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .slice(0, 160);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/posts/${slug}`} className="block group">
        <div className="glass-card overflow-hidden">
          {coverImage && (
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-jungle-900/80 backdrop-blur text-jungle-300 rounded-full border border-jungle-700/30">
                {category}
              </span>
            </div>
          )}

          <div className="p-5">
            <h3 className="font-serif text-lg font-semibold text-slate-100 group-hover:text-jungle-300 transition-colors line-clamp-2 mb-2">
              {title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} min read
              </span>
            </div>

            {cleanExcerpt && (
              <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                {cleanExcerpt}...
              </p>
            )}

            <span className="inline-flex items-center gap-1 text-sm text-jungle-400 group-hover:text-jungle-300 transition-colors">
              Read more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
