const express = require('express');
const Plat = require('./models/Plat');
const Menu = require('./models/Menu');
const User = require('../../gateway/models/User');
const router = express.Router();

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

        await Menu.findByIdAndUpdate(menuId, { $push: { plats: plat._id } });

        res.status(201).json(plat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/menus', async (req, res) => {
    const chefId = req.headers['user-id'];

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const menus = await Menu.find({ chefId }).populate('plats');
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/menus-public', async (req, res) => {
    try {
        const menus = await Menu.find().populate('plats');
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mise à jour d'un menu
router.put('/menus/:id', async (req, res) => {
    const { id } = req.params;
    const chefId = req.headers['user-id'];
    const { name } = req.body;

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const menu = await Menu.findOneAndUpdate(
            { _id: id, chefId },
            { name },
            { new: true }
        );
        if (!menu) {
            return res.status(404).json({ message: "Menu non trouvé ou non autorisé" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Suppression d'un menu
router.delete('/menus/:id', async (req, res) => {
    const { id } = req.params;
    const chefId = req.headers['user-id'];

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const menu = await Menu.findOneAndDelete({ _id: id, chefId });
        if (!menu) {
            return res.status(404).json({ message: "Menu non trouvé ou non autorisé" });
        }
        res.status(200).json({ message: "Menu supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mise à jour d'un plat
router.put('/plats/:id', async (req, res) => {
    const { id } = req.params;
    const chefId = req.headers['user-id'];
    const { name, description, price } = req.body;

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const plat = await Plat.findOneAndUpdate(
            { _id: id, chefId },
            { name, description, price },
            { new: true }
        );
        if (!plat) {
            return res.status(404).json({ message: "Plat non trouvé ou non autorisé" });
        }
        res.status(200).json(plat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Suppression d'un plat
router.delete('/plats/:id', async (req, res) => {
    const { id } = req.params;
    const chefId = req.headers['user-id'];

    if (!chefId) return res.status(403).json({ message: "ID du cuisinier non fourni" });

    try {
        const plat = await Plat.findOneAndDelete({ _id: id, chefId });
        if (!plat) {
            return res.status(404).json({ message: "Plat non trouvé ou non autorisé" });
        }

        // Retirer le plat du menu associé
        await Menu.findByIdAndUpdate(plat.menuId, { $pull: { plats: plat._id } });

        res.status(200).json({ message: "Plat supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password;
        }

        await user.save();
        res.json({ message: 'Profil mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
