const express = require('express');
const axios = require('axios');
const User = require('../models/User'); // Assure-toi d'avoir un modèle User pour MongoDB
const bcrypt = require('bcrypt');
const router = express.Router();

// Route de connexion centralisée
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données MongoDB
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe
        //const isPasswordValid = await bcrypt.compare(password, user.password);
        //if (!isPasswordValid) {
       //     return res.status(401).json({ message: 'Mot de passe incorrect' });
       // }

        // Récupération du rôle de l'utilisateur
        const userRole = user.roles;

        // Préparation de la réponse avec l'ID utilisateur et le rôle
        const userInfo = { id: user._id, role: userRole };

        if (userRole === 'admin') {
            res.json({ redirectUrl: '/admin', userInfo });
        } else if (userRole === 'client') {
            res.json({ redirectUrl: '/menu', userInfo });
        } else if (userRole === 'chef') {
            res.json({ redirectUrl: '/cuisine', userInfo });
        } else if (userRole === 'livreur') {
            res.json({ redirectUrl: '/livraison', userInfo });
        } else {
            res.status(403).json({ message: 'Accès non autorisé pour ce rôle' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
