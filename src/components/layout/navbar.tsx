"use client";

import React from "react";
import Link from "next/link";
import { 
  Package, 
  Headphones, 
  ArrowRight,
  LayoutGrid, 
  Monitor, 
  Wallet, 
  History, 
  Star, 
  MessageCircle, 
  Bell, 
  User, 
  CreditCard, 
  Trophy,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthModal } from "@/components/auth-modal";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  
  React.useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  
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
        className="pointer-events-auto backdrop-blur-xl overflow-hidden border-2"
      >
        <div className="max-w-[1600px] mx-auto px-8 h-18 flex items-center justify-between">
          {/* Brand & Navigator */}
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg shadow-orange-500/10 group-hover:rotate-12 transition-transform duration-500">
                <img src="/logo/logo.jpg" alt="KnizeShop" className="w-full h-full object-cover" />
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-lg font-bold tracking-tighter uppercase text-zinc-900 leading-none">KnizeShop</span>
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-orange-500 underline decoration-2">CORE</span>
              </div>
            </Link>
          </div>

          {/* Right: Menu & Action Center */}
          <div className="flex items-center gap-8">
            {isMounted && user && (
              <nav className="hidden xl:flex items-center gap-1">
                {[
                  { name: 'แดชบอร์ด', icon: LayoutGrid, href: '/dashboard' },
                  { name: 'สินค้า', icon: Monitor, href: '/products' },
                  { name: 'เติมเงิน', icon: Wallet, href: '/topup' },
                  { name: 'ประวัติ', icon: History, href: '/history' },
                  { name: 'รีวิว', icon: Star, href: '#' },
                  { name: 'ติดต่อ', icon: MessageCircle, href: '#' }
                ].map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl hover:bg-zinc-100 group transition-all duration-300"
                  >
                    <item.icon className="h-4 w-4 text-zinc-500 group-hover:text-orange-500 transition-colors" />
                    <span className="text-[13px] font-bold text-zinc-600 group-hover:text-zinc-900 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
            )}

            {isMounted && user ? (
              <div className="flex items-center gap-4">
                <button className="h-10 w-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-orange-600 hover:bg-orange-50 transition-all active:scale-95">
                  <Bell className="h-5 w-5" />
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger 
                    render={
                      <button type="button" className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all active:scale-95 group shadow-xl cursor-pointer outline-none">
                        <Avatar className="h-8 w-8 rounded-xl border-2 border-orange-500/20">
                          <AvatarImage src="/logo/logo.jpg" />
                          <AvatarFallback className="bg-orange-600 font-bold uppercase">{user?.username?.substring(0, 2) || "KS"}</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4 text-zinc-500 group-data-[state=open]:rotate-180 transition-transform" />
                      </button>
                    }
                  />
                  <DropdownMenuContent 
                    className="w-[260px] bg-white border-zinc-200/60 rounded-3xl p-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] mt-3 text-zinc-900 z-[100] overflow-hidden" 
                    align="end"
                    sideOffset={8}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="p-4 pb-2">
                        <div className="flex flex-col space-y-0.5">
                          <p className="text-[14px] font-black uppercase tracking-tight text-zinc-900">{user?.username || "Gamer"}</p>
                          <p className="text-[10px] text-zinc-400 font-medium truncate">{user?.email || ""}</p>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator className="bg-zinc-100 mx-2 my-1" />
                    
                    <div className="p-1 space-y-0.5">
                      <DropdownMenuItem className="focus:bg-zinc-50 rounded-2xl cursor-pointer p-2.5 group transition-all duration-200 outline-none">
                        <div className="flex items-center w-full">
                          <User className="h-4 w-4 text-zinc-400 group-hover:text-orange-600 mr-3 transition-colors" />
                          <span className="text-[13px] font-bold text-zinc-600 group-hover:text-zinc-900">โปรไฟล์</span>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="focus:bg-zinc-50 rounded-2xl cursor-pointer p-2.5 group transition-all duration-200 outline-none">
                        <div className="flex items-center w-full">
                          <CreditCard className="h-4 w-4 text-zinc-400 group-hover:text-orange-600 mr-3 transition-colors" />
                          <div className="flex justify-between items-center flex-1">
                            <span className="text-[13px] font-bold text-zinc-600 group-hover:text-zinc-900">ยอดเงิน :</span>
                            <span className="text-[13px] font-black text-orange-600">0.00 บาท</span>
                          </div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="focus:bg-zinc-50 rounded-2xl cursor-pointer p-2.5 group transition-all duration-200 outline-none">
                        <div className="flex items-center w-full">
                          <Trophy className="h-4 w-4 text-zinc-400 group-hover:text-orange-600 mr-3 transition-colors" />
                          <div className="flex justify-between items-center flex-1">
                            <span className="text-[13px] font-bold text-zinc-600 group-hover:text-zinc-900">พอยท์ :</span>
                            <span className="text-[13px] font-black text-orange-600">0</span>
                          </div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="focus:bg-zinc-50 rounded-2xl cursor-pointer p-2.5 group transition-all duration-200 outline-none">
                        <div className="flex items-center w-full">
                          <History className="h-4 w-4 text-zinc-400 group-hover:text-orange-600 mr-3 transition-colors" />
                          <span className="text-[13px] font-bold text-zinc-600 group-hover:text-zinc-900">ประวัติการเช่า</span>
                        </div>
                      </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="bg-zinc-100 mx-2 my-1" />
                    
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="focus:bg-red-50 text-red-600 rounded-2xl cursor-pointer p-3 group transition-all outline-none"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <LogOut className="h-4 w-4" />
                        <span className="text-[11px] font-black uppercase tracking-widest">ออกจากระบบ</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
            <div className="flex items-center gap-2">
                <AuthModal>
                    <button type="button" className={cn(buttonVariants({ variant: "ghost" }), "h-10 px-6 rounded-xl font-semibold text-[14px] text-zinc-600 hover:text-orange-600 hover:bg-orange-50 cursor-pointer flex items-center justify-center transition-all active:scale-95")}>
                        เข้าสู่ระบบ
                    </button>
                </AuthModal>
                <AuthModal>
                    <button type="button" className={cn(buttonVariants(), "h-10 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[14px] shadow-lg shadow-orange-500/10 active:scale-95 transition-all border-none cursor-pointer flex items-center justify-center")}>
                        เริ่มใช้งาน <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </AuthModal>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
}
