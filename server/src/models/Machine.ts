import mongoose, { Schema, Document } from "mongoose";

export interface IMachine extends Document {
  name: string;
  category: "Gaming" | "Server" | "Streaming";
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    ssd: string;
  };
  price: {
    hourly: number;
    daily: number;
  };
  image: string;
  status: "available" | "unavailable" | "maintenance";
  createdAt: Date;
}

const MachineSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["Gaming", "Server", "Streaming"] },
  specs: {
    cpu: { type: String, required: true },
    gpu: { type: String, required: true },
    ram: { type: String, required: true },
    ssd: { type: String, required: true },
  },
  price: {
    hourly: { type: Number, required: true },
    daily: { type: Number, required: true },
  },
  image: { type: String, required: true },
  status: { type: String, default: "available", enum: ["available", "unavailable", "maintenance"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMachine>("Machine", MachineSchema);
