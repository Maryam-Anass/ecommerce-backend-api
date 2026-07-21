const jwt = require('jsonwebtoken');

// Middleware for any authenticated user
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error('Access denied. No token provided.');
        error.status = 401;
        return next(error);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        const error = new Error('Invalid or expired token.');
        error.status = 401;
        return next(error);
    }
};

// Middleware strictly for admins
const verifyAdminToken = (req, res, next) => {
    protect(req, res, () => {
        if (!req.user.isAdmin) {
            const error = new Error('Forbidden. Admin permissions required.');
            error.status = 403;
            return next(error);
        }
        next();
    });
};

module.exports = { protect, verifyAdminToken };