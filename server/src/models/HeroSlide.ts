import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    badge: { type: String, default: "Premium Content" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const HeroSlide = mongoose.model("HeroSlide", heroSlideSchema);
export default HeroSlide;
