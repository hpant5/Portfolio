# himanshupant.dev

Personal portfolio — built with Next.js 14.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click Deploy (zero config needed)

## Connect Namecheap Domain

After deploying on Vercel:

1. In Vercel dashboard → Your project → Settings → Domains
2. Add `himanshupant.dev`
3. Vercel will show you DNS records to add
4. In Namecheap → Domain List → Manage → Advanced DNS
5. Remove any existing A/CNAME records for `@` and `www`
6. Add the records Vercel gives you (typically):
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
7. Wait 5-30 minutes for DNS propagation
8. Back in Vercel, click "Refresh" — it should verify and auto-enable HTTPS

## Project Structure

```
src/
  app/
    layout.js      → Root layout + SEO metadata
    page.js        → Main portfolio page
    globals.css    → All styles
  components/
    Gallery.js     → Image gallery with arrows
    Reveal.js      → Scroll-triggered animations
public/
  images/          → Project screenshots (WebP)
```
