import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as fs from "fs";
import * as path from "path";

const CONVEX_URL = process.env.CONVEX_URL!;
if (!CONVEX_URL) {
  console.error("Set CONVEX_URL env var");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface WPPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  status: string;
  type: string;
  categories: string[];
  images: string[];
  word_count: number;
}

async function main() {
  const postsPath = path.resolve(
    __dirname,
    "../../katherine-marie/posts.json"
  );
  const rawPosts: WPPost[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

  // Filter published posts only
  const published = rawPosts.filter(
    (p) => p.status === "publish" && p.type === "post"
  );

  console.log(`Found ${published.length} published posts`);

  // Sort by date
  published.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Seed categories first
  const categoryMap: Record<string, { count: number; images: string[]; dates: string[] }> = {};
  for (const p of published) {
    const cat = p.categories[0] || "Uncategorized";
    if (!categoryMap[cat]) {
      categoryMap[cat] = { count: 0, images: [], dates: [] };
    }
    categoryMap[cat].count++;
    categoryMap[cat].dates.push(p.date);
    if (p.images.length > 0) {
      categoryMap[cat].images.push(p.images[0]);
    }
  }

  const categoryDescriptions: Record<string, string> = {
    "2016 West Coast Road Trip":
      "A three-week adventure from Minnesota to Colorado, Arizona, California, and back. Katie and Chad explore mountains, deserts, and coastlines in their diesel Jetta.",
    "2019 East Coast Road Trip":
      "An epic journey along America's eastern seaboard — from the Great Smoky Mountains to the beaches of the Outer Banks, through historic cities and stunning landscapes.",
    Uncategorized: "Standalone adventures and stories.",
  };

  for (const [name, data] of Object.entries(categoryMap)) {
    const dates = data.dates.sort();
    const startYear = new Date(dates[0]).getFullYear();
    const endYear = new Date(dates[dates.length - 1]).getFullYear();
    const dateRange =
      startYear === endYear
        ? `${startYear}`
        : `${startYear} - ${endYear}`;

    await client.mutation(api.seed.seedCategory, {
      name,
      slug: slugify(name),
      description: categoryDescriptions[name] || "",
      postCount: data.count,
      coverImage: data.images[0] || undefined,
      dateRange,
    });
    console.log(`  Category: ${name} (${data.count} posts)`);
  }

  // Seed posts
  for (let i = 0; i < published.length; i++) {
    const p = published[i];
    const cat = p.categories[0] || "Uncategorized";
    const readingTime = Math.max(1, Math.ceil(p.word_count / 250));

    await client.mutation(api.seed.seedPost, {
      wpId: p.id,
      title: p.title,
      slug: p.slug,
      date: p.date,
      content: p.content,
      excerpt: p.excerpt || p.content.replace(/<[^>]*>/g, "").slice(0, 200),
      category: cat,
      categorySlug: slugify(cat),
      images: p.images,
      wordCount: p.word_count,
      readingTime,
      sortOrder: i,
    });

    console.log(`  [${i + 1}/${published.length}] ${p.title}`);
  }

  console.log("\nSeeding complete!");
}

main().catch(console.error);
