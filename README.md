# Rabat Transfert Aéroport

A modern, responsive website for Rabat Transfert Aéroport - a premium luxury transportation service in Morocco. Built with React, TypeScript, and Vite.

## 🚗 Features

- **Multi-language Support**: Available in French, English, and Arabic
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **SEO Optimized**: Comprehensive SEO implementation with meta tags, structured data, and semantic HTML
- **Scroll Progress Indicator**: Visual progress bar showing page scroll position
- **Welcome Assistant**: Interactive virtual assistant for user guidance
- **Contact Form**: Integrated EmailJS for seamless contact form submissions
- **AOS Animations**: Smooth scroll animations using AOS (Animate On Scroll)
- **Premium Sections**:
  - Hero section with call-to-action
  - Services showcase
  - Pricing packages (Standard, Business, Premium)
  - About us with company information
  - **Google reviews** — links to [Rabat Transfert Maroc on Google Maps](https://www.google.com/maps/place/EM+Taxi+Maroc/@33.7651126,-7.254083,17z); optional: show review snippets via Places API
  - Contact form and information
  - Footer with quick links

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **AOS** - Animation library
- **EmailJS** - Contact form email service
- **Lucide React** - Icon library
- **CSS3** - Styling with custom components

## 🔍 On-page SEO check (Python)

Run the local SEO checker to get a 0–100 score and fix suggestions (no pip install needed):

```bash
# From project root
python3 scripts/seo_check.py

# Also check a live URL (e.g. after deploy)
python3 scripts/seo_check.py --url http://em-taxi.com
```

Fixes common issues: title/description length, canonical, og:image absolute URLs, images without alt, H1 count, robots.txt, sitemap. See `SEO_GUIDELINES.md` for full SEO practices.

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taxi-em
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Optional: Show Google review snippets on the Reviews section

The Reviews section always shows buttons to **see reviews on Google** and **leave a review**. To also display the latest Google reviews on the page:

1. Create a [Google Cloud project](https://console.cloud.google.com/) and enable **Places API (New)**.
2. Create an API key and restrict it (e.g. by HTTP referrer to your domain).
3. Get your **Place ID** (e.g. via [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) or the Places API).
4. Add to your `.env` (do not commit this file):

   ```env
   VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
   VITE_GOOGLE_PLACE_ID=your_place_id_here
   ```

5. Restart the dev server. The Reviews section will fetch and show up to 5 reviews from Google.

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
taxi-em/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, videos, and other media
│   ├── components/     # React components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pricing.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── Services.tsx
│   │   └── WelcomeAssistant.tsx
│   ├── contexts/       # React contexts
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── locales/        # Translation files
│   │   ├── ar.json
│   │   ├── en.json
│   │   └── fr.json
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css      # Global styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🌐 Languages

The website supports three languages:
- **Français** (French) - Default
- **English**
- **العربية** (Arabic)

Language switching is available through the navbar language selector.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (< 768px)

## 🎨 Key Components

### Navbar
- Sticky navigation with scroll effects
- Mobile hamburger menu
- Language selector
- Quick contact buttons

### Hero
- Eye-catching hero section
- Call-to-action buttons
- Video background support

### Services
- Airport transfers
- Business & Corporate
- Events & Special Occasions
- On-Demand Service

### Pricing
- Three pricing tiers (Standard, Business, Premium)
- Feature comparison
- Custom quote option

### Contact
- Contact form with EmailJS integration
- Phone, WhatsApp, and Email contact options
- Service type selection

## 🔧 Configuration

### EmailJS Setup
To enable contact form functionality, configure EmailJS in the Contact component with your service credentials.

### Language Configuration
Add or modify translations in the `src/locales/` directory:
- `en.json` - English translations
- `fr.json` - French translations
- `ar.json` - Arabic translations

### SEO Configuration
The website includes comprehensive SEO optimization:

- **Meta Tags**: Dynamic meta tags that update based on selected language
- **Structured Data**: JSON-LD schema for LocalBusiness (Schema.org)
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Semantic HTML**: Proper use of semantic HTML5 elements (`<header>`, `<section>`, `<article>`, etc.)
- **Alt Text**: Descriptive alt attributes for all images
- **Sitemap**: XML sitemap located at `/public/sitemap.xml`
- **Robots.txt**: Search engine crawler instructions at `/public/robots.txt`

The SEO component (`src/components/SEO.tsx`) automatically updates meta tags and structured data when the language changes.

**📖 For detailed SEO guidelines and best practices, see [SEO_GUIDELINES.md](./SEO_GUIDELINES.md)**

## 🏗️ Build for Production

```bash
npm run build
```

The production build will be generated in the `dist/` directory.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

Built with modern React best practices:
- Functional components with hooks
- TypeScript for type safety
- Context API for state management
- CSS modules for component styling
- ESLint for code quality

## 📞 Contact Information

- **Phone**: +212 762 728 706
- **Service**: Available 24/7

---

**Rabat Transfert Aéroport** - Your trusted partner for premium transportation in Morocco since 2009.
