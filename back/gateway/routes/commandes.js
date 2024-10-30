const express = require('express');
const axios = require('axios');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

const roles = ['admin', 'client', 'chef', 'livreur']; // Rôles pour le service commandes

router.use(roleMiddleware(roles));

router.all('*', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://localhost:3004/commandes${req.path}`,
            data: req.body,
            headers: { role: req.headers['role'] },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Erreur de gateway');
    }
});

module.exports = router;
