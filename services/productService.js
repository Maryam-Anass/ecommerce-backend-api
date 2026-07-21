const product = require('../models/productModel');

const getAllProducts = async (filter = {}) => {
    return await product.find(filter); 
};

const getProductById = async (id) => {
    return await product.findById(id);
};

const addProduct = async (productData) => {
    return await product.create(productData);
};

const updateProduct = async (id, productData) => {
    return await product.findByIdAndUpdate(
        id,
        productData,
        { new: true, runValidators: true }
    );
};

const deleteProduct = async (id) => {
    return await product.findByIdAndDelete(id);
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};