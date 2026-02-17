"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Camera } from "lucide-react";
import { formatShortDate, extractFirstImage, getCategoryLabel } from "@/lib/utils";

interface PostCardProps { slug: string; title: string; date: string; excerpt: string; images: string[]; wordCount: number; readingTime: number; category: string; index?: number; }

export default function PostCard({ slug, title, date, excerpt, images, readingTime, category, index = 0 }: PostCardProps) {
  const coverImage = extractFirstImage(images);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}>
      <Link href={`/posts/${slug}`} className="block group">
        <div className="glass-card overflow-hidden">
          {coverImage && (
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <img src={coverImage} alt={title} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-jungle-900/80 via-jungle-900/20 to-transparent" />
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 text-xs">
                  <Camera className="w-3 h-3" /><span>{images.length}</span>
                </div>
              )}
            </div>
          )}
          <div className="p-5">
            <div className="mb-3">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase bg-jungle-600/20 text-jungle-400 border border-jungle-600/20">
                {getCategoryLabel(category)}
              </span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-white/90 group-hover:text-sunlight-400 transition-colors duration-300 mb-2 line-clamp-2">{title}</h3>
            {excerpt && <p className="text-sm text-white/50 line-clamp-2 mb-4 leading-relaxed">{excerpt}</p>}
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatShortDate(date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
