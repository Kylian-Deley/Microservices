# Utiliser une image Node officielle
FROM node:18-alpine

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY ./back/services/kitchen-service/package*.json ./

# Installer les dépendances uniquement pour ce service
RUN npm install --omit=dev

# Copier tout le reste des fichiers du service dans le conteneur
COPY ./back/services/kitchen-service .

# Exposer le port 3003 pour accéder au service de cuisine
EXPOSE 3003

# Commande pour démarrer l'application kitchen-service
CMD ["node", "app.js"]
