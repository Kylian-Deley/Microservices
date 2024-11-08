const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Ajout de mongoose
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://bastien:Romeo2020@cluster0.87ozbqt.mongodb.net/Cluster0';
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connecté pour la gateway'))
    .catch(err => console.error('Erreur de connexion MongoDB dans la gateway:', err));

// Importation des routes
const clientsRoutes = require('./routes/clients');
const commandesRoutes = require('./routes/commandes');
const cuisineRoutes = require('./routes/cuisine');
const authRoutes = require('./routes/auth');
const livraisonRoutes = require('./routes/livraison');

// Définition des routes
app.use('/api/clients', clientsRoutes);
app.use('/api/commandes', commandesRoutes);
app.use('/api/cuisine', cuisineRoutes);
app.use('/api/livraison', livraisonRoutes);
app.use('/api', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Gateway running on port ${port}`);
});
