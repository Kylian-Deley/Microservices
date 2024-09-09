const express = require('express');
const app = express();
const PORT = 3003; 

app.use(express.json());

// Exemple d'une route pour obtenir les infos de cuisine
app.get('/kitchen', (req, res) => {
    res.send([{ id: 1, name: "Cuisine A" }, { id: 2, name: "Cuisine B" }]);
});

app.listen(PORT, () => {
    console.log(`Kitchen Service is running on port ${PORT}`);
});