const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../../services/userService');

const adminLogin = async (req, res,next) => {
    try{
        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);
        if (!user) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            return next(error);

        }

        if (!user.isAdmin) {
            const error = new Error('Access denied. Admin rights required');
            error.status = 403;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            return next(error);
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Admin login successfully",
            token,
            admin: { id: user._id, email: user.email }
        });
    } catch (error){
        next(error);
    }
};

module.exports = { adminLogin };