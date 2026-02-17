"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { PostCard } from "@/components/PostCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Archive, Filter } from "lucide-react";

export default function ArchivePage() {
  const allPosts = useQuery(api.posts.getAll);
  const categories = useQuery(api.categories.getAll);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  if (!allPosts || !categories) return <LoadingSpinner />;

  const filteredPosts = activeFilter === "all"
    ? allPosts
    : allPosts.filter((p) => p.categorySlug === activeFilter);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Archive className="w-6 h-6 text-jungle-400" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3">Archive</h1>
          <p className="text-slate-400 max-w-lg mx-auto">All {allPosts.length} stories, from the very first mile to the last.</p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          <button onClick={() => setActiveFilter("all")} className={`px-4 py-2 rounded-full text-sm transition-all ${activeFilter === "all" ? "bg-jungle-600 text-white" : "glass-card text-slate-300 hover:text-jungle-300"}`}>
            All ({allPosts.length})
          </button>
          {categories.map((cat) => (
            <button key={cat._id} onClick={() => setActiveFilter(cat.slug)} className={`px-4 py-2 rounded-full text-sm transition-all ${activeFilter === cat.slug ? "bg-jungle-600 text-white" : "glass-card text-slate-300 hover:text-jungle-300"}`}>
              {cat.name} ({cat.postCount})
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <PostCard key={post._id} title={post.title} slug={post.slug} date={post.date} excerpt={post.excerpt} images={post.images} readingTime={post.readingTime} category={post.category} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
