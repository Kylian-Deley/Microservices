const express = require('express');
const app = express();
const PORT = 3004; 

app.use(express.json());

// Exemple d'une route pour obtenir les infos de commande
app.get('/orders', (req, res) => {
    res.send([{ id: 1, name: "Commande A" }, { id: 2, name: "Commande B" }]);
});

app.listen(PORT, () => {
    console.log(`Order Service is running on port ${PORT}`);
});