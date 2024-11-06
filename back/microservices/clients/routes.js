const express = require('express');
const Plat = require('../cuisine/models/Plat');
const router = express.Router();

router.post('/menu/name', async (req, res) => {
    const { menuName } = req.body;
    const chefId = req.headers['user-id'];

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        await Plat.updateMany({ chefId }, { menuName });
        res.status(200).json({ message: "Nom du menu mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
