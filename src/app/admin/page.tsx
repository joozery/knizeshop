"use client";

import React from "react";
import { 
  Monitor, 
  Activity, 
  TrendingUp, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  const stats = [
    { label: "เครื่องออนไลน์", value: "24/25", icon: Monitor, color: "text-green-500", bg: "bg-green-50" },
    { label: "รายการจองวันนี้", value: "128", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "รายได้เดือนนี้", value: "฿124,500", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "สุขภาพระบบ", value: "99.9%", icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const recentActivities = [
    { id: 1, user: "K. Somsak", action: "เช่าเครื่อง [KORI-02]", time: "2 นาทีที่แล้ว", status: "success" },
    { id: 2, user: "K. Manee", action: "ขยายเวลา [KORI-10]", time: "15 นาทีที่แล้ว", status: "success" },
    { id: 3, user: "System", action: "ตรวจพบเครื่อง [KORI-06] ออฟไลน์", time: "1 ชั่วโมงที่แล้ว", status: "warning" },
    { id: 4, user: "K. Wichai", action: "แจ้งปัญหาการชำระเงิน", time: "3 ชั่วโมงที่แล้ว", status: "error" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 border-none shadow-sm bg-white rounded-2xl group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
            </div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-xl font-black text-zinc-900 mt-1">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Section */}
        <div className="lg:col-span-2">
          <Card className="p-6 border-none shadow-sm bg-white rounded-2xl h-full">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-base font-black uppercase tracking-tight text-zinc-900">กิจกรรมล่าสุด</h4>
               <button className="text-[10px] font-bold text-orange-500 hover:underline uppercase tracking-widest">ดูทั้งหมด</button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      item.status === 'success' ? 'bg-green-50 text-green-500' : 
                      item.status === 'warning' ? 'bg-yellow-50 text-yellow-600' : 
                      'bg-red-50 text-red-500'
                    }`}>
                      {item.status === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-zinc-900">{item.action}</p>
                      <p className="text-[11px] font-medium text-zinc-400">โดย {item.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-tighter">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* System Health / Quick Info */}
        <Card className="p-6 border-none shadow-sm bg-zinc-900 text-white rounded-2xl">
           <h4 className="text-base font-black uppercase tracking-tight mb-6">สถานะเซิร์ฟเวอร์</h4>
           <div className="space-y-6">
              {[
                { label: "Main Frame", status: "Active", progress: 85 },
                { label: "Database", status: "Synced", progress: 92 },
                { label: "Payment API", status: "Online", progress: 100 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-2 text-[10px] font-bold uppercase tracking-widest">
                    <span>{s.label}</span>
                    <span className="text-orange-500">{s.status}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3">Broadcast</p>
              <p className="text-sm font-medium text-zinc-100 leading-relaxed italic">
                "ระวังการเชื่อมต่อผิดพลาดในช่วงรอยต่อเวลาเครื่องเช่า"
              </p>
           </div>
        </Card>
      </div>
    </div>
  );
}
