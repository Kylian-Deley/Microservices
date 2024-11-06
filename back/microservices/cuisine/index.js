const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://bastien:Romeo2020@cluster0.87ozbqt.mongodb.net/Cluster0')
    .then(() => console.log('MongoDB connected for Cuisine service'))
    .catch(err => console.error('MongoDB connection error:', err));

// Importation des routes
const cuisineRoutes = require('./routes'); // Assurez-vous que `./routes/index.js` existe et exporte un routeur valide
app.use('/cuisine', cuisineRoutes); // Utilise le routeur correctement

const port = 3003;
app.listen(port, () => {
    console.log(`Cuisine service running on port ${port}`);
});
