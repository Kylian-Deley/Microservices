const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://bastien:Romeo2020@cluster0.87ozbqt.mongodb.net/Cluster0')
    .then(() => console.log('MongoDB connected for Livraison service'))
    .catch(err => console.error('MongoDB connection error:', err));

const livraisonRoutes = require('./routes');
app.use('/livraison', livraisonRoutes);

const port = 3002;
app.listen(port, () => {
    console.log(`Livraison service running on port ${port}`);
});
