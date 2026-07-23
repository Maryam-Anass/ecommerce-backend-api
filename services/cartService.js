const Cart = require('../models/cartModel');

// 1. Fetch or create cart by logged-in User ID
const getCartByUserId = async (userId) => {
    let cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
        cart = await Cart.create({ userId, items: [] });
    }
    return cart;
};

// 2. Fetch cart directly by its MongoDB Cart ID (_id)
const getCartById = async (cartId) => {
    return await Cart.findById(cartId).populate('items.productId');
};

// 3. Add item or increment quantity if it exists
const addItem = async (userId, productId, quantity) => {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    await cart.save();
    return await cart.populate('items.productId');
};

// 4. Update item quantity directly
const updateItemQuantity = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        throw new Error('Cart Not Found');
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) throw new Error('Item not in cart');

    if (quantity === 0) {
        cart.items.splice(itemIndex, 1);
    } else {
        cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    return await cart.populate('items.productId');
};

// 5. Remove an item entirely
const removeItem = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return await cart.populate('items.productId');
};

module.exports = {
    getCartByUserId,
    getCartById,
    addItem,
    updateItemQuantity,
    removeItem
};