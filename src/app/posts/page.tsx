"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PostCard from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/LoadingState";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "West Coast \'16", value: "2016 West Coast Road Trip" },
  { label: "East Coast \'19", value: "2019 East Coast Road Trip" },
  { label: "Other", value: "Uncategorized" },
];

export default function AllPostsPage() {
  const posts = useQuery(api.posts.getAll);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    let filtered = [...posts];
    if (selectedCategory !== "all") filtered = filtered.filter((p) => p.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return filtered;
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-jungle-400/60" />
            <h1 className="font-serif text-4xl md:text-5xl sunbeam-text">All Posts</h1>
          </div>
          <p className="text-white/40 max-w-lg mx-auto">Every story from the road.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 glass-input" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat.value} onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedCategory === cat.value ? "bg-jungle-600/30 text-jungle-300 border border-jungle-600/30" : "bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 hover:text-white/60"}`}>{cat.label}</button>
            ))}
          </div>
        </motion.div>
        {posts && <p className="text-sm text-white/30 mb-6 text-center">{filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}{searchQuery && ` matching "${searchQuery}"`}</p>}
        {!posts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(12)].map((_, i) => (<PostCardSkeleton key={i} />))}</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No posts found.</p>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} className="mt-4 text-sm text-jungle-400 hover:text-jungle-300 transition-colors">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <PostCard key={post._id} slug={post.slug} title={post.title} date={post.date} excerpt={post.excerpt} images={post.images} wordCount={post.wordCount} readingTime={post.readingTime} category={post.category} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
