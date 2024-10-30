const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://bastien:Romeo2020@cluster0.87ozbqt.mongodb.net/Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Importation des routes
const clientRoutes = require('./routes');
app.use('/clients', clientRoutes);

const port = process.env.PORT || 3001; // Chaque microservice a son propre port
app.listen(port, () => {
    console.log(`Clients service running on port ${port}`);
});
