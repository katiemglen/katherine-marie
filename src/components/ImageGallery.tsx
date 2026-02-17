"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Camera, Grid3X3, ChevronUp } from "lucide-react";
import Lightbox from "./Lightbox";

interface ImageGalleryProps { images: string[]; title?: string; }

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const galleryImages = useMemo(() => {
    const seen = new Set<string>();
    return images.filter((url) => { if (seen.has(url)) return false; seen.add(url); return true; });
  }, [images]);

  if (galleryImages.length === 0) return null;
  const INITIAL_SHOW = 12;
  const displayImages = showAll ? galleryImages : galleryImages.slice(0, INITIAL_SHOW);
  const hasMore = galleryImages.length > INITIAL_SHOW;

  const openLightbox = (index: number) => {
    const realIndex = showAll ? index : galleryImages.indexOf(displayImages[index]);
    setLightboxIndex(realIndex); setLightboxOpen(true);
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-jungle-600/20 border border-jungle-600/20">
          <Camera className="w-5 h-5 text-jungle-400" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-white/90">{title || "Photo Gallery"}</h3>
          <p className="text-sm text-white/40">{galleryImages.length} photo{galleryImages.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {displayImages.map((url, i) => (
          <motion.button key={url} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.3) }}
            onClick={() => openLightbox(i)} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
            <img src={url} alt={`Photo ${i + 1}`} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm"><Grid3X3 className="w-4 h-4 text-white" /></div>
            </div>
          </motion.button>
        ))}
        {!showAll && hasMore && (
          <motion.button initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            onClick={() => setShowAll(true)} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer">
            <img src={galleryImages[INITIAL_SHOW]} alt="" loading="lazy" className="w-full h-full object-cover blur-sm" />
            <div className="absolute inset-0 bg-jungle-900/70 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white/90">+{galleryImages.length - INITIAL_SHOW}</span>
              <span className="text-xs text-white/60 mt-1">more photos</span>
            </div>
          </motion.button>
        )}
      </div>
      {showAll && hasMore && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowAll(false)}
          className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-white/60 hover:text-white/80 transition-colors">
          <ChevronUp className="w-4 h-4" />Show fewer photos
        </motion.button>
      )}
      <Lightbox images={galleryImages} currentIndex={lightboxIndex} isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)} onNavigate={setLightboxIndex} />
    </div>
  );
}
