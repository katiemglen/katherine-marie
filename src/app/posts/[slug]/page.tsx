"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import Link from "next/link";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Lightbox } from "@/components/Lightbox";
import { Calendar, Clock, ArrowLeft, ArrowRight, Camera, ChevronLeft, Tag } from "lucide-react";

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = useQuery(api.posts.getBySlug, { slug });
  const adjacent = useQuery(api.posts.getAdjacentPosts, { slug });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => { setLightboxIndex(index); setLightboxOpen(true); }, []);

  const processedContent = useMemo(() => {
    if (!post) return null;
    const images = post.images;
    let imageCounter = 0;
    return parse(post.content, {
      replace: (domNode: any) => {
        if (domNode.name === "img" && domNode.attribs?.src) {
          const src = domNode.attribs.src;
          const imgIndex = images.indexOf(src);
          const clickIndex = imgIndex >= 0 ? imgIndex : imageCounter;
          imageCounter++;
          return (<img src={src} alt={domNode.attribs.alt || ""} className="w-full h-auto rounded-xl my-6 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(34,197,94,0.2)]" loading="lazy" onClick={() => openLightbox(clickIndex)} />);
        }
        if (domNode.type === "text" && typeof domNode.data === "string" && domNode.data.match(/\[gallery[^\]]*\]/)) { return <></>; }
      },
    });
  }, [post, openLightbox]);

  if (post === undefined) return <LoadingSpinner />;
  if (!post) { return (<div className="pt-24 text-center"><h1 className="font-serif text-3xl text-white">Post not found</h1><Link href="/" className="text-jungle-400 hover:underline mt-4 inline-block">Go home</Link></div>); }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const coverImage = post.images[0];

  return (
    <div className="pt-16">
      {coverImage && (<section className="relative h-[45vh] min-h-[350px] overflow-hidden"><img src={coverImage} alt={post.title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/40 to-[#0a0f0d]/20" /></section>)}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href={`/trips/${post.categorySlug}`} className="inline-flex items-center gap-1.5 text-sm text-jungle-400 hover:text-jungle-300 transition-colors mb-6"><ChevronLeft className="w-4 h-4" />Back to {post.category}</Link>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formattedDate}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readingTime} min read</span>
            <span className="flex items-center gap-1.5"><Camera className="w-4 h-4" />{post.images.length} photos</span>
            <Link href={`/trips/${post.categorySlug}`} className="flex items-center gap-1.5 text-jungle-400 hover:text-jungle-300 transition-colors"><Tag className="w-4 h-4" />{post.category}</Link>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">{post.title}</h1>
          {post.images.length > 1 && (<div className="flex gap-2 overflow-x-auto pb-4 mb-8">{post.images.map((img, i) => (<button key={i} onClick={() => openLightbox(i)} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-jungle-400 transition-colors"><img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" /></button>))}</div>)}
          <div className="blog-content glass-card p-6 sm:p-8 md:p-10">{processedContent}</div>
          <div className="flex justify-between items-center mt-12 gap-4">
            {adjacent?.prev ? (<Link href={`/posts/${adjacent.prev.slug}`} className="glass-card p-4 flex items-center gap-3 group flex-1 max-w-[45%]"><ArrowLeft className="w-5 h-5 text-jungle-400 flex-shrink-0 group-hover:-translate-x-1 transition-transform" /><div className="min-w-0"><span className="text-xs text-slate-500">Previous</span><p className="text-sm text-slate-300 group-hover:text-jungle-300 transition-colors truncate">{adjacent.prev.title}</p></div></Link>) : <div />}
            {adjacent?.next ? (<Link href={`/posts/${adjacent.next.slug}`} className="glass-card p-4 flex items-center gap-3 group flex-1 max-w-[45%] text-right"><div className="min-w-0 flex-1"><span className="text-xs text-slate-500">Next</span><p className="text-sm text-slate-300 group-hover:text-jungle-300 transition-colors truncate">{adjacent.next.title}</p></div><ArrowRight className="w-5 h-5 text-jungle-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" /></Link>) : <div />}
          </div>
        </motion.div>
      </article>
      <Lightbox images={post.images} currentIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))} onNext={() => setLightboxIndex((i) => Math.min(post.images.length - 1, i + 1))} />
    </div>
  );
}
