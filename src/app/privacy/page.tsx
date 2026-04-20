"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Lock, Eye, Database, Share2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const policies = [
    {
      title: "1. ข้อมูลที่เราเก็บรวบรวม",
      content: "เราอาจเก็บรวบรวมข้อมูลส่วนบุคคล เช่น ชื่อ, อีเมล, หมายเลขโทรศัพท์ และข้อมูลการชำระเงิน เมื่อคุณสมัครสมาชิกหรือใช้บริการเช่าเครื่องคอมพิวเตอร์ของเรา",
      icon: Database
    },
    {
      title: "2. วัตถุประสงค์ในการใช้ข้อมูล",
      content: "ข้อมูลของคุณจะถูกนำไปใช้เพื่อดำเนินการเช่าเครื่อง, ปรับปรุงบริการให้ดียิ่งขึ้น, การสื่อสารเกี่ยวกับบัญชีของคุณ และการรักษาความปลอดภัยของระบบ",
      icon: Eye
    },
    {
      title: "3. การรักษาความปลอดภัย",
      content: " KnizeShop ใช้เทคโนโลยีการเข้ารหัสลับ (Encryption) ที่ได้มาตรฐานสากลเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต",
      icon: Lock
    },
    {
      title: "4. การเปิดเผยข้อมูลแก่บุคคลภายนอก",
      content: "เราจะไม่มีการขายหรือแลกเปลี่ยนข้อมูลส่วนบุคคลของคุณให้แก่บุคคลภายนอก เว้นแต่จะเป็นไปตามข้อกำหนดทางกฎหมายหรือเพื่อการประมวลผลการชำระเงินที่ปลอดภัย",
      icon: Share2
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500/30 overflow-x-hidden bg-watermark bg-fixed">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
      
      <Navbar />

      <main className="pt-40 px-4 max-w-4xl mx-auto pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-xs font-black uppercase tracking-widest mb-6">
            <Lock className="h-4 w-4" /> Privacy & Trust
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900 mb-6">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
            ความปลอดภัยของข้อมูลคุณคือความประทับใจครั้งสำคัญของเรา เรียนรู้วิธีที่เราดูแลข้อมูลของคุณเพื่อความสบายใจสูงสุด
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy, idx) => (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-black/5 hover:border-orange-500/20 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="h-14 w-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-6 shadow-xl shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <policy.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-4 uppercase tracking-tight">
                {policy.title}
              </h3>
              <p className="text-zinc-500 leading-relaxed font-medium">
                {policy.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-[32px] border border-orange-500/10 bg-orange-500/5 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-4">
                 <ShieldCheck className="h-8 w-8 text-orange-600" />
                 <h4 className="text-xl font-black text-zinc-900 uppercase">มาตรฐานความปลอดภัยสูงสุด</h4>
             </div>
             <p className="text-zinc-600 font-medium leading-relaxed">
                 เรามุ่งมั่นที่จะนำเสนอประสบการณ์การเช่าคอมพิวเตอร์ที่ปลอดภัยที่สุด ระบบของเรามีการบันทึกประวัติการเข้าใช้งานโดยละเอียดและมีทีมวิศวกรดูแลความปลอดภัยตลอด 24 ชั่วโมง
             </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { ShieldCheck } from "lucide-react";
