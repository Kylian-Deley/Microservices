const express = require('express');
const app = express();
const PORT = 3001; 

app.use(express.json());

// Exemple d'une route pour obtenir un client
app.get('/clients', (req, res) => {
    res.send([{ id: 1, name: "Client A" }, { id: 2, name: "Client B" }]);
});

app.listen(PORT, () => {
    console.log(`Client Service is running on port ${PORT}`);
});