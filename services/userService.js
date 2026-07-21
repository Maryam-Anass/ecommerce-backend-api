const User = require('../models/userModel');

const findUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user;
};

const createUser = async (userData) => {
    return await User.create(userData); // Fixed typo: craete -> create
};

module.exports = {
    findUserByEmail, createUser
};