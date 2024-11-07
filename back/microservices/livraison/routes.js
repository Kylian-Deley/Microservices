const express = require('express');
const User = require('../../gateway/models/User');
const router = express.Router();

// Récupérer les informations du profil
router.get('/profil/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ name: user.name, email: user.email, password: user.password });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour les informations du profil
router.put('/profil/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Mettre à jour les informations
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password; // Le hook "pre-save" de Mongoose va hasher le mot de passe
        }

        await user.save();
        res.json({ message: 'Profil mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
