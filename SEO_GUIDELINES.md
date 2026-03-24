# SEO Guidelines & Best Practices
## Rabat Transfert Aéroport - SEO Implementation Reference

This document serves as a comprehensive guide for maintaining and improving SEO performance for the Rabat Transfert Aéroport website. Follow these guidelines when making any changes to ensure optimal search engine visibility.

---

## 📋 Table of Contents

1. [SEO Architecture](#seo-architecture)
2. [Meta Tags Management](#meta-tags-management)
3. [Structured Data (Schema.org)](#structured-data-schemaorg)
4. [Semantic HTML Requirements](#semantic-html-requirements)
5. [Image Optimization](#image-optimization)
6. [Content Guidelines](#content-guidelines)
7. [Language-Specific SEO](#language-specific-seo)
8. [Performance Optimization](#performance-optimization)
9. [Accessibility & SEO](#accessibility--seo)
10. [Testing & Validation](#testing--validation)
11. [Bot Protection & Crawler Access](#-bot-protection--crawler-access)
12. [Why Pages Aren’t Indexed](#-why-pages-arent-indexed)
13. [External factors & backlinks](#-external-factors--backlinks)

---

## 🏗️ SEO Architecture

### Current Implementation

- **SEO Component**: `src/components/SEO.tsx`
  - Dynamically updates meta tags based on language
  - Manages structured data (JSON-LD)
  - Updates document language attribute

- **Base Meta Tags**: `index.html`
  - Primary meta tags (title, description, keywords)
  - Open Graph tags
  - Twitter Card tags
  - Canonical URL

- **SEO Files**:
  - `public/robots.txt` - Search engine crawler instructions
  - `public/sitemap.xml` - XML sitemap for all pages

### File Structure

```
taxi-em/
├── index.html              # Base HTML with meta tags
├── public/
│   ├── robots.txt         # Crawler instructions
│   └── sitemap.xml        # Site structure
└── src/
    └── components/
        └── SEO.tsx        # Dynamic SEO management
```

---

## 🏷️ Meta Tags Management

### Required Meta Tags

Every page must include these essential meta tags:

#### Primary Meta Tags
```html
<meta name="title" content="[Page Title]" />
<meta name="description" content="[160-160 character description]" />
<meta name="keywords" content="[Relevant keywords, comma-separated]" />
<meta name="author" content="Rabat Transfert Aéroport" />
<meta name="robots" content="index, follow" />
```

#### Open Graph (Social Media)
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="http://em-taxi.com/" />
  <meta property="og:title" content="[Page Title]" />
  <meta property="og:description" content="[Description]" />
  <meta property="og:image" content="http://em-taxi.com/logo.png" />
<meta property="og:locale" content="fr_FR" />
```

#### Twitter Cards
```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="http://em-taxi.com/" />
  <meta property="twitter:title" content="[Page Title]" />
  <meta property="twitter:description" content="[Description]" />
  <meta property="twitter:image" content="http://em-taxi.com/logo.png" />
```

### Language-Specific Meta Tags

The SEO component automatically updates meta tags based on language. When adding new content:

1. **Update `src/components/SEO.tsx`**:
   - Add language-specific titles, descriptions, and keywords
   - Ensure all three languages (FR, EN, AR) are covered

2. **Best Practices**:
   - Keep titles under 60 characters
   - Keep descriptions between 150-160 characters
   - Use relevant, location-based keywords (e.g., "Maroc", "Morocco", "المغرب")
   - Include service keywords (e.g., "chauffeur privé", "transfert aéroport")

### Example: Adding New Page

```typescript
// In SEO.tsx, add to seoContent object:
const seoContent = {
  fr: {
    title: 'Rabat Transfert Aéroport - [Page Name] | Transport Premium au Maroc',
    description: '[French description - 150-160 chars]',
    keywords: 'taxi maroc, [additional keywords]',
  },
  en: {
    title: 'Rabat Transfert Aéroport - [Page Name] | Premium Transport in Morocco',
    description: '[English description - 150-160 chars]',
    keywords: 'taxi morocco, [additional keywords]',
  },
  ar: {
    title: 'EM تاكسي توريستيك - [Page Name] | النقل الفاخر في المغرب',
    description: '[Arabic description - 150-160 chars]',
    keywords: 'تاكسي المغرب, [additional keywords]',
  },
};
```

---

## 📊 Structured Data (Schema.org)

### Current Implementation

The site uses **LocalBusiness** schema with the following structure:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Rabat Transfert Aéroport",
  "telephone": "+212762728706",
  "email": "em.taxi.maroc@gmail.com",
  "address": { "@type": "PostalAddress", "addressCountry": "MA" },
  "openingHoursSpecification": { "opens": "00:00", "closes": "23:59" },
  "serviceType": ["Airport Transfer", "Private Chauffeur", ...],
  "hasOfferCatalog": { ... }
}
```

### Guidelines for Updates

1. **When Adding New Services**:
   - Add to `serviceType` array
   - Add to `hasOfferCatalog.itemListElement` if it's a pricing tier

2. **When Updating Business Info**:
   - Update contact information in structured data
   - Keep address and geo information accurate
   - Update aggregate rating if new reviews are added

3. **Validation**:
   - Always validate structured data using [Google's Rich Results Test](https://search.google.com/test/rich-results)
   - Ensure all required fields are present

### Additional Schema Types to Consider

- **Service**: For individual service pages
- **Review**: For customer testimonials
- **FAQPage**: If adding FAQ section
- **BreadcrumbList**: For navigation structure

---

## 🏛️ Semantic HTML Requirements

### Required Semantic Elements

All sections must use proper semantic HTML5 elements:

#### Section Structure
```html
<section id="section-id" aria-label="Descriptive label">
  <header>
    <h2>Section Title</h2>
    <p>Section subtitle/description</p>
  </header>
  <!-- Section content -->
</section>
```

#### Current Implementation
- ✅ Hero: `<section>` with proper heading hierarchy
- ✅ Services: `<section>` with `<header>`
- ✅ Pricing: `<section>` with `<header>`
- ✅ About: `<section>` with semantic structure
- ✅ Contact: `<section>` with `<header>`
- ✅ Footer: `<footer>` element

### Heading Hierarchy

Maintain proper heading hierarchy (H1 → H2 → H3):

```
H1: Main page title (Hero section only)
H2: Section titles (Services, Pricing, About, Contact)
H3: Subsection titles (Service cards, Pricing plans)
H4: Feature titles, card titles
```

**Rules**:
- Only ONE H1 per page (in Hero section)
- Never skip heading levels (H1 → H3 is wrong, use H1 → H2 → H3)
- Use headings for structure, not styling

### ARIA Labels

Add `aria-label` attributes for:
- Sections: `aria-label="Descriptive section name"`
- Buttons with icons only: `aria-label="Button purpose"`
- Images: Use descriptive `alt` text instead
- Navigation: `aria-label="Main navigation"`

---

## 🖼️ Image Optimization

### Alt Text Requirements

**Every image MUST have descriptive alt text** following these rules:

#### Format
```
[Image Subject] - Rabat Transfert Aéroport - [Context/Description]
```

#### Examples
```html
<!-- Good -->
<img src="logo.png" alt="Rabat Transfert Aéroport - Logo - Transport Premium au Maroc" />
<img src="driver.jpg" alt="Chauffeur professionnel Rabat Transfert Aéroport - Transport premium au Maroc depuis 2009" />
<img src="service.jpg" alt="Transfert Aéroport - Rabat Transfert Aéroport - Service de transport premium" />

<!-- Bad -->
<img src="logo.png" alt="logo" />
<img src="driver.jpg" alt="driver" />
<img src="service.jpg" alt="" />
```

#### Guidelines
1. **Be Descriptive**: Describe what the image shows
2. **Include Brand**: Always mention "Rabat Transfert Aéroport"
3. **Add Context**: Include relevant service/location information
4. **Keep It Concise**: 125 characters or less
5. **No Redundancy**: Don't start with "Image of..." or "Picture of..."

### Image Performance

```html
<!-- Add loading="lazy" for below-the-fold images -->
<img 
  src="image.jpg" 
  alt="Descriptive alt text" 
  loading="lazy"
/>
```

**When to use `loading="lazy"`**:
- ✅ Images below the fold
- ✅ Images in cards/grids
- ✅ Background images (if using `<img>`)
- ❌ Hero images (should load immediately)
- ❌ Above-the-fold images

### Image File Naming

Use descriptive, SEO-friendly filenames:
```
✅ chauffeur-professionnel-maroc.jpg
✅ mercedes-s-class-taxi.jpg
✅ transfert-aeroport-casablanca.jpg
❌ img1.jpg
❌ photo.png
❌ untitled.jpg
```

---

## 📝 Content Guidelines

### Title Tags

**Format**: `[Brand] - [Page/Service] - [Location/Value Prop] | [Year/Differentiator]`

**Examples**:
- `Rabat Transfert Aéroport - Transport Premium & Chauffeur Privé au Maroc | Depuis 2009`
- `Rabat Transfert Aéroport - Transfert Aéroport Casablanca | Service 24/7`

**Rules**:
- Maximum 60 characters
- Include primary keyword
- Include location (Maroc/Morocco)
- Include brand name

### Meta Descriptions

**Format**: `[What you offer] [Where] [Since when/Key benefit]. [Service details]. [Call to action].`

**Examples**:
- `Rabat Transfert Aéroport offre des services de transport de luxe au Maroc depuis 2009. Chauffeur privé, transferts aéroport, transport d'affaires. Mercedes S-Class, BMW. Service 24/7.`

**Rules**:
- 150-160 characters (optimal length)
- Include primary keywords naturally
- Include location
- Include key services
- End with a benefit or CTA

### Keywords Strategy

**Primary Keywords** (always include):
- `taxi maroc` / `taxi morocco` / `تاكسي المغرب`
- `chauffeur privé maroc` / `private chauffeur morocco`
- `transport premium maroc` / `premium transport morocco`
- `Rabat Transfert Aéroport`

**Secondary Keywords** (include when relevant):
- `transfert aéroport` / `airport transfer`
- `mercedes chauffeur` / `mercedes driver`
- `taxi touristique` / `tourist taxi`
- `transport de luxe` / `luxury transport`

**Location Keywords**:
- `Casablanca`, `Rabat`, `Marrakech`, `Fès`
- `Maroc`, `Morocco`, `المغرب`

---

## 🌐 Language-Specific SEO

### Language Implementation

The site supports three languages with proper SEO for each:

#### French (Default)
- **Locale**: `fr_FR`
- **HTML Lang**: `fr`
- **Keywords**: Focus on "Maroc", "chauffeur privé", "transport premium"

#### English
- **Locale**: `en_US`
- **HTML Lang**: `en`
- **Keywords**: Focus on "Morocco", "private chauffeur", "premium transport"

#### Arabic
- **Locale**: `ar_MA`
- **HTML Lang**: `ar`
- **Keywords**: Focus on "المغرب", "سائق خاص", "نقل فاخر"

### Hreflang Tags

For future multi-language pages, implement hreflang:

```html
<link rel="alternate" hreflang="fr" href="http://em-taxi.com/?lang=fr" />
<link rel="alternate" hreflang="en" href="http://em-taxi.com/?lang=en" />
<link rel="alternate" hreflang="ar" href="http://em-taxi.com/?lang=ar" />
<link rel="alternate" hreflang="x-default" href="http://em-taxi.com/" />
```

### Translation Files

When adding new content, ensure translations exist in:
- `src/locales/fr.json`
- `src/locales/en.json`
- `src/locales/ar.json`

**SEO Considerations**:
- Translate keywords naturally (don't force keywords)
- Maintain keyword relevance in each language
- Use local terminology (e.g., "chauffeur" in French vs "driver" in English)

---

## ⚡ Performance Optimization

### Core Web Vitals

Ensure the site meets Google's Core Web Vitals:

1. **Largest Contentful Paint (LCP)**: < 2.5 seconds
   - Optimize hero images
   - Use lazy loading for below-fold content
   - Minimize render-blocking resources

2. **First Input Delay (FID)**: < 100 milliseconds
   - Minimize JavaScript execution time
   - Use code splitting
   - Defer non-critical JavaScript

3. **Cumulative Layout Shift (CLS)**: < 0.1
   - Set image dimensions
   - Reserve space for dynamic content
   - Avoid inserting content above existing content

### Image Optimization

- Use WebP format when possible
- Compress images (aim for < 200KB)
- Use appropriate image sizes (responsive images)
- Implement lazy loading

### Code Optimization

- Minify CSS and JavaScript in production
- Use code splitting
- Remove unused dependencies
- Optimize bundle size

---

## ♿ Accessibility & SEO

### Accessibility Best Practices

1. **Alt Text**: All images must have descriptive alt text
2. **ARIA Labels**: Use for interactive elements without text
3. **Semantic HTML**: Use proper HTML5 semantic elements
4. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
5. **Color Contrast**: Maintain WCAG AA contrast ratios (4.5:1 for text)

### SEO Benefits of Accessibility

- Better user experience = lower bounce rate
- Screen readers can understand content structure
- Semantic HTML helps search engines understand content
- Accessible sites rank better in search results

---

## ✅ Testing & Validation

### SEO Testing Checklist

Before deploying changes, verify:

#### Meta Tags
- [ ] Title tags are unique and under 60 characters
- [ ] Meta descriptions are 150-160 characters
- [ ] Open Graph tags are present and correct
- [ ] Twitter Card tags are present and correct
- [ ] Canonical URL is set correctly

#### Structured Data
- [ ] Validate JSON-LD using [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check for errors in structured data
- [ ] Verify all required fields are present

#### Technical SEO
- [ ] All images have alt text
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Semantic HTML elements used correctly
- [ ] `robots.txt` allows crawling
- [ ] `sitemap.xml` is accessible and valid
- [ ] **Bot protection (Cloudflare/firewall) allows Verified Bots** (Googlebot, Bingbot) — see [Bot Protection & Crawler Access](#-bot-protection--crawler-access)

#### Performance
- [ ] Page load time < 3 seconds
- [ ] Mobile-friendly (responsive design)
- [ ] HTTPS enabled (in production)
- [ ] No console errors

### Tools for Validation

1. **Google Search Console**: Monitor search performance
2. **Google Rich Results Test**: Validate structured data
3. **PageSpeed Insights**: Check performance metrics
4. **Lighthouse**: Comprehensive SEO audit
5. **W3C Validator**: HTML validation
6. **Schema.org Validator**: Structured data validation

### Regular Maintenance

- **Weekly**: Check Google Search Console for errors
- **Monthly**: Review and update meta descriptions if needed
- **Quarterly**: Audit structured data and update if business info changes
- **Annually**: Review and update sitemap, check for broken links

---

## 🤖 Bot Protection & Crawler Access

**Critical for SEO:** If your site uses bot protection (Cloudflare, firewall rules, or security plugins), it can block search engine crawlers. When Googlebot or other verified bots are blocked, Google only sees partial content → **poor indexing and search visibility**.

### ✅ 1. Allow search engine bots (VERY IMPORTANT)

#### If you use **Cloudflare**

1. Go to **Cloudflare Dashboard** → your domain (e.g. em-taxi.com).
2. **Security** → **Bots**.
3. Ensure:
   - **Verified Bots** = **Allowed** (Googlebot, Bingbot, Applebot, etc.).
   - **No rule** that blocks “known bots” without exceptions for verified crawlers.
4. Avoid aggressive rules such as:
   - “Challenge all visitors” (or add exceptions for verified bots).
   - “Block known bots” without allowing **Verified Bots**.
5. **Optional:** Under **Security** → **WAF** (Web Application Firewall), check that there is no custom rule that blocks `Googlebot`, `Bingbot`, or other verified bot user-agents.

**Result:** Google (and other search engines) can fully crawl and index your site.

#### If you use **Hostinger**

1. Connecte-toi à **hPanel** (panel Hostinger) et sélectionne ton hébergement pour **em-taxi.com**.
2. **Performance → CDN** (si tu utilises le CDN Hostinger)  
   - Va dans **AI Audit** (ou réglages des crawlers/bots).  
   - **Ne bloque pas** Googlebot, Bingbot ni les crawlers de moteurs de recherche.  
   - Tu peux bloquer certains bots IA (Anthropic, etc.) si tu veux, mais **laisse Google et Bing autorisés**.
3. **Sécurité / Security**  
   - Vérifie qu’il n’y a pas de règle de type “Block all bots” ou “Challenge bots” qui bloquerait aussi Googlebot.  
   - Si tu as un **IP Manager** (Websites → Manage → IP Manager), ne mets pas en liste noire des plages d’IP utilisées par Google (inutile de les lister : garde simplement aucune règle qui bloquerait tout le trafic “bot”).
4. **Fichier `.htaccess`**  
   - Ne pas ajouter de règles qui bloquent par **User-Agent** (ex. Googlebot, Bingbot).  
   - Les règles dans **public/.htaccess** du projet ne bloquent pas les crawlers.
5. **WordPress** (si le site tourne sous WordPress sur Hostinger)  
   - Réglages → Lecture : ne pas cocher “Bloquer les moteurs de recherche”.  
   - Si un plugin de sécurité (ex. Wordfence, Sucuri) bloque les bots, ajoute une exception pour **Verified Bots** / Googlebot.

**Résultat :** Google et les autres moteurs peuvent crawler et indexer ton site correctement.

#### If you use another firewall / security plugin

- Whitelist or **allow** these verified crawlers (do not challenge or block them):
  - **Googlebot** (Google)
  - **Bingbot** (Bing)
  - **Applebot** (Apple)
  - **Slurp** (Yahoo)
- Prefer “allow verified bots” or “allow search engine crawlers” if the product has such an option.

### ✅ 2. This site’s `robots.txt`

The project already has a `public/robots.txt` that **allows** all crawlers and explicitly allows Googlebot and Bingbot. That is correct. The blocking issue is **not** in `robots.txt` but in **server/firewall/Cloudflare** rules that may intercept requests before the page is served.

### ✅ 3. Verify after changes

- **Google Search Console** → URL Inspection: fetch a URL and check that Google can read the full page.
- **Google Search Console** → Coverage / Indexing: ensure pages are indexed and not “Crawled – currently not indexed” due to blocking.

---

## 📄 Why Pages Aren't Indexed

**Pages that aren't indexed can't be served on Google.** Here are the main reasons and what to do.

### 1. Blocking (crawler can't read the page)

| Cause | What to do |
|-------|------------|
| **Firewall / bot protection** (e.g. Hostinger Security level) | Set to **Low** so Googlebot isn't challenged. See [Bot Protection & Crawler Access](#-bot-protection--crawler-access). |
| **robots.txt** blocks the URL | Ensure `Allow: /` for Googlebot; no `Disallow: /` for the path. This project's `public/robots.txt` already allows. |
| **noindex** in HTML or meta | Remove `<meta name="robots" content="noindex">` for pages you want indexed. This site uses `index, follow`. |

### 2. Google hasn't discovered or crawled yet

| Cause | What to do |
|-------|------------|
| **New site or new URL** | Submit the URL in [Google Search Console](https://search.google.com/search-console) → **URL Inspection** → "Request indexing". Submit **sitemap** (Sitemaps) so Google knows all pages. |
| **No links to the page** | For a single-page app, the main URL is linked from sitemap and canonical. Add the site to Search Console and request indexing for the homepage. |

### 3. Crawl errors (Google tried but failed)

| Cause | What to do |
|-------|------------|
| **5xx / timeout** | Fix server/hosting errors and slow response. Check Hostinger status and server logs. |
| **Redirect chain or loop** | Ensure redirects (e.g. HTTP→HTTPS, www→non-www) are simple and not looping. |
| **Soft 404** | Don't return 200 for "page not found"; use 404 or SPA fallback (this project has a custom 404). |

### 4. Page with redirect

| Cause | What to do |
|-------|------------|
| **HTTP → HTTPS** or **www → non-www** (301) | **Expected.** This site redirects `http://em-taxi.com`, `https://www.em-taxi.com` to the canonical `https://em-taxi.com/`. Search Console lists those *redirecting* URLs as "Page with redirect" (not indexed); the **destination** URL is what gets indexed. No fix needed. |
| **Sitemap listed only canonical** | The sitemap should list only `https://em-taxi.com/` (and language variants). Do not submit `http://` or `www` URLs in the sitemap so Google discovers the canonical first. |
| **Trailing slash** | If your host redirects `em-taxi.com` ↔ `em-taxi.com/`, one will show as redirect. Stick to one (this site uses `https://em-taxi.com/` with trailing slash in canonical). |

### 5. Google chose not to index (quality / duplicate)

| Cause | What to do |
|-------|------------|
| **Crawled – currently not indexed** | Usually quality or low priority. Improve content, internal links, and ensure the page is useful and unique. Request indexing after fixes. |
| **Duplicate content** | Use a single **canonical** URL (this site uses `https://em-taxi.com/`). Avoid duplicate titles/descriptions across URLs. |
| **Thin or low-value content** | Add clear, useful content and a clear purpose for the page. |

### 6. Single-page app (SPA) specifics (em-taxi.com)

- **One main URL:** The site is a SPA; the main indexable URL is the homepage. Ensure **index.html** is served for `/` and that the server sends the same HTML for client-side routes (SPA fallback) so crawlers get the app.
- **Sitemap:** `public/sitemap.xml` should list the main URL(s). Submit it in Search Console → Sitemaps.
- **JavaScript:** Google renders JS; ensure the important content (title, H1, main text) is in the initial HTML or loads quickly so Google sees it.

### Checklist: "My page isn't indexed"

1. [ ] **Search Console** – Property added for `https://em-taxi.com` (or exact URL prefix).
2. [ ] **URL Inspection** – Test the URL; check "URL is on Google" and "Page fetch" shows full content.
3. [ ] **No blocking** – Security level **Low** (Hostinger), robots.txt allows, no noindex.
4. [ ] **Sitemap** – Submitted in Search Console; no errors.
5. [ ] **Request indexing** – For the main URL, use "Request indexing" in URL Inspection (don't overuse).
6. [ ] **Canonical** – One canonical URL; no duplicate URLs without canonical.
7. [ ] **Content** – Page has clear, useful content and a proper title/description.

If the issue persists, check **Search Console → Indexing → Pages**: it will show the reason (e.g. Crawled – currently not indexed, Discovered – currently not indexed, Blocked by robots.txt).

---

## 🔗 External factors & backlinks

**Backlinks** are links from other websites pointing to your site (e.g. to `https://em-taxi.com`). They are an “external” SEO factor: you cannot create them by changing your own code. Quality tools may report “only a few backlinks” or “only 1 referring domain” — that is expected for a new or small site and improves over time when others link to you.

### Why backlinks matter

- Search engines use them as a trust and relevance signal.
- More quality backlinks from different domains and IPs generally help visibility.
- You cannot “add backlinks” in your HTML; other sites must choose to link to you.

### How to gain more backlinks (actionable list)

| Action | Description |
|--------|-------------|
| **Google Business Profile** | Ensure your [Rabat Transfert Maroc](https://www.google.com/maps/place/EM+Taxi+Maroc) listing has the website URL. Google counts as a referring domain. |
| **Directories & tourism** | Submit the site to trusted directories: transport/taxi directories, Morocco tourism portals, Rabat/Casablanca/Marrakech business or travel listings. Prefer sites that allow a real link to your homepage. |
| **Partner & B2B** | Ask hotels, travel agencies, event planners, or corporate clients you work with to add “Transport: Rabat Transfert” with a link on their site (partners page, “services” or “getting here”). |
| **Press & local** | Local news, “best taxi / chauffeur in Rabat” articles, or event coverage that mention Rabat Transfert and link to em-taxi.com. |
| **Social & review platforms** | Keep the link in your Google Maps listing, and on any Facebook page, TripAdvisor, or other profiles that allow a website field. |
| **Content others can cite** | Useful, unique content (e.g. “Transferts aéroport Rabat-Salé”, “Transport luxe Maroc”) can attract natural links from blogs or travel sites. |

### Quick checklist — improve "weak" backlink activity

Do these first; they don't require code and directly add or encourage backlinks:

1. [ ] **Google Business** — In [Google Business Profile](https://business.google.com) for Rabat Transfert Maroc, set **Website** to `https://em-taxi.com`. Google then counts as a referring domain.
2. [ ] **Facebook / TripAdvisor** — If you have a business page, add the website link in the profile. Each platform that links to you is an extra referring domain.
3. [ ] **2–3 directories** — Submit `https://em-taxi.com` to 2–3 serious directories (e.g. one taxi/transport directory, one Morocco tourism or "things to do" list). Prefer sites that allow a real link and are relevant.
4. [ ] **2–3 partners** — Email or call 2–3 hotels, travel agencies, or event partners. Ask for a line like "Transport / Navette : [Rabat Transfert](https://em-taxi.com)" on their "Services", "Partenaires" or "Comment nous rejoindre" page.
5. [ ] **Search Console** — In [Google Search Console](https://search.google.com/search-console) → **Links**, check "External links" and "Top linking sites" after a few weeks to see new referring domains.

Domain strength and page strength in tools will improve as more quality sites link to you. You cannot change these metrics from your codebase.

### What to avoid

- **Buying links or link schemes** — can lead to penalties.
- **Spam directories or link farms** — low value and can hurt trust.
- Expecting backlinks to appear from code changes — they come from other websites only.

### Monitoring

- **Google Search Console** → Links: shows who links to your site (domains and sample URLs).
- Third-party tools (e.g. Ahrefs, Moz, Semrush) show referring domains and backlink counts; “only 1 referring domain” or “few backlinks” is normal at first and should grow as you apply the actions above.

---

## 🚀 Quick Reference

### When Adding New Content

1. ✅ Add semantic HTML structure (`<section>`, `<header>`, etc.)
2. ✅ Include proper heading hierarchy
3. ✅ Add descriptive alt text to images
4. ✅ Update SEO component with new meta tags (if new page)
5. ✅ Update sitemap.xml
6. ✅ Test structured data (if adding new service types)
7. ✅ Validate with SEO testing tools

### When Modifying Existing Content

1. ✅ Maintain semantic HTML structure
2. ✅ Keep heading hierarchy intact
3. ✅ Update alt text if images change
4. ✅ Update meta descriptions if content changes significantly
5. ✅ Test that structured data still validates

### Common Mistakes to Avoid

❌ **Don't**:
- Use generic alt text like "image" or "photo"
- Skip heading levels (H1 → H3)
- Forget to update meta tags for new pages
- Use images without alt text
- Create duplicate content across languages
- Use keyword stuffing in meta descriptions
- Ignore mobile optimization

✅ **Do**:
- Write descriptive, natural alt text
- Maintain proper heading hierarchy
- Update SEO component when adding pages
- Test structured data after changes
- Keep content unique per language
- Focus on user experience, not just keywords
- Optimize for mobile-first indexing

---

## 📚 Additional Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev SEO Guide](https://web.dev/learn-seo/)
- [Moz SEO Learning Center](https://moz.com/learn/seo)
- [Google Search Central](https://developers.google.com/search)

---

## 📝 Notes

- This document should be updated whenever SEO implementation changes
- Always test changes in development before deploying
- Monitor Google Search Console for any issues after deployment
- Keep structured data in sync with actual business information

---

**Last Updated**: January 2026
**Maintained By**: Development Team
**Project**: Rabat Transfert Aéroport
