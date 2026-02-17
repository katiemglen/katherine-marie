"use client";

import { useMemo, useState } from "react";
import { cleanContent } from "@/lib/utils";
import Lightbox from "./Lightbox";

interface PostContentProps { content: string; images: string[]; }

export default function PostContent({ content, images }: PostContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const processedContent = useMemo(() => cleanContent(content), [content]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const src = target.getAttribute("src");
      if (src) {
        const index = images.indexOf(src);
        if (index !== -1) { setLightboxIndex(index); setLightboxOpen(true); }
        else { window.open(src, "_blank"); }
      }
    }
  };

  return (
    <>
      <div className="post-content" onClick={handleClick} dangerouslySetInnerHTML={{ __html: processedContent }} />
      <Lightbox images={images} currentIndex={lightboxIndex} isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)} onNavigate={setLightboxIndex} />
    </>
  );
}
