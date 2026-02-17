# Katherine Marie Travel Blog - Deployment Notes

## Live URLs
- **Production:** https://katherine-marie.com
- **Alt:** https://www.katherine-marie.com
- **Vercel:** https://katherine-marie.vercel.app

## Architecture
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend:** Convex (real-time database)
- **Hosting:** Vercel (katiemglens-projects team)
- **Code:** GitHub (katiemglen/katherine-marie)

## Image Strategy: Option B — WordPress URLs
Images reference the original WordPress.com URLs (still live):
- `https://katherinemariedotcom.wordpress.com/wp-content/uploads/...`
- Total images: 2,584 across 73 posts (12.25 GB locally)
- **Why:** Vercel free tier cannot host 12.25 GB of static assets
- **Migration path:** When ready, can move to Cloudinary or Vercel Blob Storage

## Convex Deployments
- **Dev:** original-capybara-869 (for local development)
- **Prod:** disciplined-viper-57 (used by Vercel)
- Both deployments seeded with all 73 posts

## Content
- 73 blog posts total
- 21 posts: 2016 West Coast Road Trip (Dec 2016 - Jan 2017)
- 51 posts: 2019 East Coast Road Trip (Mar - May 2019)
- 1 post: "A Fruit Shoot Blast" (Jul 2020)

## Design: Ethereal Jungle Theme
- Deep jungle greens with sunlight/amber highlights
- Glassmorphism cards with backdrop blur
- Framer Motion animations (scroll reveals, hover effects, floating particles)
- Custom SVG leaf decorations
- Fully responsive (mobile-first)
