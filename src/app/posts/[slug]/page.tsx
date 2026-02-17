"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import PostContent from "@/components/PostContent";
import ImageGallery from "@/components/ImageGallery";
import { PageLoading } from "@/components/LoadingState";
import { formatDate, categorySlugToTripSlug, getTripInfo, getCategoryLabel } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, ChevronLeft, Camera } from "lucide-react";
import Link from "next/link";

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = useQuery(api.posts.getBySlug, { slug });
  const adjacent = useQuery(api.posts.getAdjacentPosts, { slug });

  if (post === undefined) return <PageLoading />;
  if (post === null) {
    return (<div className="min-h-screen flex items-center justify-center pt-20"><div className="text-center"><h1 className="font-serif text-3xl text-white/80 mb-4">Post Not Found</h1><Link href="/posts" className="text-jungle-400 hover:text-jungle-300">All posts</Link></div></div>);
  }

  const tripSlug = categorySlugToTripSlug(post.categorySlug);
  const tripInfo = tripSlug ? getTripInfo(tripSlug) : null;
  const coverImage = post.images.find((url) => !url.endsWith(".gif") && !url.includes("map"));

  return (
    <article className="min-h-screen">
      <div className="relative">
        {coverImage && (
          <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
            <img src={coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jungle-900 via-jungle-900/60 to-jungle-900/30" />
          </div>
        )}
        <div className={`relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${coverImage ? "-mt-32 pb-8" : "pt-28 pb-8"}`}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            {tripInfo && tripSlug ? (
              <Link href={`/trips/${tripSlug}`} className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"><ChevronLeft className="w-4 h-4" />{tripInfo.emoji} {tripInfo.name}</Link>
            ) : (
              <Link href="/posts" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"><ChevronLeft className="w-4 h-4" />All Posts</Link>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-jungle-600/20 text-jungle-400 border border-jungle-600/20"><Tag className="w-3 h-3" />{getCategoryLabel(post.category)}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white/95 mb-6 leading-tight">{post.title}</motion.h1>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readingTime} min read</span>
            {post.images.length > 0 && <span className="flex items-center gap-1.5"><Camera className="w-4 h-4" />{post.images.length} photos</span>}
            <span className="text-white/20">{post.wordCount.toLocaleString()} words</span>
          </motion.div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card p-6 sm:p-8 md:p-10">
          <PostContent content={post.content} images={post.images} />
        </div>
        {post.images.length > 1 && <ImageGallery images={post.images} title="Photos from this post" />}
      </motion.div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          {adjacent?.prev ? (
            <Link href={`/posts/${adjacent.prev.slug}`} className="flex-1 glass-card p-5 group hover:border-jungle-400/20 transition-all">
              <div className="flex items-center gap-2 text-xs text-white/30 mb-2"><ArrowLeft className="w-3 h-3" />Previous</div>
              <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors font-medium line-clamp-2">{adjacent.prev.title}</p>
            </Link>
          ) : <div className="flex-1" />}
          {adjacent?.next ? (
            <Link href={`/posts/${adjacent.next.slug}`} className="flex-1 glass-card p-5 text-right group hover:border-jungle-400/20 transition-all">
              <div className="flex items-center justify-end gap-2 text-xs text-white/30 mb-2">Next<ArrowRight className="w-3 h-3" /></div>
              <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors font-medium line-clamp-2">{adjacent.next.title}</p>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </article>
  );
}
