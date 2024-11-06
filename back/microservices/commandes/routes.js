const express = require('express');
const Commande = require('./models/Commande');
const router = express.Router();
const Plat = require('../cuisine/models/Plat');

router.post('/', async (req, res) => {
    try {
        const { clientId, plats } = req.body;

        if (!clientId || !plats || plats.length === 0) {
            return res.status(400).json({ message: 'Informations de commande manquantes ou incorrectes' });
        }

        const commande = new Commande({
            clientId,
            plats,
            status: 'pending',
        });

        await commande.save();
        res.status(201).json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/client/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;

        if (!clientId) {
            return res.status(400).json({ message: "Client ID manquant" });
        }

        const commandes = await Commande.find({ clientId });
        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/chef/:chefId', async (req, res) => {
    try {
        const { chefId } = req.params;

        if (!chefId) {
            return res.status(400).json({ message: "Chef ID manquant" });
        }

        const platsDuChef = await Plat.find({ chefId: chefId }).select('_id');
        const platIdsDuChef = platsDuChef.map(plat => plat._id);

        const commandes = await Commande.find({ "plats.platId": { $in: platIdsDuChef } });

        res.status(200).json(commandes);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:commandeId/status', async (req, res) => {
    try {
        const { commandeId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Statut manquant" });
        }

        const updatedCommande = await Commande.findByIdAndUpdate(
            commandeId,
            { status },
            { new: true }
        );

        res.status(200).json(updatedCommande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/completed', async (req, res) => {
    try {
        const commandesTerminees = await Commande.find({ status: "completed" });
        res.status(200).json(commandesTerminees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/livreur/:livreurId/delivered', async (req, res) => {
    try {
        const { livreurId } = req.params;

        const commandesLivrees = await Commande.find({ deliveryStatus: 'delivered', livreurId });
        res.status(200).json(commandesLivrees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:commandeId/delivery-status', async (req, res) => {
    try {
        const { commandeId } = req.params;
        const { deliveryStatus, livreurId } = req.body;

        if (!deliveryStatus || !livreurId) {
            return res.status(400).json({ message: "Statut de livraison ou ID du livreur manquant" });
        }

        const updatedCommande = await Commande.findByIdAndUpdate(
            commandeId,
            { deliveryStatus, livreurId },
            { new: true }
        );

        res.status(200).json(updatedCommande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
