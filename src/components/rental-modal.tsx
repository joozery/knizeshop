"use client";

import React from "react";
import { 
  X, 
  Cpu, 
  Zap, 
  HardDrive, 
  Monitor, 
  Clock, 
  Ticket, 
  Wallet, 
  AlertCircle,
  ChevronDown
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RentalModalProps {
  children: React.ReactNode;
  machine: {
    id: string;
    name: string;
    price: string;
    specs: {
      cpu: string;
      ram: string;
      disk: string;
      gpu: string;
    };
  };
}

export function RentalModal({ children, machine: m }: RentalModalProps) {
  const [hours, setHours] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [accepted, setAccepted] = React.useState(false);
  const [userBalance, setUserBalance] = React.useState(12.11); // Mock balance
  
  // Handle both string "฿150 / hr" and direct number from API
  const rawPrice = (m as any).price?.hourly || m.price || 0;
  const pricePerHour = typeof rawPrice === "number" 
    ? rawPrice 
    : parseInt(String(rawPrice).replace(/[^0-9]/g, "")) || 0;

  const totalPrice = hours * pricePerHour;
  const isBalanceEnough = userBalance >= totalPrice;

  return (
    <Dialog>
      <DialogTrigger render={children}>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] p-0 bg-[#0C0C0E] border-white/5 rounded-2xl overflow-hidden text-white shadow-2xl">
        <DialogHeader className="p-6 pb-2 relative">
          <DialogTitle className="text-xl font-black uppercase tracking-tight">ยืนยันการเช่า</DialogTitle>
          <p className="text-zinc-500 text-[10px] mt-1 font-bold">เลือกชั่วโมงสำหรับเครื่อง {m.name}</p>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh] custom-scrollbar">
          {/* Machine Header */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 blur-2xl" />
             <h4 className="text-sm font-black uppercase truncate relative z-10">{m.name}</h4>
             <p className="text-zinc-500 text-[9px] font-bold mt-0.5 relative z-10">฿{pricePerHour}/hr</p>
          </div>

          {/* Specs Grid */}
          <div className="space-y-2">
             {[
               { icon: Cpu, label: "CPU", value: m.specs?.cpu },
               { icon: Zap, label: "RAM", value: m.specs?.ram },
               { icon: HardDrive, label: "DISK", value: m.specs?.ssd || (m.specs as any)?.disk },
               { icon: Monitor, label: "GPU", value: m.specs?.gpu },
             ].map((spec, i) => (
               <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                  <spec.icon className="h-4 w-4 text-cyan-400 opacity-80" />
                  <span className="text-[10px] font-black text-zinc-500 uppercase w-8">{spec.label}</span>
                  <span className="text-[11px] font-bold text-zinc-300 truncate">{spec.value || '-'}</span>
               </div>
             ))}
          </div>

          {/* Hours Selector */}
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-400">
                <Clock className="h-4 w-4" /> จำนวนชั่วโมง
             </div>
             <div className="relative">
                <Input 
                  type="number" 
                  min={1} 
                  value={hours}
                  onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-14 bg-white/[0.03] border-white/10 rounded-xl px-5 text-lg font-black focus:ring-orange-500/20"
                />
             </div>
          </div>

          {/* Promo & Summary */}
          <div className="space-y-4">
             <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-400">
                   <Ticket className="h-4 w-4" /> ส่วนลด & สรุปยอดชำระ
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-600 transition-transform group-hover:text-zinc-400" />
             </div>

             <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2">
                   <div className="relative flex-1">
                      <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <Input 
                        placeholder="กรอกรหัสคูปอง" 
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="h-12 bg-white/[0.03] border-white/10 rounded-xl pl-12 text-sm font-bold" 
                      />
                   </div>
                   <Button variant="ghost" className="h-12 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest">
                      ใช้โค้ด
                   </Button>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400">
                      <div className="flex items-center gap-2">
                         <Wallet className="h-3.5 w-3.5" /> ยอดเงิน:
                      </div>
                      <span className="text-red-400">฿{userBalance.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400">
                      <span>ค่าเช่า ({hours} ชม.):</span>
                      <span>฿{totalPrice}</span>
                   </div>
                   
                   <div className="pt-3 border-t border-white/[0.05] flex justify-between items-end">
                      <span className="text-base font-black uppercase">ยอดชำระ:</span>
                      <span className="text-xl font-black text-cyan-400 tracking-tighter">฿{totalPrice}</span>
                   </div>

                   {!isBalanceEnough && (
                     <div className="flex items-center gap-2 text-red-500/80 text-[10px] font-bold uppercase animate-pulse">
                        <AlertCircle className="h-3 w-3" /> ยอดเงินไม่เพียงพอ กรุณาเติมเงิน
                     </div>
                   )}
                </div>
             </div>
          </div>

          {/* TOC Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
             <div className="pt-1">
                <input 
                  type="checkbox" 
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="rounded-md bg-white/5 border-white/20 text-orange-500 focus:ring-orange-500/20 h-5 w-5" 
                />
             </div>
             <p className="text-[11px] font-bold text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                ข้าพเจ้ายอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว 
                <span className="text-cyan-500/80 ml-1 hover:underline cursor-pointer">นโยบายการคืนเงิน</span> · 
                <span className="text-cyan-500/80 ml-1 hover:underline cursor-pointer">นโยบายความเป็นส่วนตัว</span> · 
                <span className="text-cyan-500/80 ml-1 hover:underline cursor-pointer">ข้อกำหนดการใช้งาน</span>
             </p>
          </label>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
             <Button 
               variant="outline" 
               className="flex-1 h-12 rounded-xl bg-white/[0.03] border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-widest transition-all"
             >
                ยกเลิก
             </Button>
             <Button 
               disabled={!accepted || !isBalanceEnough}
               className={cn(
                 "flex-1 h-12 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95",
                 isBalanceEnough 
                   ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20" 
                   : "bg-red-500/20 text-red-500/50 cursor-not-allowed border border-red-500/10"
               )}
             >
                ยืนยันเช่า
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
