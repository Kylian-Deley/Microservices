# Utiliser une image Node officielle
FROM node:18-alpine

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY ./back/services/order-service/package*.json ./

# Installer les dépendances uniquement pour ce service
RUN npm install --omit=dev

# Copier tout le reste des fichiers du service dans le conteneur
COPY ./back/services/order-service .

# Exposer le port 3002 pour accéder au service de commandes
EXPOSE 3002

# Commande pour démarrer l'application order-service
CMD ["node", "app.js"]
