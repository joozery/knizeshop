import express from "express";
import HeroSlide from "../models/HeroSlide";

const router = express.Router();

// GET all active slides for storefront
router.get("/", async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching slides" });
  }
});

// GET all slides for admin (including inactive)
router.get("/admin", async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin slides" });
  }
});

// POST new slide
router.post("/", async (req, res) => {
  try {
    const newSlide = new HeroSlide(req.body);
    const saved = await newSlide.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating slide" });
  }
});

// PUT update slide
router.put("/:id", async (req, res) => {
  try {
    const updated = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating slide" });
  }
});

// DELETE slide
router.delete("/:id", async (req, res) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting slide" });
  }
});

export default router;
