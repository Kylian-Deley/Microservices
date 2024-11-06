# Utiliser une image Node officielle
FROM node:18-alpine

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY ./back/services/gateway/package*.json ./

# Installer les dépendances uniquement pour ce service
RUN npm install --omit=dev

# Copier tout le reste des fichiers du service dans le conteneur
COPY ./back/services/gateway .

# Exposer le port 3000 pour accéder à la master API (gateway)
EXPOSE 3000

# Commande pour démarrer l'application master-api
CMD ["node", "app.js"]
