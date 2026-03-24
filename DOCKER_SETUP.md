# Configuration Docker avec PHP pour l'envoi d'emails

Ce guide explique comment utiliser Docker avec PHP pour tester l'envoi d'emails dans l'application.

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Ports 8080, 1025 et 8025 disponibles

## Structure

```
php/
├── Dockerfile          # Configuration de l'image PHP
├── php.ini            # Configuration PHP pour l'envoi d'emails
├── .htaccess          # Configuration Apache
└── api/
    ├── send-email.php # Endpoint API pour l'envoi d'emails
    └── test-email.php # Endpoint de test
```

## Démarrage

1. **Démarrer les conteneurs Docker** :
   ```bash
   docker-compose up -d
   ```

2. **Vérifier que les conteneurs sont en cours d'exécution** :
   ```bash
   docker-compose ps
   ```

3. **Accéder aux services** :
   - **API PHP** : http://localhost:9090
   - **MailHog Web UI** : http://localhost:8026 (pour voir les emails capturés)
   - **MailHog SMTP** : localhost:1026

## Test de l'API

### Test simple
```bash
curl http://localhost:9090/api/test-email.php
```

### Test d'envoi d'email
```bash
curl -X POST http://localhost:9090/api/send-email.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+212 6XX XX XX XX",
    "serviceType": "Standard",
    "message": "Ceci est un message de test"
  }'
```

## Configuration Frontend

Dans votre application React, l'API est configurée pour utiliser :
- URL par défaut : `http://localhost:9090/api/send-email.php`
- Vous pouvez définir une variable d'environnement `VITE_API_URL` pour changer l'URL

Créer un fichier `.env.local` :
```
VITE_API_URL=http://localhost:9090/api/send-email.php
```

## MailHog - Capture des emails

MailHog capture tous les emails envoyés par PHP. Pour voir les emails :

1. Ouvrez http://localhost:8026 dans votre navigateur
2. Envoyez un email via le formulaire de contact
3. L'email apparaîtra dans l'interface MailHog

## Arrêt des conteneurs

```bash
docker-compose down
```

Pour supprimer également les volumes :
```bash
docker-compose down -v
```

## Logs

Voir les logs des conteneurs :
```bash
docker-compose logs -f php
docker-compose logs -f mailhog
```

## Dépannage

### Le port 9090 est déjà utilisé
Modifiez le port dans `docker-compose.yml` :
```yaml
ports:
  - "9091:80"  # Changez 9090 en 9091
```

### Erreur de connexion depuis le frontend
Assurez-vous que :
1. Les conteneurs Docker sont démarrés
2. L'URL de l'API est correcte dans votre configuration
3. CORS est configuré (déjà fait dans `send-email.php`)

### Les emails n'apparaissent pas dans MailHog
Vérifiez que :
1. MailHog est démarré : `docker-compose ps`
2. PHP est configuré pour utiliser MailHog (voir `php.ini`)
3. Les logs PHP ne montrent pas d'erreurs : `docker-compose logs php`

## Production

Pour la production, remplacez MailHog par un vrai serveur SMTP. Modifiez `php.ini` :
```ini
sendmail_path = /usr/sbin/sendmail -t -i
```

Et configurez votre serveur SMTP dans votre environnement Docker ou serveur.
