const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// MongoDB connection (make sure to replace with your correct credentials)
mongoose.connect('mongodb+srv://paarth23cse:w5LgHsxviJgVsHx7@cse2.zlj1z.mongodb.net/WealthWave?retryWrites=true&w=majority&appName=CSE2', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true }
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Sign up route
app.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    phone
  });

  // Save user to database
  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user to database', error });
  }
});

// Server port
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});