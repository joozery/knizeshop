"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { ProductToolbar } from "@/components/home/product-toolbar";
import { MachineCard } from "@/components/home/machine-card";

const MACHINES = [
  {
    id: "KORI-03",
    name: "KORI 03 (Valoran...",
    rating: 3.9,
    reviews: 120,
    status: "ว่าง",
    price: "฿150 / hr",
    specs: {
      cpu: "Intel Core i5 13400f",
      ram: "DDR5 16GB",
      disk: "512",
      gpu: "RTX 3070 Ti"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-02",
    name: "KORI 02 (Valoran...",
    rating: 3.9,
    reviews: 104,
    status: "ว่าง",
    price: "฿120 / hr",
    specs: {
      cpu: "Intel Core i5 12400",
      ram: "DDR4 16 GB 3200",
      disk: "512 GB Nvme",
      gpu: "NVIDAI RTX 3070 Ti"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-06",
    name: "KORI 06 (Valoran...",
    rating: 3.9,
    reviews: 92,
    status: "ว่าง",
    price: "฿180 / hr",
    specs: {
      cpu: "AMD Ryzen 5 4500",
      ram: "DDR4 16 GB 2666",
      disk: "512 GB Nvme",
      gpu: "NVIDAI GTX 1080 Ti"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-10",
    name: "KORI 10 (Valoran...",
    rating: 3.8,
    reviews: 90,
    status: "ว่าง",
    price: "฿200 / hr",
    specs: {
      cpu: "AMD Ryzen 5 5500",
      ram: "DDR4 16GB 2400",
      disk: "NVME 512 GB",
      gpu: "AMD RX 5700 XT"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-16",
    name: "KORI 16 (Valoran...",
    rating: 3.3,
    reviews: 66,
    status: "ว่าง",
    price: "฿250 / hr",
    specs: {
      cpu: "AMD Ryzen 5 2600",
      ram: "DDR4 16GB 2133",
      disk: "250 GB Nvme + 1000...",
      gpu: "NVIDAI GTX 1080 Ti"
    },
    image: "/cover/gif.gif"
  }
];

import { PopularGames } from "@/components/home/popular-games";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500/30 overflow-x-hidden bg-watermark bg-fixed">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />

      <Navbar />

      <main className="pt-32 px-2 md:px-4 max-w-[1600px] mx-auto pb-16">
        <HeroSlider />
        <PopularGames />
        <ProductToolbar />

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {MACHINES.map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
