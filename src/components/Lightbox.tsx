"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }: LightboxProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lightbox-overlay" onClick={onClose}>
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/40 rounded-full backdrop-blur transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="absolute top-4 left-4 z-10 px-3 py-1 text-sm text-white/80 bg-black/40 rounded-full backdrop-blur">
            {currentIndex + 1} / {images.length}
          </div>
          {currentIndex > 0 && (
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/80 hover:text-white bg-black/40 rounded-full backdrop-blur transition-colors">
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/80 hover:text-white bg-black/40 rounded-full backdrop-blur transition-colors">
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
          <motion.img key={currentIndex} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} src={images[currentIndex]} alt={"Image " + (currentIndex + 1)} className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
