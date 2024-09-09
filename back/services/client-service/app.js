const express = require('express');
const mongoose = require('mongoose'); // Importer mongoose correctement
const dotenv = require('dotenv'); // Pour charger les variables d'environnement
const app = express();
const PORT = 3001; 

dotenv.config();

const CONNECTION_STRING = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const connectMongoDB = async () => {
  try {    
    await mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`🟢 connected to Atlas Cluster: ${process.env.MONGODB_CLUSTER}`);
  } catch (e) {
    console.error('MongoDB connection error:', e); // Afficher l'erreur complète
  }
};

// Appel de la fonction de connexion
connectMongoDB();

app.use(express.json());

// Exemple d'une route pour obtenir un client
app.get('/clients', (req, res) => {
    res.send([{ id: 1, name: "Client A" }, { id: 2, name: "Client B" }]);
});

// Route pour tester la connexion MongoDB
app.get('/test-mongo', async (req, res) => {
  try {
      const result = await mongoose.connection.db.admin().ping();
      res.json({ message: "MongoDB connection is successful", result });
  } catch (error) {
      res.status(500).json({ message: "MongoDB connection failed", error });
  }
});

app.listen(PORT, () => {
    console.log(`Client Service is running on port ${PORT}`);
});
