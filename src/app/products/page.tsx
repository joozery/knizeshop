"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MachineCard } from "@/components/home/machine-card";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronRight, 
  LayoutGrid, 
  List,
  Monitor,
  Cpu,
  Zap,
  HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MACHINES = [
  {
    id: "KORI-01",
    name: "KORI 01 (ULTRA SET)",
    rating: 4.9,
    reviews: 156,
    status: "ว่าง",
    price: "฿280 / hr",
    specs: {
      cpu: "Intel Core i9 14900k",
      ram: "DDR5 64GB 6400MHz",
      disk: "2TB NVMe Gen5",
      gpu: "RTX 4090 24GB"
    },
    image: "/cover/gif.gif",
    highlight: true
  },
  {
    id: "KORI-03",
    name: "KORI 03 (Gaming Pro)",
    rating: 3.9,
    reviews: 120,
    status: "ว่าง",
    price: "฿150 / hr",
    specs: {
      cpu: "Intel Core i5 13400f",
      ram: "DDR5 16GB",
      disk: "512 GB SSD",
      gpu: "RTX 3070 Ti"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-02",
    name: "KORI 02 (Streamer Set)",
    rating: 3.9,
    reviews: 104,
    status: "ว่าง",
    price: "฿120 / hr",
    specs: {
      cpu: "Intel Core i5 12400",
      ram: "DDR4 16 GB 3200",
      disk: "512 GB Nvme",
      gpu: "RTX 3070 Ti"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-06",
    name: "KORI 06 (Budget King)",
    rating: 3.9,
    reviews: 92,
    status: "ว่าง",
    price: "฿180 / hr",
    specs: {
      cpu: "AMD Ryzen 5 4500",
      ram: "DDR4 16 GB 2666",
      disk: "512 GB Nvme",
      gpu: "GTX 1080 Ti"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-10",
    name: "KORI 10 (Competitive)",
    rating: 3.8,
    reviews: 90,
    status: "ว่าง",
    price: "฿200 / hr",
    specs: {
      cpu: "AMD Ryzen 5 5500",
      ram: "DDR4 16GB 2400",
      disk: "NVME 512 GB",
      gpu: "RX 5700 XT"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-16",
    name: "KORI 16 (Classic Performance)",
    rating: 3.3,
    reviews: 66,
    status: "ว่าง",
    price: "฿250 / hr",
    specs: {
      cpu: "AMD Ryzen 5 2600",
      ram: "DDR4 16GB 2133",
      disk: "1250 GB hybrid",
      gpu: "GTX 1080 Ti"
    },
    image: "/cover/gif.gif"
  },
  {
    id: "KORI-20",
    name: "KORI 20 (Cloud Station)",
    rating: 4.2,
    reviews: 45,
    status: "ว่าง",
    price: "฿320 / hr",
    specs: {
      cpu: "Intel Xeon Gold",
      ram: "128GB ECC",
      disk: "4TB RAID 0",
      gpu: "A100 Tensor Core"
    },
    image: "/cover/gif.gif"
  }
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedGPUs, setSelectedGPUs] = React.useState<string[]>([]);
  const [selectedChip, setSelectedChip] = React.useState("ทั้งหมด");

  const filteredMachines = React.useMemo(() => {
    return MACHINES.filter((m) => {
      // Search Filter
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           m.specs.cpu.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           m.specs.gpu.toLowerCase().includes(searchQuery.toLowerCase());
      
      // GPU Filter
      const matchesGPU = selectedGPUs.length === 0 || selectedGPUs.some(gpu => m.specs.gpu.includes(gpu.split(' ')[1]));

      // Chip Filter
      let matchesChip = true;
      if (selectedChip === "ว่างตอนนี้") matchesChip = m.status === "ว่าง";
      if (selectedChip === "ยอดนิยม") matchesChip = m.rating >= 4.0;
      if (selectedChip === "สเปกทำงาน") matchesChip = m.specs.ram.includes("64GB") || m.specs.cpu.includes("Xeon");
      if (selectedChip === "สเปกเล่นเกม") matchesChip = m.specs.gpu.includes("RTX") || m.specs.gpu.includes("GTX");

      return matchesSearch && matchesGPU && matchesChip;
    });
  }, [searchQuery, selectedGPUs, selectedChip]);

  const toggleGPU = (gpu: string) => {
    setSelectedGPUs(prev => 
      prev.includes(gpu) ? prev.filter(g => g !== gpu) : [...prev, gpu]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-orange-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        {/* Breadcrumbs & Title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
               <span>Home</span>
               <ChevronRight className="h-3 w-3" />
               <span className="text-orange-500">All Products</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 leading-none">
              เครื่องเช่าสเปกแท้ <span className="text-orange-500">24/7</span>
            </h1>
            <p className="text-sm font-bold text-zinc-500/80 max-w-xl">
              เลือกเครื่องคอมพิวเตอร์ออนไลน์ที่เหมาะกับคุณ ไม่ว่าจะเป็นเล่นเกมลื่นๆ สเปกทำงานกราฟิก หรือเซิร์ฟเวอร์ความเร็วสูง
            </p>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center bg-white border border-zinc-200 rounded-xl p-1 shadow-sm">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
             </div>
             <Button className="h-11 px-6 bg-zinc-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-500 transition-all shadow-xl shadow-black/5">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> ตัวกรองละเอียด
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-6">
             <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm sticky top-32">
                <div className="relative mb-8">
                   <input 
                     type="text" 
                     placeholder="ค้นหาชื่อเครื่อง..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-slate-50 border-none rounded-xl h-12 pl-12 pr-4 text-sm font-bold text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                   />
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                </div>

                <div className="space-y-8">
                   <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-4">หมวดหมู่ GPU</h4>
                      <div className="space-y-3">
                        {['RTX 40 Series', 'RTX 30 Series', 'GTX Series', 'AMD Radeon'].map((cat) => (
                           <label 
                             key={cat} 
                             className="flex items-center group cursor-pointer"
                             onClick={() => toggleGPU(cat)}
                           >
                              <div className={`h-5 w-5 rounded-lg border-2 transition-all flex items-center justify-center p-0.5 ${selectedGPUs.includes(cat) ? 'border-orange-500 bg-orange-500' : 'border-zinc-200 group-hover:border-orange-500'}`}>
                                 {selectedGPUs.includes(cat) && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                              </div>
                              <span className={`ml-3 text-[13px] font-bold transition-colors ${selectedGPUs.includes(cat) ? 'text-zinc-900' : 'text-zinc-500 group-hover:text-zinc-900'}`}>{cat}</span>
                           </label>
                        ))}
                      </div>
                   </div>

                   <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-4">ช่วงราคา (ต่อชั่วโมง)</h4>
                      <div className="px-2">
                         <div className="h-1.5 w-full bg-zinc-100 rounded-full relative overflow-hidden">
                            <div className="absolute inset-y-0 left-[20%] right-[40%] bg-orange-500" />
                         </div>
                         <div className="flex justify-between mt-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                            <span>฿100</span>
                            <span>฿500</span>
                         </div>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-zinc-100">
                      <div className="flex flex-col gap-2">
                        {[
                          { name: 'CPUสเปกสูง', icon: Cpu },
                          { name: 'เน้นกราฟิก', icon: Monitor },
                          { name: 'ความเร็วเน็ต', icon: Zap },
                          { name: 'พื้นที่เก็บข้อมูล', icon: HardDrive }
                        ].map((btn) => (
                           <button key={btn.name} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-zinc-500 hover:text-zinc-900 transition-all font-bold text-xs text-left group">
                              <btn.icon className="h-4 w-4 text-zinc-300 group-hover:text-orange-500" />
                              {btn.name}
                           </button>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* Product Grid Area */}
          <div className="space-y-8">
            {/* Quick Chips Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
               {['ทั้งหมด', 'ว่างตอนนี้', 'ยอดนิยม', 'สเปกทำงาน', 'สเปกเล่นเกม', 'โปรโมชั่น'].map((chip) => (
                  <button 
                    key={chip} 
                    onClick={() => setSelectedChip(chip)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedChip === chip ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white border border-zinc-200 text-zinc-500 hover:border-orange-500/30'}`}
                  >
                    {chip}
                  </button>
               ))}
            </div>

            {/* Grid */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6" 
              : "flex flex-col gap-4"
            }>
               {filteredMachines.length > 0 ? (
                 filteredMachines.map((machine, index) => (
                   <MachineCard key={machine.id} machine={machine} index={index} />
                 ))
               ) : (
                 <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="h-16 w-16 bg-slate-50 text-zinc-300 rounded-2xl flex items-center justify-center">
                       <Search className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">ไม่พบรายการที่ค้นหา</h3>
                       <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">ลองปรับเปลี่ยนตัวกรองใหม่อีกครั้ง</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => { setSearchQuery(""); setSelectedGPUs([]); setSelectedChip("ทั้งหมด"); }}
                      className="rounded-xl border-zinc-200 text-xs font-black uppercase tracking-widest h-10 px-6"
                    >
                      ล้างตัวกรองทั้งหมด
                    </Button>
                 </div>
               )}
            </div>

            {/* Pagination Placeholder */}
            <div className="pt-12 flex items-center justify-center gap-3">
               {[1, 2, 3, '...', 12].map((p, i) => (
                  <button key={i} className={`h-10 w-10 flex items-center justify-center rounded-xl font-black text-xs transition-all ${i === 0 ? 'bg-white border-2 border-orange-500 text-orange-500' : 'text-zinc-400 hover:text-orange-500'}`}>
                    {p}
                  </button>
               ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
