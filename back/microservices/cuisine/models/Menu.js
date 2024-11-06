const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plat' }] // Référence aux plats dans ce menu
});

module.exports = mongoose.model('Menu', MenuSchema);
