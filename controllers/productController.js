// 1. Rename the imported service functions so they don't collide with your controller names
const {
    getAllProducts,
    getProductById: getProductByIdService,
    addProduct: addProductService,
    updateProduct: updateProductService,
    deleteProduct: deleteProductService
} = require('../services/productService');

// Get all products (Admin view or public view)
const getProducts = async (req, res, next) => {
    try {
        const filter = {};
        const products = await getAllProducts(filter);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Get a single product by ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Fixed: Calls the renamed service function
        const product = await getProductByIdService(id);
        
        if (!product) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }   
};

// Admin Only: Add a new product to the store
const addProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        // Fixed: Calls the renamed service function
        const newProduct = await addProductService(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

// Admin Only: Update an existing product's details (price, stock, description)
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        // Fixed: Calls the renamed service function
        const updatedProduct = await updateProductService(id, productData);

        if (!updatedProduct) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// Admin Only: Completely remove a product from the database
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Fixed: Calls the renamed service function
        const deletedProduct = await deleteProductService(id);
        
        if (!deletedProduct) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };