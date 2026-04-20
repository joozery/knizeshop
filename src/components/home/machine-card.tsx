"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Monitor, Activity, Zap, HardDrive, LogIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";
import { RentalModal } from "@/components/rental-modal";

interface MachineProps {
  machine: {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    status: string;
    price: string;
    specs: {
      cpu: string;
      ram: string;
      disk: string;
      gpu: string;
    };
    image: string;
    highlight?: boolean;
  };
  index: number;
}

export function MachineCard({ machine: m, index }: any) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, []);

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'available': return "ว่าง";
      case 'maintenance': return "ซ่อมบำรุง";
      case 'unavailable': return "ไม่ว่าง";
      default: return status;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`relative overflow-hidden border border-black/5 bg-white transition-all duration-300 rounded-2xl group shadow-sm hover:shadow-xl hover:translate-y-[-4px] ${m.highlight ? 'ring-2 ring-orange-500 shadow-[0_0_30px_rgba(234,88,12,0.1)]' : ''}`}>
        <div className="relative h-40 md:h-60 overflow-hidden p-2 md:p-3">
          <img src={m.image} alt={m.name} className="h-full w-full object-cover rounded-lg md:rounded-xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          
          {/* Branded Status Badge */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-gradient-to-r from-orange-500 to-red-600 text-white px-2 py-0.5 md:px-3 md:py-1 rounded lg md:rounded-lg flex items-center gap-1.5 md:gap-2 shadow-lg shadow-orange-500/20">
             <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-white opacity-80 animate-pulse" />
             <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{getStatusLabel(m.status)}</span>
          </div>
        </div>

        <div className="px-3 md:px-5 pb-4 md:pb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2 mb-1">
            <h3 className="text-[11px] md:text-[13px] font-black text-zinc-900 line-clamp-1 uppercase tracking-tighter">{m.name}</h3>
            <div className="flex items-center gap-1 shrink-0">
               <Star className="h-3 w-3 md:h-4 md:w-4 text-orange-500 fill-orange-500" />
               <span className="text-[10px] md:text-[12px] font-bold text-zinc-900">3.9</span>
            </div>
          </div>
          <div className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase mb-3 md:mb-4 flex items-center gap-1">
            <Monitor className="h-2.5 w-2.5 md:h-3 md:w-3" /> <span className="opacity-70">Provider:</span> KnizeShop
          </div>

          {/* Spec Rows - More Compact */}
          <div className="space-y-0.5 md:space-y-1 mb-3 md:mb-4">
            {[
              { icon: Activity, label: "CPU", value: m.specs?.cpu },
              { icon: Zap, label: "RAM", value: m.specs?.ram },
              { icon: HardDrive, label: "SSD", value: m.specs?.ssd },
              { icon: Monitor, label: "GPU", value: m.specs?.gpu },
            ].map((spec, i) => (
              <div key={i} className="flex items-center gap-1.5 md:gap-2 px-2 md:px-2.5 py-1 md:py-1.5 rounded-lg bg-orange-500/[0.02] border border-orange-500/[0.04] group/spec hover:bg-orange-500/[0.04] transition-colors">
                 <spec.icon className="h-2.5 w-2.5 md:h-3 md:w-3 text-orange-600 opacity-60" />
                 <div className="flex items-center gap-1 md:gap-1.5 overflow-hidden">
                    <span className="text-[7.5px] md:text-[8.5px] font-black text-orange-600/50 uppercase tracking-tighter shrink-0">{spec.label}</span>
                    <span className="text-[8.5px] md:text-[9.5px] font-bold text-zinc-600 line-clamp-1">{spec.value || '-'}</span>
                 </div>
              </div>
            ))}
          </div>

          {/* Pricing - Dual Display */}
          <div className="mb-4 flex items-center justify-between gap-2 px-1">
             <div className="flex flex-col">
                <span className="text-[7px] md:text-[8px] font-black uppercase text-zinc-400 tracking-widest leading-none mb-1">Hourly</span>
                <span className="text-[12px] md:text-[14px] font-black text-zinc-900 leading-none">฿{m.price?.hourly}</span>
             </div>
             <div className="h-6 w-[1px] bg-zinc-100" />
             <div className="flex flex-col items-end">
                <span className="text-[7px] md:text-[8px] font-black uppercase text-orange-500/60 tracking-widest leading-none mb-1">Daily Save</span>
                <span className="text-[12px] md:text-[14px] font-black text-orange-500 leading-none">฿{m.price?.daily}</span>
             </div>
          </div>

          {isLoggedIn ? (
            <RentalModal machine={m}>
               <Button className="w-full h-9 md:h-11 bg-orange-500 hover:bg-orange-600 border-none font-black text-[9px] md:text-[10px] uppercase tracking-widest rounded-lg md:rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all text-white">
                 <Zap className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> ยืนยันการเช่า
               </Button>
            </RentalModal>
          ) : (
             <AuthModal>
                <Button className="w-full h-9 md:h-11 bg-zinc-900 hover:bg-black border-none font-bold text-[9px] md:text-[10px] uppercase tracking-widest rounded-lg md:rounded-xl shadow-lg active:scale-95 transition-all text-white">
                  <LogIn className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> เข้าสู่ระบบ
                </Button>
             </AuthModal>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
