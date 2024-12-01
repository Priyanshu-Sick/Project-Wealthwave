const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;