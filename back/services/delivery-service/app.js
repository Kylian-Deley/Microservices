const express = require('express');
const app = express();
const PORT = 3002; 

app.use(express.json());

// Exemple d'une route pour obtenir les infos de livraison
app.get('/delivery', (req, res) => {
    res.send([{ id: 1, name: "Livraison A" }, { id: 2, name: "Livraison B" }]);
});

app.listen(PORT, () => {
    console.log(`Delivery Service is running on port ${PORT}`);
});