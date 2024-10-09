const mongoose = require('mongoose');

//User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
