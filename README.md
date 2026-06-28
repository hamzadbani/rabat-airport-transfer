# Rabat Transfert Aéroport

Site de réservation taxi aéroport Rabat-Salé (RBA) — **Laravel Blade + Filament**.

## Stack

| Couche | Technologie |
|--------|-------------|
| **Site public** | Laravel 13 Blade + Tailwind (Vite) |
| **Admin dispatch** | Filament `/admin` |
| **API** | Laravel Sanctum `/api/*` (optionnel) |
| **Base de données** | MySQL 8 |
| **Docker dev** | nginx + php-fpm + MySQL |

## Démarrage rapide

```bash
cp backend/.env.docker backend/.env
docker compose up -d --build
cd backend && npm install && npm run build
```

- **Landing** : http://127.0.0.1:8088/
- **Filament admin** : http://127.0.0.1:8088/admin  
  (`admin@taxirabatairport.com` / `password`)
- **56 pages SEO** : http://127.0.0.1:8088/taxi-rabat-aeroport/ etc.
- **Blog** : http://127.0.0.1:8088/blog/

## Contenu SEO

Les pages SEO et le blog sont servis depuis JSON Laravel :

```
backend/data/seo-pages.json
backend/data/blog-posts.json
```

Éditer ces fichiers directement, puis redéployer (ou vider le cache si activé).

## Structure

```
backend/
├── app/Filament/          # Admin dispatch
├── resources/views/       # Blade (landing, SEO, blog)
├── data/                  # SEO + blog JSON
├── routes/web.php         # Routes publiques
└── public/                # Point d'entrée nginx
```

## Déploiement

Voir `DOCKER_SETUP.md` et `.github/workflows/deploy-laravel-hostinger.yml`.

Sur Hostinger : pointer le domaine vers `backend/public/`, configurer `.env` (MySQL, APP_URL), puis `php artisan migrate --seed`.

## Search Console MCP (Cursor)

Live GSC data in Agent chat — see [`.cursor/GSC_MCP_SETUP.md`](.cursor/GSC_MCP_SETUP.md).

```bash
./scripts/gsc-mcp-auth.sh   # after placing OAuth JSON in ~/.config/mcp-google-search-console/
```
