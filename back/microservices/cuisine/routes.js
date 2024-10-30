// cuisine/routes.js
const express = require('express');
const Plat = require('./models/Plat');
const Menu = require('./models/Menu');
const router = express.Router();

// Route pour créer un nouveau menu
router.post('/menus', async (req, res) => {
    const { name } = req.body;
    const chefId = req.headers['user-id'];

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const menu = new Menu({ name, chefId });
        await menu.save();
        res.status(201).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour ajouter un plat dans un menu spécifique
router.post('/plats', async (req, res) => {
    const chefId = req.headers['user-id'];
    const { name, description, price, menuId } = req.body;

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });
    if (!menuId) return res.status(400).json({ message: "ID du menu non fourni" });

    try {
        const plat = new Plat({
            name,
            description,
            price,
            chefId,
            menuId
        });

        await plat.save();

        // Ajouter le plat dans la liste des plats du menu
        await Menu.findByIdAndUpdate(menuId, { $push: { plats: plat._id } });

        res.status(201).json(plat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer tous les menus d'un cuisinier avec leurs plats
router.get('/menus', async (req, res) => {
    const chefId = req.headers['user-id'];

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const menus = await Menu.find({ chefId }).populate('plats'); // Utilisation de populate pour inclure les plats
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route publique pour récupérer tous les menus et plats de tous les cuisiniers
router.get('/menus-public', async (req, res) => {
    try {
        // Récupère tous les menus et les plats associés en utilisant `populate`
        const menus = await Menu.find().populate('plats'); // Associe les plats à chaque menu
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;