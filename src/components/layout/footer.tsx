"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, ShieldCheck, CreditCard, Headphones, MessageSquare, Globe, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand & Purpose */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 group-hover:scale-105 transition-all">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-zinc-900">KnizeShop</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs font-medium">
              ศูนย์รวมคอมพิวเตอร์สเปกแรงระดับไฮเอนด์สำหรับการเช่าออนไลน์ 
              มอบประสบการณ์การเล่นเกมที่ลื่นไหลที่สุดในประเทศไทย 
              พร้อมให้บริการดูแลตลอด 24 ชั่วโมง
            </p>
            <div className="flex items-center gap-4">
              {[MessageSquare, Globe, Send, Mail].map((Icon, i) => (
                <div key={i} className="h-9 w-9 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:bg-orange-50 transition-all cursor-pointer border border-black/5">
                   <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['หน้าแรก', 'หมวดหมู่สินค้า', 'เกมยอดนิยม', 'ระบบสถิติ', 'โปรโมชั่น'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-zinc-400 hover:text-orange-500 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-8">Support & Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/terms" className="text-sm font-bold text-zinc-400 hover:text-orange-500 transition-colors">เงื่อนไขการใช้บริการ</Link></li>
              <li><Link href="/privacy" className="text-sm font-bold text-zinc-400 hover:text-orange-500 transition-colors">นโยบายความเป็นส่วนตัว</Link></li>
              <li><Link href="#" className="text-sm font-bold text-zinc-400 hover:text-orange-500 transition-colors">คู่มือการเช่า</Link></li>
              <li><Link href="#" className="text-sm font-bold text-zinc-400 hover:text-orange-500 transition-colors">คำถามที่พบบ่อย</Link></li>
              <li><Link href="#" className="text-sm font-bold text-zinc-400 hover:text-orange-500 transition-colors">ติดต่อฝ่ายเทคนิค</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-8">Contact Us</h4>
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-3 text-zinc-500">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-bold">02-XXX-XXXX</span>
               </div>
               <div className="flex items-center gap-3 text-zinc-500">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-bold">support@knizeshop.com</span>
               </div>
               <div className="flex items-center gap-3 text-zinc-500">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-bold">Bangkok, Thailand</span>
               </div>
            </div>
            
            {/* Trust Badges */}
            <div className="pt-6 border-t border-black/5">
                <div className="flex items-center gap-4 opacity-30 grayscale">
                    <ShieldCheck className="h-8 w-8" />
                    <CreditCard className="h-8 w-8" />
                    <Headphones className="h-8 w-8" />
                </div>
                <p className="text-[10px] font-bold text-zinc-300 uppercase mt-2">Verified & Secure</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
             © 2026 KNIZE SHOP GLOBAL OPERATIONS. ALL RIGHTS RESERVED.
           </p>
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                 <span className="text-[10px] font-bold text-zinc-400 uppercase">System: Operational</span>
              </div>
              <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">MADE WITH PASSION BY OJAYSNOWY</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
