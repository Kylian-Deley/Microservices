const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://bastien:Romeo2020@cluster0.87ozbqt.mongodb.net/Cluster0')
    .then(() => console.log('MongoDB connected for Commandes'))
    .catch(err => console.error('MongoDB connection error:', err));

// Importation des routes
const commandesRoutes = require('./routes');
app.use('/commandes', commandesRoutes);

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Commandes service running on port ${port}`);
});
