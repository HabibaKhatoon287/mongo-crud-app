const mongoose = require('mongoose');

// Define the User schema
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

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the model to be used in other files
module.exports = User;
