const express = require('express');
const router = express.Router();
const { protect, verifyAdminToken } = require('../authMiddleware');

// 1. Import 'addProduct' (matching productController.js)
const { 
    getProducts, 
    getProductById, 
    addProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

// 2. Public Routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// 3. Admin Protected Routes (Note: Route path inside productRoutes is relative!)
router.post('/', protect, verifyAdminToken, addProduct);
router.put('/:id', protect, verifyAdminToken, updateProduct);
router.delete('/:id', protect, verifyAdminToken, deleteProduct);

module.exports = router;