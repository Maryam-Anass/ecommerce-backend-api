require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/userModel');
const Product = require('./models/productModel'); // Capitalized to match standard conventions

const seedDatabase = async () => {
    try {
        console.log('🔄 Connecting to database...');
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🔌 Database connected successfully!');

        // 1. Clear existing data
        await User.deleteMany();
        await Product.deleteMany(); // Fixed to uppercase Product
        console.log('🗑️ Existing database data cleared.');

        // 2. Generate secure admin credentials
        const salt = await bcrypt.genSalt(10); 
        const hashedAdminPassword = await bcrypt.hash('admin1234', salt);

        // 3. Create the admin user
        await User.create({ 
            email: 'admin@store.com',
            password: hashedAdminPassword,
            isAdmin: true
        });
        console.log('👤 Default Admin account generated (admin@store.com / admin1234)');

        // 4. Dummy items catalog list
        const Products = [
            {
                name: 'Wireless Bluetooth Headphones',
                price: 89.99,
                description: 'High-quality sound cancellation over-ear headphones.',
                stock: 50
            },
            {
                name: 'Ergonomic Gaming Mouse',
                price: 45.50,
                description: 'RGB customizable gaming mouse with macro keys.',
                stock: 120
            },
            {
                name: 'Mechanical Keyboard',
                price: 129.00,
                description: 'Tactile blue-switch mechanical keyboard.',
                stock: 35
            }
        ];

        // 5. Insert catalog and wrap up
        await Product.insertMany(Products); // Fixed to uppercase Product
        console.log('📦 Mock store inventory database loaded successfully!');

        await mongoose.connection.close();
        console.log('🔌 Database connection closed cleanly. Seeding process complete.');
        process.exit(0);

    } catch (error) {
        console.error(`🚨 Seeding process failed: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();