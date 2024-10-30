const express = require('express');
const Plat = require('../cuisine/models/Plat');
const router = express.Router();

// Route pour mettre à jour le nom du menu d'un cuisinier
router.post('/menu/name', async (req, res) => {
    const { menuName } = req.body;
    const chefId = req.headers['user-id'];

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        // Met à jour le nom du menu pour tous les plats du cuisinier
        await Plat.updateMany({ chefId }, { menuName });
        res.status(200).json({ message: "Nom du menu mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour ajouter un plat (réservée aux cuisiniers)
router.post('/plats', async (req, res) => {
    const chefId = req.headers['user-id'];
    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const plat = new Plat({
            ...req.body,
            chefId,
        });
        await plat.save();
        res.status(201).json(plat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer tous les plats d'un cuisinier
router.get('/plats', async (req, res) => {
    const chefId = req.headers['user-id'];
    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const plats = await Plat.find({ chefId });
        res.status(200).json(plats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
