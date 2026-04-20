import express, { Request, Response } from "express";
import Machine from "../models/Machine";
import { upload } from "../config/cloudinary";

const router = express.Router();

// @desc    Get all machines
// @route   GET /api/machines
router.get("/", async (req: Request, res: Response) => {
  try {
    const machines = await Machine.find().sort({ createdAt: -1 });
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Add new machine with image upload
// @route   POST /api/machines
router.post("/", upload.single("image"), async (req: Request, res: Response) => {
  try {
    const { name, category, cpu, gpu, ram, ssd, hourly, daily, image: bodyImage } = req.body;
    
    // Support both direct upload and pre-uploaded URL from body
    const image = req.file ? req.file.path : bodyImage;

    if (!image) {
      return res.status(400).json({ message: "Please provide an image" });
    }

    const newMachine = new Machine({
      name,
      category,
      specs: { cpu, gpu, ram, ssd },
      price: { hourly, daily },
      image,
      status: "available"
    });

    const savedMachine = await newMachine.save();
    res.status(201).json(savedMachine);
  } catch (error) {
    console.error("Machine Creation Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// @desc    Update machine status
// @route   PATCH /api/machines/:id/status
// @desc    Update machine
// @route   PUT /api/machines/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, category, cpu, gpu, ram, ssd, hourly, daily, image, status } = req.body;
    const updated = await Machine.findByIdAndUpdate(
      req.params.id, 
      {
        name,
        category,
        specs: { cpu, gpu, ram, ssd },
        price: { hourly, daily },
        image,
        status
      }, 
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

// @desc    Delete machine
// @route   DELETE /api/machines/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Machine.findByIdAndDelete(req.params.id);
    res.json({ message: "Machine deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

router.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const machine = await Machine.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(machine);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
