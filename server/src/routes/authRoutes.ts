import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// Generate Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
};

// @desc    Register user
// @route   POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password, // Hashed by pre-save hook
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id as string),
      });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    console.log("Login Attempt:", { email, found: !!user, role: user?.role });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id as string),
      });
    } else {
      console.log("Login Failed: Password mismatch or user not found");
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
