module.exports = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['role'];
        if (!userRole) {
            return res.status(401).json({ message: 'Rôle non fourni' });
        }
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Accès interdit pour ce rôle' });
        }
        next();
    };
};
