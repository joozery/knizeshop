"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { 
  History, 
  Search, 
  Calendar, 
  Monitor, 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Download,
  Filter,
  ArrowUpRight
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RENTAL_HISTORY = [
  {
    id: "TRX-99821",
    machine: "KORI 02 (ULTRA SET)",
    date: "20 เม.ย. 2026",
    time: "14:20 - 16:20",
    duration: "2 ชั่วโมง",
    price: "฿560",
    status: "สำเร็จ",
    image: "/cover/gif.gif"
  },
  {
    id: "TRX-99745",
    machine: "KORI 06 (Gaming Pro)",
    date: "18 เม.ย. 2026",
    time: "10:00 - 13:00",
    duration: "3 ชั่วโมง",
    price: "฿450",
    status: "สำเร็จ",
    image: "/cover/gif.gif"
  },
  {
    id: "TRX-99612",
    machine: "KORI 01 (Starter)",
    date: "15 เม.ย. 2026",
    time: "19:00 - 20:00",
    duration: "1 ชั่วโมง",
    price: "฿120",
    status: "ยกเลิก",
    image: "/cover/gif.gif"
  }
];

const DEPOSIT_HISTORY = [
  {
    id: "DEP-4112",
    date: "20 เม.ย. 2026",
    amount: "฿1,000",
    method: "PromptPay QR",
    status: "สำเร็จ"
  },
  {
    id: "DEP-4098",
    date: "10 เม.ย. 2026",
    amount: "฿500",
    method: "Bank Transfer",
    status: "สำเร็จ"
  }
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-orange-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
               <History className="h-3 w-3" /> User Activity Log
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 leading-none">
              ประวัติการใช้งาน <span className="text-orange-500">History</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="ค้นหารายการ..."
                  className="h-11 w-64 bg-white border border-zinc-200 rounded-2xl pl-10 pr-4 text-xs font-bold text-zinc-900 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all shadow-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
             </div>
             <Button variant="outline" className="h-11 px-4 rounded-2xl border-zinc-200 bg-white">
                <Filter className="h-4 w-4 text-zinc-500" />
             </Button>
          </div>
        </div>

        <Tabs defaultValue="rentals" className="w-full">
          <TabsList variant="line" className="mb-8 border-b border-zinc-200 w-full justify-start h-auto p-0 gap-8">
            <TabsTrigger value="rentals" className="px-0 pb-4 text-sm font-black uppercase tracking-widest data-active:after:bg-orange-500 data-active:text-orange-500">ประวัติการเช่าเครื่อง</TabsTrigger>
            <TabsTrigger value="deposits" className="px-0 pb-4 text-sm font-black uppercase tracking-widest data-active:after:bg-orange-500 data-active:text-orange-500">ประวัติการเติมเงิน</TabsTrigger>
          </TabsList>

          <TabsContent value="rentals" className="space-y-4">
            {RENTAL_HISTORY.map((item) => (
              <Card key={item.id} className="border border-zinc-200/60 shadow-sm rounded-3xl overflow-hidden hover:shadow-lg transition-all group bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="h-32 md:h-28 w-full md:w-48 relative overflow-hidden">
                       <img src={item.image} alt="Machine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">ID: {item.id}</p>
                        <p className="text-sm font-black text-zinc-900 uppercase tracking-tight">{item.machine}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500">
                           <Calendar className="h-3.5 w-3.5 text-orange-500" />
                           <span className="text-[11px] font-bold">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500">
                           <Clock className="h-3.5 w-3.5 text-orange-500" />
                           <span className="text-[11px] font-bold">{item.time} ({item.duration})</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">ยอดชำระ</p>
                         <p className="text-lg font-black text-orange-600">{item.price}</p>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4">
                         <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                           item.status === 'สำเร็จ' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                         }`}>
                           {item.status === 'สำเร็จ' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                           {item.status}
                         </div>
                         <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-50 transition-colors">
                            <Download className="h-4 w-4 text-zinc-400" />
                         </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="deposits">
             <div className="bg-white rounded-[32px] border border-zinc-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50 border-b border-zinc-100">
                         <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-zinc-400">Order ID</th>
                         <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-zinc-400">Date</th>
                         <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-zinc-400">Amount</th>
                         <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-zinc-400">Method</th>
                         <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                         <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-zinc-400 text-right">Receipt</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-zinc-50">
                      {DEPOSIT_HISTORY.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-5 text-[13px] font-black text-zinc-900">{item.id}</td>
                           <td className="px-8 py-5 text-[13px] font-bold text-zinc-500">{item.date}</td>
                           <td className="px-8 py-5 text-[13px] font-black text-orange-600">{item.amount}</td>
                           <td className="px-8 py-5 text-[13px] font-bold text-zinc-500">{item.method}</td>
                           <td className="px-8 py-5">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest">
                                 <CheckCircle2 className="h-3 w-3" /> Success
                              </span>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <button className="h-8 w-8 rounded-lg bg-slate-100 text-zinc-400 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center ml-auto">
                                 <ArrowUpRight className="h-4 w-4" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
