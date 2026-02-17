import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_sortOrder")
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getByCategorySlug = query({
  args: { categorySlug: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_categorySlug", (q) =>
        q.eq("categorySlug", args.categorySlug)
      )
      .collect();
    return posts.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_sortOrder")
      .collect();
    return posts.reverse().slice(0, limit);
  },
});

export const getAdjacentPosts = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const currentPost = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!currentPost) return { prev: null, next: null };

    const categoryPosts = await ctx.db
      .query("posts")
      .withIndex("by_categorySlug", (q) =>
        q.eq("categorySlug", currentPost.categorySlug)
      )
      .collect();

    categoryPosts.sort((a, b) => a.sortOrder - b.sortOrder);

    const currentIndex = categoryPosts.findIndex(
      (p) => p.slug === args.slug
    );

    return {
      prev:
        currentIndex > 0
          ? {
              slug: categoryPosts[currentIndex - 1].slug,
              title: categoryPosts[currentIndex - 1].title,
            }
          : null,
      next:
        currentIndex < categoryPosts.length - 1
          ? {
              slug: categoryPosts[currentIndex + 1].slug,
              title: categoryPosts[currentIndex + 1].title,
            }
          : null,
    };
  },
});

export const search = query({
  args: { searchQuery: v.string() },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("posts").collect();
    const q = args.searchQuery.toLowerCase();
    if (!q) return all.sort((a, b) => a.sortOrder - b.sortOrder);
    return all
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },
});
