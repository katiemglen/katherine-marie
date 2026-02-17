export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const TRIP_SLUG_MAP: Record<string, string> = {
  "west-coast-2016": "2016-west-coast-road-trip",
  "east-coast-2019": "2019-east-coast-road-trip",
};
const REVERSE_TRIP_SLUG_MAP: Record<string, string> = {
  "2016-west-coast-road-trip": "west-coast-2016",
  "2019-east-coast-road-trip": "east-coast-2019",
};

export function tripSlugToCategorySlug(s: string): string | null { return TRIP_SLUG_MAP[s] || null; }
export function categorySlugToTripSlug(s: string): string | null { return REVERSE_TRIP_SLUG_MAP[s] || null; }

export function getTripInfo(tripSlug: string) {
  const trips: Record<string, { name: string; description: string; dateRange: string; emoji: string; categorySlug: string }> = {
    "west-coast-2016": {
      name: "2016 West Coast Road Trip",
      description: "Three weeks on the road from Minnesota to Colorado, Utah, Las Vegas, Arizona, California, and back.",
      dateRange: "December 2016 \u2013 January 2017",
      emoji: "\ud83c\udf05",
      categorySlug: "2016-west-coast-road-trip",
    },
    "east-coast-2019": {
      name: "2019 East Coast Road Trip",
      description: "An epic journey across the American South, up the East Coast, through Canada, and back home.",
      dateRange: "March \u2013 May 2019",
      emoji: "\ud83d\uddfd",
      categorySlug: "2019-east-coast-road-trip",
    },
  };
  return trips[tripSlug] || null;
}

export function cleanContent(html: string): string {
  let cleaned = html;
  cleaned = cleaned.replace(/<!-- \/?wp:[^>]*-->/g, "");
  cleaned = cleaned.replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/g, (_, inner) => {
    const imgMatch = inner.match(/<img[^>]+>/);
    const captionText = inner.replace(/<img[^>]+>/, "").trim();
    if (imgMatch) return "<figure>" + imgMatch[0] + "<figcaption>" + captionText + "</figcaption></figure>";
    return inner;
  });
  cleaned = cleaned.replace(/\[gallery[^\]]*\]/g, "");
  cleaned = cleaned.replace(/<p>\s*&nbsp;\s*<\/p>/g, "");
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, "");
  cleaned = cleaned.replace(/class="[^"]*aligncenter[^"]*"/g, 'style="display:block;margin:1rem auto;max-width:100%"');
  cleaned = cleaned.replace(/class="[^"]*alignleft[^"]*"/g, 'style="float:left;margin:0.5rem 1rem 0.5rem 0;max-width:50%"');
  cleaned = cleaned.replace(/class="[^"]*alignright[^"]*"/g, 'style="float:right;margin:0.5rem 0 0.5rem 1rem;max-width:50%"');
  cleaned = cleaned.replace(/class="[^"]*alignnone[^"]*"/g, 'style="max-width:100%"');
  cleaned = cleaned.replace(/ width="[^"]*"/g, "");
  cleaned = cleaned.replace(/ height="[^"]*"/g, "");
  return cleaned;
}

export function extractFirstImage(images: string[]): string | null {
  if (images.length === 0) return null;
  const photo = images.find((url) => !url.endsWith(".gif") && !url.includes("map"));
  return photo || images[0];
}

export function getCategoryLabel(category: string): string {
  if (category === "2016 West Coast Road Trip") return "West Coast \'16";
  if (category === "2019 East Coast Road Trip") return "East Coast \'19";
  return category;
}
