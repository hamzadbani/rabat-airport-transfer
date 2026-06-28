# SEO + GEO Architecture (Laravel Blade)

Production SEO for **https://taxirabatairoport.com/** — Laravel Blade + JSON content.

## Folder layout

| Path | Role |
|------|------|
| `backend/data/seo-pages.json` | 56+ programmatic FR landing pages (copy, related links) |
| `backend/data/blog-posts.json` | Blog articles |
| `backend/app/Support/SeoData.php` | Loads JSON, exposes slugs for routes + sitemap |
| `backend/resources/views/seo/` | SEO page Blade templates |
| `backend/resources/views/blog/` | Blog hub + article templates |
| `backend/routes/web.php` | Home, hubs, blog, sitemap, SEO catch-all |
| `backend/app/Http/Controllers/SitemapController.php` | `/sitemap.xml` |

## Add a new SEO page

1. Add an entry to `backend/data/seo-pages.json` (`id`, `copy`, `related`)
2. Ensure the slug matches the page `id` (used in `/{slug}` route)
3. Clear config/cache if cached in production
4. Sitemap updates automatically from `SeoData::slugs()`

## Deploy

- CI builds Laravel assets and deploys `backend/` (see `.github/workflows/deploy-laravel-hostinger.yml`)
- Web root on Hostinger: `backend/public/`
- Set `APP_URL=https://taxirabatairoport.com` in production `.env`
