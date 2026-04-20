"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { ProductToolbar } from "@/components/home/product-toolbar";
import { MachineCard } from "@/components/home/machine-card";
import { PopularGames } from "@/components/home/popular-games";

export default function Home() {
  const [machines, setMachines] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/machines");
        if (res.ok) {
          const data = await res.json();
          setMachines(data);
        }
      } catch (error) {
        console.error("Home fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMachines();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500/30 overflow-x-hidden bg-watermark bg-fixed">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.05] pointer-events-none" />

      <Navbar />

      <main className="pt-32 px-8 md:px-24 max-w-[1600px] mx-auto pb-16">
        <HeroSlider />
        <PopularGames />
        <ProductToolbar />

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {machines.map((machine, index) => (
            <MachineCard key={machine._id} machine={machine} index={index} />
          ))}
          {machines.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center opacity-50 font-bold uppercase tracking-widest text-xs">
              ยังไม่มีเครื่องว่างในขณะนี้
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
