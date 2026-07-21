const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExists = await userService.findUserByEmail(email);
        if (userExists) {
            const error = new Error('User already exists with this email');
            error.status = 400;
            return next(error);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userService.createUser({
            email,
            password: hashedPassword // Fixed typo: passowrd -> password
        });

        const token = jwt.sign(
            { id: newUser._id, isAdmin: newUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser._id, email: newUser.email }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser };