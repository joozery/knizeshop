"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export function ProductToolbar() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 pt-12">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white border border-black/5 px-6 py-3 rounded-xl cursor-pointer hover:bg-zinc-50 transition-all shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">หมวดหมู่ทั้งหมด</span>
          <ChevronDown className="h-4 w-4 text-orange-500" />
        </div>
        <div className="flex items-center gap-2 bg-white border border-black/5 px-6 py-3 rounded-xl cursor-pointer hover:bg-zinc-50 transition-all shadow-sm">
          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">เรียงตาม: ล่าสุด</span>
          <ChevronDown className="h-4 w-4 text-orange-500" />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-lg border border-orange-500/10">
          <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Live Status: Online</span>
        </div>
        <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-l border-black/5 pl-6">Available: 13 Machines</div>
      </div>
    </div>
  );
}
