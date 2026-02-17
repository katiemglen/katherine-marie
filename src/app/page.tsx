"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";
import PostCard from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/LoadingState";
import { getTripInfo } from "@/lib/utils";
import { motion } from "framer-motion";
import { Compass, BookOpen } from "lucide-react";

export default function HomePage() {
  const recentPosts = useQuery(api.posts.getRecent, { limit: 6 });
  const westCoastPosts = useQuery(api.posts.getByCategorySlug, { categorySlug: "2016-west-coast-road-trip" });
  const eastCoastPosts = useQuery(api.posts.getByCategorySlug, { categorySlug: "2019-east-coast-road-trip" });
  const westInfo = getTripInfo("west-coast-2016")!;
  const eastInfo = getTripInfo("east-coast-2019")!;
  const westCover = westCoastPosts && westCoastPosts.length > 0 ? westCoastPosts[Math.floor(westCoastPosts.length / 3)]?.images[0] : undefined;
  const eastCover = eastCoastPosts && eastCoastPosts.length > 0 ? eastCoastPosts[Math.floor(eastCoastPosts.length / 3)]?.images[0] : undefined;

  return (
    <>
      <Hero />
      <section id="trips" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-6 h-6 text-sunlight-400/60" />
            <h2 className="font-serif text-3xl md:text-4xl sunbeam-text">The Road Trips</h2>
          </div>
          <p className="text-white/40 max-w-lg mx-auto">Two epic adventures across America.</p>
        </motion.div>
        <div className="space-y-6">
          <TripCard tripSlug="west-coast-2016" name={westInfo.name} description={westInfo.description} dateRange={westInfo.dateRange} emoji={westInfo.emoji} postCount={westCoastPosts?.length ?? 21} coverImage={westCover} index={0} />
          <TripCard tripSlug="east-coast-2019" name={eastInfo.name} description={eastInfo.description} dateRange={eastInfo.dateRange} emoji={eastInfo.emoji} postCount={eastCoastPosts?.length ?? 52} coverImage={eastCover} index={1} />
        </div>
      </section>
      <section id="recent" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-jungle-400/60" />
            <h2 className="font-serif text-3xl md:text-4xl jungle-text">Latest Stories</h2>
          </div>
          <p className="text-white/40 max-w-lg mx-auto">The most recent entries from the road.</p>
        </motion.div>
        {!recentPosts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (<PostCardSkeleton key={i} />))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, i) => (
              <PostCard key={post._id} slug={post.slug} title={post.title} date={post.date} excerpt={post.excerpt} images={post.images} wordCount={post.wordCount} readingTime={post.readingTime} category={post.category} index={i} />
            ))}
          </div>
        )}
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card p-8 md:p-12 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-8 text-white/80">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ label: "Blog Posts", value: "73" }, { label: "Road Trips", value: "2" }, { label: "Photos", value: "2,500+" }, { label: "States Visited", value: "30+" }].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl md:text-4xl font-serif font-bold sunbeam-text">{stat.value}</p>
                <p className="text-sm text-white/40 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
