"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import PostCard from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/LoadingState";
import { getTripInfo } from "@/lib/utils";
import { motion } from "framer-motion";
import { MapPin, Calendar, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TripPage() {
  const params = useParams();
  const tripSlug = params.tripSlug as string;
  const tripInfo = getTripInfo(tripSlug);
  const categorySlug = tripInfo?.categorySlug;
  const posts = useQuery(api.posts.getByCategorySlug, categorySlug ? { categorySlug } : "skip");

  if (!tripInfo) {
    return (<div className="min-h-screen flex items-center justify-center pt-20"><div className="text-center"><h1 className="font-serif text-3xl text-white/80 mb-4">Trip Not Found</h1><Link href="/" className="text-jungle-400 hover:text-jungle-300">Back home</Link></div></div>);
  }

  const totalWords = posts?.reduce((acc, p) => acc + p.wordCount, 0) ?? 0;
  const totalImages = posts?.reduce((acc, p) => acc + p.images.length, 0) ?? 0;
  const westStates = ["Minnesota","Iowa","Nebraska","Colorado","Utah","Nevada","Arizona","California"];
  const eastStates = ["Minnesota","Missouri","Oklahoma","Texas","Louisiana","Florida","Georgia","S. Carolina","N. Carolina","Virginia","D.C.","Pennsylvania","New York","Massachusetts","Maine","Nova Scotia","Quebec","Ontario","Illinois"];
  const states = tripSlug === "west-coast-2016" ? westStates : eastStates;

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-jungle-400/[0.04] blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity }} />
          <motion.div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-sunlight-400/[0.03] blur-3xl" animate={{ scale: [1.1, 0.95, 1.1] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"><ArrowLeft className="w-4 h-4" />Back home</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl mb-6">{tripInfo.emoji}</motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm tracking-[0.3em] uppercase text-sunlight-400/70 mb-4">{tripInfo.dateRange}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold sunbeam-text mb-6">{tripInfo.name}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">{tripInfo.description}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-8 text-sm text-white/40">
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{posts?.length ?? "..."} posts</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{totalImages.toLocaleString()} photos</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{Math.ceil(totalWords / 200)} min total read</span>
          </motion.div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-6 md:p-8">
          <h3 className="font-serif text-lg text-white/70 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-jungle-400" />Route Overview</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {states.map((state, i, arr) => (<span key={state} className="flex items-center gap-2"><span className="px-3 py-1 rounded-full text-xs bg-jungle-600/20 text-jungle-300 border border-jungle-600/20 whitespace-nowrap">{state}</span>{i < arr.length - 1 && <span className="text-white/20 text-xs">&rarr;</span>}</span>))}
          </div>
        </motion.div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="font-serif text-2xl text-white/70 mb-8">The Journey, Day by Day</h2>
        {!posts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(9)].map((_, i) => (<PostCardSkeleton key={i} />))}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (<PostCard key={post._id} slug={post.slug} title={post.title} date={post.date} excerpt={post.excerpt} images={post.images} wordCount={post.wordCount} readingTime={post.readingTime} category={post.category} index={i} />))}
          </div>
        )}
      </section>
    </div>
  );
}
