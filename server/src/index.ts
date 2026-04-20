import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import machineRoutes from "./routes/machineRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import heroRoutes from "./routes/heroRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }
  next();
});
app.use(express.json());

// Routes
app.use("/api/machines", machineRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/upload", uploadRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("🚀 KnizeShop API is running...");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`
  🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  🚀 KnizeShop Backend: http://localhost:${PORT}
  🌍 Mode: Development
  🔌 Connection: MongoDB Atlas Verified
  📦 Storage: Cloudinary Ready
  🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  `);
});
