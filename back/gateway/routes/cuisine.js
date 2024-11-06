const express = require('express');
const axios = require('axios');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// Rôles autorisés pour ajouter des plats
const rolesForAddingPlats = ['chef'];

// Appliquer le middleware de rôle pour toutes les requêtes sauf GET /plats
router.use((req, res, next) => {
    if (req.method === 'GET' && req.path === '/menus-public') {
        // Autoriser tous les rôles à accéder aux plats en lecture
        next();
    } else {
        // Appliquer le middleware pour les autres routes (ajout de plats, etc.)
        roleMiddleware(rolesForAddingPlats)(req, res, next);
    }
});

// Gestion des requêtes
router.all('*', async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const role = req.headers['role'];

        const response = await axios({
            method: req.method,
            url: `http://localhost:3003/cuisine${req.path}`,
            data: req.body,
            headers: {
                role: role,
                'user-id': userId
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Erreur de gateway');
    }
});

module.exports = router;
