import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Create new user (By Admin)
// @route   POST /api/users
// @access  Private/Admin
router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || "user",
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Creation failed" });
  }
});

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
router.put("/:id/role", async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.role = role || user.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
