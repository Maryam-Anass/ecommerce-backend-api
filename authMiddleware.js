const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretfallbackkey123';

// 1. Authenticate Token Middleware
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user payload to req
        next();             // Proceed to next handler
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.'
        });
    }
};

// 2. Admin Check Middleware (Safely checks req.user)
const verifyAdminToken = (req, res, next) => {
    // Safely verify req.user exists before reading .isAdmin
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required.'
        });
    }

    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden. Admin permissions required.'
        });
    }

    next();
};

module.exports = { protect, verifyAdminToken };