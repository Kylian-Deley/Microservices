const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const userRole = user.roles;

        const userInfo = { id: user._id, roles: userRole };

        if (userRole === 'client') {
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
