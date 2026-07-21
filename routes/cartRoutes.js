const express = require('express');
const router = express.Router();
const { getCart, addItemToCart, updateCartItemQuantity, removeCartItem } = require('../controllers/cartController');
const { protect } = require('../authMiddleware'); // Ensures req.user exists

// All cart actions require a logged-in user
router.use(protect);

router.route('/')
    .get(getCart)
    .post(addItemToCart);

router.route('/:productId')
    .put(updateCartItemQuantity)
    .delete(removeCartItem);

module.exports = router;