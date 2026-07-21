const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    description: {
        type: String,
        required: [true, 'A product must have a description']
    },
    stock: {
        type: Number,
        required: [true, 'A product must have specified stock volume'],
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);