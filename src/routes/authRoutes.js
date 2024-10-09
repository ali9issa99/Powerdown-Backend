// import express from 'express';
// import { loginUser, registerUser } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/login', loginUser);
// router.post('/register', registerUser);

// export default router;

import express from 'express';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating tokens
import { getUserByEmail, createUser } from '../controllers/usersController.js'; // Fetch user by email and create user

const router = express.Router();

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await getUserByEmail(email);

//     if (!user) {
//       return res.status(400).json({ success: false, message: 'User not found.' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid credentials.' });
//     }

//     // Generate the token
//     const token = generateToken(user._id);

//     // Respond with token and user info
//     res.status(200).json({
//       success: true,
//       token, // Return the token
//       userId: user._id, // Send the user ID
//       name: user.name, // Optionally send user name or any other details
//       email: user.email, // Optionally send user email
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// Fetch user by email and create user


// Register route
// routes/authRoutes.js


// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    // Create a new user
    const newUser = await createUser({ name, email, password });

    // Generate the token
    const token = generateToken(newUser._id);

    // Respond with token and user info
    res.status(201).json({
      success: true,
      token,
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    console.error("Error during registration:", err); // Log the entire error object
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await getUserByEmail(email);
    console.log("User retrieved during login:", user);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found.' });
    }

    // Compare the submitted password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }

    // Generate the token
    const token = generateToken(user._id);

    // Respond with token and user info
    res.status(200).json({
      success: true,
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Error during login:", err); // Log the entire error object
    res.status(500).json({ success: false, message: 'Server error' });
  }
//   console.log("Plain password from request:", password);
// console.log("Hashed password from database:", user.password);

});





export default router;
