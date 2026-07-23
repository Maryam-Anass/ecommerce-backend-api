const cartService = require('../services/cartService');


const createCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await cartService.getCartByUserId(userId);
        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
};

// Get everything currently in the user's cart
const getCartById = async (req, res, next) => {
    try {
        const { id } = req.params; // cart ID
        const cart = await cartService.getCartByUserId ?
            await cartService.getCartById(id) :
            await cartService.getCartByUserId(req.user.id);

        if (!cart) {
            const error = new Error('Cart not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

// Add a brand new item to the cart (or increment if it exists)
const addItemToCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const updatedCart = await cartService.addItem(userId, productId, quantity || 1);
        res.status(201).json({ message: "Item added to cart", cart: updatedCart });
    } catch (error) {
        next(error);
    }
};

// Update the quantity of an item already in the cart
const updateCartItemQuantity = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (quantity < 0) {
            const error = new Error('Quantity cannot be negative');
            error.status = 400;
            return next(error);
        }

        const updatedCart = await cartService.updateItemQuantity(userId, productId, quantity);
        res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
    } catch (error) {
        next(error);
    }
};

// Remove an item entirely from the user's cart
const removeCartItem = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const updatedCart = await cartService.removeItem(userId, productId);
        res.status(200).json({ message: 'Item removed from cart successfully', cart: updatedCart });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCart,
    getCartById,
    addItemToCart,
    updateCartItemQuantity,
    removeCartItem
};