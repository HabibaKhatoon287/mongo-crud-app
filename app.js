const express = require('express');
const app = express();
const http = require('http').Server(app);

// Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB using your Atlas connection string
mongoose.connect("mongodb+srv://habibakhatoon287:6cCBS9IEo8TxusZP@crud-app.g6ob1.mongodb.net/?retryWrites=true&w=majority&appName=crud-app", {
    useNewUrlParser: true,   //modern Mongoose features like the new URL parser and unified topology to ensure stable and efficient connections.
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.use(express.json());

// Import the User model
const User = require('./models/userModel');

// // Function to insert a new user into the database----> it working as a standalone function within the server initialization process.
// async function insert(){
//     try {
//         await User.create({
//             name: 'Habiba',
//             email: 'habiba@gmail.com'
//         });
//         console.log('User created successfully!');
//     } catch (err) {
//         console.error('Error creating user:', err);
//     }
// }
// insert();

// // CREATE Operation - Insert a new user into the database (POST)--->it is not showing actual error 
// app.post('/users', async (req, res) => {
//     try {
//         const { name, email } = req.body; // Get name and email from request body
//         const newUser = new User({
//             name: name,
//             email: email
//         });
        
//         // Save the new user to MongoDB
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (err) {
//         res.status(500).json({ message: 'Error creating user', error: err });
//     }
// });

// CREATE Operation - Insert a new user into the database (POST)
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body; // Get name and email from request body

        // Check if name and email are provided
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and Email are required' });
        }

        const newUser = new User({
            name: name,
            email: email
        });

        // Save the new user to MongoDB
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error('Error creating user:', err); // Log the error to the console
        res.status(500).json({ message: 'Error creating user', error: err.message || err });
    }
});


// READ Operation - Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
});

// READ Operation - Get a user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId); // Fetch user by ID

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
});

// UPDATE Operation - Update a user by ID
app.put('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        // Update the user by ID with the new data
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (updatedUser) {
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
});

// Start the server on port 3000
http.listen(3000, function(){
    console.log('Server is running on port 3000');
});
