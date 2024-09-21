// import { User } from "../models/userModel.js";
// import jwt from 'jsonwebtoken';


// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };


// export const registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if user already exists
//         const userExists = await User.findOne({ email });

//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Create new user
//         const newUser = new User({
//             name,
//             email,
//             password,
//         });

//         await newUser.save();

//         // Generate JWT token
//         const token = generateToken(newUser._id);

//         res.status(201).json({
//             _id: newUser._id,
//             name: newUser.name,
//             email: newUser.email,
//             token,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user by email
//         const user = await User.findOne({ email });

//         if (user && (await user.matchPassword(password))) {
//             // Generate JWT token
//             const token = generateToken(user._id);

//             res.status(200).json({
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 token,
//             });
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// @desc Authenticate user & get token
// @route POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      // If user exists and password matches
      if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const token = generateToken(user._id);
  
        // Return token and userId in the response
        res.status(200).json({
          success: true,
          token: token,
          userId: user._id,  // Ensure the userId is included in the response
        });
      } else {
        // If email or password is invalid
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };