#!/bin/sh
set -e

cd /var/www/html

if [ ! -f .env ]; then
  cp .env.docker .env 2>/dev/null || cp .env.example .env
fi

if [ ! -d vendor ]; then
  composer install --no-interaction --prefer-dist
fi

chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true

if [ -z "$(grep '^APP_KEY=.\+' .env 2>/dev/null || true)" ]; then
  php artisan key:generate --force --no-interaction
fi

php artisan migrate --force --no-interaction

php artisan db:seed --force --no-interaction 2>/dev/null || true

exec php-fpm
