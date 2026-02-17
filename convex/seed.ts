import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedPost = mutation({
  args: {
    wpId: v.string(),
    title: v.string(),
    slug: v.string(),
    date: v.string(),
    content: v.string(),
    excerpt: v.string(),
    category: v.string(),
    categorySlug: v.string(),
    images: v.array(v.string()),
    wordCount: v.number(),
    readingTime: v.number(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if already exists
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) return existing._id;
    return await ctx.db.insert("posts", args);
  },
});

export const seedCategory = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    postCount: v.number(),
    coverImage: v.optional(v.string()),
    dateRange: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) return existing._id;
    return await ctx.db.insert("categories", args);
  },
});

export const clearAll = mutation({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    for (const p of posts) {
      await ctx.db.delete(p._id);
    }
    const cats = await ctx.db.query("categories").collect();
    for (const c of cats) {
      await ctx.db.delete(c._id);
    }
  },
});
