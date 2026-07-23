require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');

const { adminLogin } = require('./sign-up/LogIn page/admin');
const { clientLogin } = require('./sign-up/LogIn page/client');
const { registerUser } = require('./sign-up/signUp');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(express.json());

connectDB();

app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', clientLogin);
app.post('/api/auth/admin/login', adminLogin);

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.use((err, req, res, next) => {
    console.log("Error detected: ", err);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
