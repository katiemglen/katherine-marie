"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from "framer-motion";
import { TripCard } from "@/components/TripCard";
import { PostCard } from "@/components/PostCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MapPin, Sparkles } from "lucide-react";

export default function HomePage() {
  const categories = useQuery(api.categories.getAll);
  const recentPosts = useQuery(api.posts.getRecent, { limit: 6 });

  if (!categories || !recentPosts) return <LoadingSpinner />;

  const tripCategories = categories.filter(
    (c) => c.slug !== "uncategorized"
  );

  return (
    <div className="pt-16">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://katherinemariedotcom.wordpress.com/wp-content/uploads/2016/12/20161219_145937.jpg"
            alt="Mountain landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/70 via-[#0a0f0d]/50 to-[#0a0f0d]" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-jungle-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-48 h-48 bg-mystic-purple/10 rounded-full blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-jungle-400" />
              <MapPin className="w-5 h-5 text-golden-400" />
              <span className="text-sm uppercase tracking-widest text-golden-300/80">
                Travel Stories
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-jungle-400" />
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-jungle-200 to-golden-200 bg-clip-text text-transparent">
                Katherine Marie
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Two road trips. Thousands of miles. Countless adventures.
              Follow Katie &amp; Chad across America.
            </p>

            <motion.div
              className="flex items-center justify-center gap-2 text-jungle-400/60"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            The Journeys
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Two epic road trips that changed everything. Pick a journey and ride along.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {tripCategories.map((cat, i) => (
            <TripCard
              key={cat._id}
              name={cat.name}
              slug={cat.slug}
              description={cat.description}
              postCount={cat.postCount}
              coverImage={cat.coverImage}
              dateRange={cat.dateRange}
              index={i}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Latest Stories
          </h2>
          <p className="text-slate-400">
            The most recent tales from the road.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <PostCard
              key={post._id}
              title={post.title}
              slug={post.slug}
              date={post.date}
              excerpt={post.excerpt}
              images={post.images}
              readingTime={post.readingTime}
              category={post.category}
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
