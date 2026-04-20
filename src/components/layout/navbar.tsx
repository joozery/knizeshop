"use client";

import React from "react";
import Link from "next/link";
import { Package, Star, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  
  // High-performance scroll transforms - Compact size
  const navWidth = useTransform(scrollY, [0, 80], ["100%", "92%"]);
  const navY = useTransform(scrollY, [0, 80], [0, 12]);
  
  // White Transparent Background on Scroll with Orange Border
  const bgColor = useTransform(
    scrollY, 
    [0, 80], 
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  const borderColor = useTransform(
    scrollY, 
    [0, 80], 
    ["rgba(234, 88, 12, 0)", "rgba(234, 88, 12, 1)"] // Orange border appears on scroll
  );
  
  const shadow = useTransform(scrollY, [0, 80], ["none", "0 10px 30px -10px rgba(0, 0, 0, 0.1)"]);
  const radius = useTransform(scrollY, [0, 80], ["0px", "24px"]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div 
        style={{ 
          width: navWidth, 
          y: navY,
          backgroundColor: bgColor,
          borderColor: borderColor,
          boxShadow: shadow,
          borderRadius: radius,
        }}
        className="pointer-events-auto backdrop-blur-xl transition-all duration-500 overflow-hidden border-2"
      >
        <div className="max-w-[1600px] mx-auto px-8 h-18 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-orange-500/10 group-hover:rotate-6 transition-transform">
                <img 
                  src="/logo/logo.jpg" 
                  alt="KnizeShop Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-lg font-bold tracking-tighter uppercase text-zinc-900 leading-none">KnizeShop</span>
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-orange-500">Global Operations</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {[
                { name: 'หน้าแรก' },
                { name: 'สินค้า' },
                { name: 'รีวิว' },
                { name: 'ช่วยเหลือ' }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href="#" 
                  className="px-4 py-2 rounded-xl hover:bg-orange-500/5 transition-all group"
                >
                  <span className="text-[14px] font-semibold text-zinc-600 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Action Center */}
          <div className="flex items-center gap-2">
            <AuthModal>
                <Button variant="ghost" className="h-10 px-6 rounded-xl font-semibold text-[14px] text-zinc-600 hover:text-orange-600 hover:bg-orange-50">
                    เข้าสู่ระบบ
                </Button>
            </AuthModal>
            <AuthModal>
                <Button className="h-10 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[14px] shadow-lg shadow-orange-500/10 active:scale-95 transition-all border-none">
                    เริ่มใช้งาน <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </AuthModal>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
