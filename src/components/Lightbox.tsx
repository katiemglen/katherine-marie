"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface LightboxProps { images: string[]; currentIndex: number; isOpen: boolean; onClose: () => void; onNavigate: (index: number) => void; }

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const handlePrev = useCallback(() => { if (currentIndex > 0) onNavigate(currentIndex - 1); }, [currentIndex, onNavigate]);
  const handleNext = useCallback(() => { if (currentIndex < images.length - 1) onNavigate(currentIndex + 1); }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = ""; };
  }, [isOpen, onClose, handlePrev, handleNext]);

  useEffect(() => { setIsLoading(true); }, [currentIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
          <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
            <span className="text-white/50 text-sm font-mono">{currentIndex + 1} / {images.length}</span>
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          {currentIndex > 0 && (
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
          <motion.div key={currentIndex} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {isLoading && <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-8 h-8 text-white/50 animate-spin" /></div>}
            <img src={images[currentIndex]} alt={`Photo ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg" onLoad={() => setIsLoading(false)} draggable={false} />
          </motion.div>
          {images.length > 1 && images.length <= 30 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto py-2 px-4">
              {images.map((img, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
                  className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${i === currentIndex ? "border-sunlight-400 opacity-100" : "border-transparent opacity-40 hover:opacity-70"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
