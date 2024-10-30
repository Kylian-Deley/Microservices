const express = require('express');
const Commande = require('./models/Commande'); // Modèle pour les commandes
const router = express.Router();
const Plat = require('../cuisine/models/Plat');

// Route pour passer une commande
router.post('/', async (req, res) => {
    try {
        const { clientId, plats } = req.body;

        // Vérification des données de la commande
        if (!clientId || !plats || plats.length === 0) {
            return res.status(400).json({ message: 'Informations de commande manquantes ou incorrectes' });
        }

        // Création de la commande
        const commande = new Commande({
            clientId,
            plats,
            status: 'pending', // Par défaut, la commande est en attente
        });

        await commande.save();
        res.status(201).json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour récupérer toutes les commandes d'un client
router.get('/client/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;

        // Vérification de la présence de clientId
        if (!clientId) {
            return res.status(400).json({ message: "Client ID manquant" });
        }

        // Récupération des commandes pour le client
        const commandes = await Commande.find({ clientId });
        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour récupérer toutes les commandes pour un cuisinier
router.get('/chef/:chefId', async (req, res) => {
    try {
        const { chefId } = req.params;

        // Vérifie que le chefId est présent
        if (!chefId) {
            return res.status(400).json({ message: "Chef ID manquant" });
        }

        // Étape 1 : Récupérer tous les platIds du cuisinier
        const platsDuChef = await Plat.find({ chefId: chefId }).select('_id');
        const platIdsDuChef = platsDuChef.map(plat => plat._id);

        // Étape 2 : Utiliser les platIds pour trouver les commandes associées
        const commandes = await Commande.find({ "plats.platId": { $in: platIdsDuChef } });

        res.status(200).json(commandes);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: error.message });
    }
});

// Route pour mettre à jour le statut d'une commande
router.patch('/:commandeId/status', async (req, res) => {
    try {
        const { commandeId } = req.params;
        const { status } = req.body;

        // Vérifie que le statut est fourni
        if (!status) {
            return res.status(400).json({ message: "Statut manquant" });
        }

        // Met à jour le statut de la commande
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

// Route pour récupérer toutes les commandes terminées côté cuisine
router.get('/completed', async (req, res) => {
    try {
        const commandesTerminees = await Commande.find({ status: "completed" });
        res.status(200).json(commandesTerminees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour récupérer les commandes livrées par un livreur spécifique
router.get('/livreur/:livreurId/delivered', async (req, res) => {
    try {
        const { livreurId } = req.params;

        // Filtrer les commandes livrées par l'ID du livreur
        const commandesLivrees = await Commande.find({ deliveryStatus: 'delivered', livreurId });
        res.status(200).json(commandesLivrees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour mettre à jour le statut de livraison d'une commande
router.patch('/:commandeId/delivery-status', async (req, res) => {
    try {
        const { commandeId } = req.params;
        const { deliveryStatus, livreurId } = req.body;

        // Vérifie que le statut de livraison et l'ID du livreur sont fournis
        if (!deliveryStatus || !livreurId) {
            return res.status(400).json({ message: "Statut de livraison ou ID du livreur manquant" });
        }

        // Met à jour le statut de livraison de la commande et ajoute l'ID du livreur
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
