const express = require('express');
const axios = require('axios');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

const roles = ['livreur']; // Rôles pour le service commandes

router.use(roleMiddleware(roles));

router.all('*', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://localhost:3002/livraison${req.path}`,
            data: req.body,
            headers: {
                'user-id': req.headers['user-id']
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Erreur de gateway');
    }
});

module.exports = router;
