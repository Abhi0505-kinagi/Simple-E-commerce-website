const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const router=express.Router();
const bcrypt = require("bcryptjs");
router.use(express.json());
const cors = require('cors');
router.use(cors());
//new user registration 
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Incoming data:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User with this email already exists" });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




//user login authentication
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Step 2: Compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;