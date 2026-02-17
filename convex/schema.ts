import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
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
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_categorySlug", ["categorySlug"])
    .index("by_date", ["date"])
    .index("by_sortOrder", ["sortOrder"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    postCount: v.number(),
    coverImage: v.optional(v.string()),
    dateRange: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  siteConfig: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
});
