const express = require('express');
const axios = require('axios');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

const rolesForAddingPlats = ['chef'];

router.use((req, res, next) => {
    if (req.method === 'GET' && req.path === '/menus-public') {
        next();
    } else {
        roleMiddleware(rolesForAddingPlats)(req, res, next);
    }
});

router.all('*', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://localhost:3003/cuisine${req.path}`,
            data: req.body,
            headers: {
                role: req.headers['role'],
                'user-id': req.headers['user-id']
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Erreur de gateway');
    }
});

module.exports = router;
