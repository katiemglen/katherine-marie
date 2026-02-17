"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PostCard } from "@/components/PostCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MapPin, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";

export default function TripPage() {
  const params = useParams();
  const tripSlug = params.tripSlug as string;
  const category = useQuery(api.categories.getBySlug, { slug: tripSlug });
  const posts = useQuery(api.posts.getByCategorySlug, { categorySlug: tripSlug });

  if (category === undefined || posts === undefined) return <LoadingSpinner />;
  if (!category) {
    return (<div className="pt-24 text-center"><h1 className="font-serif text-3xl text-white">Trip not found</h1><Link href="/" className="text-jungle-400 hover:underline mt-4 inline-block">Go home</Link></div>);
  }

  const sortedPosts = [...(posts || [])].sort((a, b) => a.sortOrder - b.sortOrder);
  const coverImage = category.coverImage || (sortedPosts[0] && sortedPosts[0].images[0]);

  return (
    <div className="pt-16">
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        {coverImage && (<div className="absolute inset-0"><img src={coverImage} alt={category.name} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/50 to-[#0a0f0d]/20" /></div>)}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-golden-300/80 mb-3">
              <MapPin className="w-4 h-4" />
              {category.dateRange && <span className="flex items-center gap-1 text-sm"><Calendar className="w-3.5 h-3.5" />{category.dateRange}</span>}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3">{category.name}</h1>
            <p className="text-lg text-slate-300/80 max-w-2xl mb-4">{category.description}</p>
            <div className="flex items-center gap-1.5 text-jungle-400"><BookOpen className="w-4 h-4" /><span className="text-sm">{category.postCount} stories</span></div>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post, i) => (<PostCard key={post._id} title={post.title} slug={post.slug} date={post.date} excerpt={post.excerpt} images={post.images} readingTime={post.readingTime} category={post.category} index={i} />))}
        </div>
      </section>
    </div>
  );
}
