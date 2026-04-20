"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { 
  Wallet, 
  Trophy, 
  Clock, 
  Calendar,
  ChevronRight,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  CreditCard,
  Plus
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-orange-500/30 overflow-x-hidden">
      <Navbar />

      <main className="relative pt-28 pb-16 px-4 md:px-8 max-w-[1240px] mx-auto space-y-6">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-orange-500/5 blur-[120px] -z-10" />

        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-orange-600 font-bold uppercase tracking-wider text-[10px]">
              <Zap className="h-2.5 w-2.5" /> Dashboard Overview
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              ยินดีต้อนรับ, <span className="text-orange-500">{user?.username || "Gamer"}</span>!
            </h1>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-1">จัดการเครื่องเช่าและยอดเงินของคุณได้ที่นี่</p>
          </div>
          
          <div className="flex items-center gap-2">
             <Button className="bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-xl h-10 px-4 text-xs font-bold shadow-sm transition-all active:scale-95">
                <Calendar className="mr-2 h-3.5 w-3.5 text-orange-500" /> นัดหมายใช้งาน
             </Button>
             <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-10 px-6 text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/10 transition-all active:scale-95 border-none">
                <Plus className="mr-2 h-4 w-4" /> เติมเงินเข้าระบบ
             </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "ยอดเงินคงเหลือ", value: "0.00 ฿", icon: Wallet, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "พอยท์สะสม", value: "0 PTS", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "เครื่องที่กำลังเช่า", value: "0 เครื่อง", icon: ZapIcon, color: "text-orange-600", bg: "bg-orange-50" },
            { label: "เช่าทั้งหมด", value: "0 ครั้ง", icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50" },
          ].map((stat, i) => (
            <Card key={i} className="border border-slate-200/60 shadow-sm rounded-2xl overflow-hidden bg-white group hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-200 group-hover:text-orange-400 transition-colors" />
                </div>
                <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-0.5">{stat.label}</p>
                <div className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Rentals */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
               <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 เครื่องที่กำลังทำงานอยู่ <span className="h-5 w-5 rounded-lg bg-orange-500 text-white text-[9px] flex items-center justify-center font-bold">0</span>
               </h2>
               <Button variant="link" className="text-orange-500 font-bold text-[11px] p-0 h-auto">ดูทั้งหมด <ChevronRight className="ml-1 h-3 w-3" /></Button>
            </div>
            
            {/* Empty State */}
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="h-14 w-14 bg-slate-50 text-slate-200 rounded-xl flex items-center justify-center mb-1">
                  <MonitorIcon className="h-8 w-8" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-black text-[13px] text-slate-900 uppercase tracking-wide">ยังไม่มีเครื่องที่กำลังเปิดใช้งาน</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider max-w-[200px]">เริ่มจองเครื่องสเปกไฮเอนด์ได้ทันที</p>
                </div>
                <Button className="mt-2 bg-slate-900 text-white rounded-xl px-6 h-10 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all border-none shadow-lg shadow-black/10">ไปที่หน้าร้านค้า</Button>
            </div>
          </div>

          {/* Quick Actions & Recent History */}
          <div className="space-y-6">
             <div className="space-y-4">
               <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">เมนูลัด</h2>
               <div className="grid grid-cols-1 gap-2">
                 {[
                   { label: "ดูประวัติการเช่า", icon: Clock, desc: "ตรวจสอบเซสชั่นย้อนหลัง" },
                   { label: "จัดการโปรไฟล์", icon: ShieldCheck, desc: "ความปลอดภัยและข้อมูลส่วนตัว" },
                   { label: "เติมเงินผ่านบัตร", icon: CreditCard, desc: "Truemoney, Promptpay, Debit" },
                 ].map((action, i) => (
                   <button key={i} className="flex items-center p-4 bg-white rounded-2xl border border-slate-200/60 hover:border-orange-500/30 hover:bg-orange-50/10 transition-all group text-left outline-none">
                     <div className="h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-orange-500/10 transition-colors">
                       <action.icon className="h-4 w-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                     </div>
                     <div className="flex-1">
                       <p className="font-black text-slate-900 text-xs uppercase tracking-tight">{action.label}</p>
                       <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mt-1">{action.desc}</p>
                     </div>
                     <ChevronRight className="h-3.5 w-3.5 text-slate-200 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                   </button>
                 ))}
               </div>
             </div>

             <Card className="border-none shadow-md rounded-2xl bg-orange-600 text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                <CardContent className="p-6 relative z-10 space-y-3">
                   <Zap className="h-8 w-8 text-white opacity-40" />
                   <h3 className="text-lg font-black leading-tight uppercase italic underline decoration-1">Monthly Coins x2</h3>
                   <p className="text-orange-100 text-[10px] font-bold leading-relaxed uppercase tracking-wider opacity-80">
                     สิทธิพิเศษสมาชิกพรีเมียม รับส่วนลดสูงสุด 20% และพอยท์พิเศษ
                   </p>
                   <Button className="w-full bg-white text-orange-600 hover:bg-orange-50 rounded-xl h-9 text-[10px] font-black uppercase tracking-widest border-none transition-all active:scale-95 mt-1">Upgrade Now</Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function MonitorIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function ZapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.71 12 3l1.55 7.14H20l-8 11.71L10.45 14.71z" />
    </svg>
  )
}
