import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB for high-qual GIFs
}).single("image");

import fs from "fs";
import path from "path";

// Error-Safe Upload Route
router.post("/", (req, res) => {
  const logFile = path.join(process.cwd(), "upload_debug.log");
  const log = (msg: string) => {
     const time = new Date().toISOString();
     fs.appendFileSync(logFile, `[${time}] ${msg}\n`);
  };

  log("📥 New Upload Request Started");
  log(`Headers: ${JSON.stringify(req.headers)}`);

  upload(req, res, (err) => {
    if (err) {
      log(`❌ Multer/Upload Error: ${JSON.stringify(err)}`);
      return res.status(400).json({ 
        message: "ข้อผิดพลาดจากการอัปโหลดไฟล์", 
        error: err.code || "UNKNOWN",
        details: err.message 
      });
    }

    if (!req.file) {
      log("❌ No file found in request");
      return res.status(400).json({ message: "ไม่พบไฟล์ที่ต้องการอัปโหลด" });
    }

    log(`📦 Processing file: ${req.file.originalname} (${req.file.size} bytes)`);

    try {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "knizeshop/uploads",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            log(`🔥 Cloudinary Error: ${JSON.stringify(error)}`);
            return res.status(500).json({ message: "Cloudinary Error", error });
          }
          
          log(`✅ Success: ${result?.secure_url}`);
          res.json({ url: result?.secure_url });
        }
      );

      stream.end(req.file.buffer);
    } catch (streamErr: any) {
      log(`🔥 Stream Exception: ${streamErr.message}`);
      res.status(500).json({ message: "Streaming failed", error: streamErr.message });
    }
  });
});

export default router;
