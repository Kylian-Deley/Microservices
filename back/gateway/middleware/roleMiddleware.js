const User = require("../models/User");

module.exports = (allowedRoles) => {
    return async(req, res, next) => {
        const user = await User.findById(req.headers['user-id']);
        let userRole = user?.roles
        if (!userRole) {
            return res.status(401).json({ message: 'Rôle non fourni ou null' });
        }
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Accès interdit pour ce rôle' });
        }
        next();
    };
};
