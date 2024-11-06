const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    plats: [{
        platId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plat', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
    deliveryStatus: { type: String, enum: ['awaiting', 'in delivery', 'delivered'], default: 'awaiting' }, // Statut de livraison
    livreurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // ID du livreur responsable
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commande', CommandeSchema);
