# Docker — Laravel Blade landing + Filament admin + MySQL

## Stack

| Service | URL | Rôle |
|---------|-----|------|
| **nginx + Laravel** | http://127.0.0.1:8088 | Landing Blade + API + Filament |
| **Filament admin** | http://127.0.0.1:8088/admin | Dashboard dispatch |
| **MySQL** | localhost:3307 | Base `taxi_rabat` |
| **phpMyAdmin** | http://127.0.0.1:8083 | Admin DB |
| **MailHog** | http://127.0.0.1:8026 | Emails dev |

## Démarrage

```bash
cp backend/.env.docker backend/.env
docker compose up -d --build
cd backend && npm install && npm run build
```

La landing, les pages SEO, le blog et l’admin Filament sont servis par Laravel sur le port **8088**.

## Comptes

| Usage | URL | Identifiants |
|-------|-----|--------------|
| **Landing + réservation** | http://127.0.0.1:8088/ | Formulaire → WhatsApp |
| **Filament admin** | http://127.0.0.1:8088/admin | `admin@taxirabatairport.com` / `password` |

## Architecture

- **Landing + SEO local** → Laravel Blade (`resources/views/`)
- **Contenu SEO** → `backend/data/*.json`
- **Admin dispatch** → Filament (`/admin`)
- **Schema** → LocalBusiness + FAQPage sur la landing Blade
