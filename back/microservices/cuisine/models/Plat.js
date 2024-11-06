// models/Plat.js
const mongoose = require('mongoose');

const PlatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }
});

module.exports = mongoose.model('Plat', PlatSchema);
