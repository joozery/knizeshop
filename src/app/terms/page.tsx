"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShieldCheck, Scale, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
  const sections = [
    {
      title: "1. การยอมรับข้อตกลง",
      content: "ในการเข้าถึงหรือใช้งานบริการของ KnizeShop คุณตกลงที่จะผูกพันตามข้อกำหนดและเงื่อนไขเหล่านี้ หากคุณไม่เห็นด้วยกับข้อกำหนดใด ๆ คุณจะไม่ได้รับอนุญาตให้ใช้บริการของเรา",
      icon: ShieldCheck
    },
    {
      title: "2. บริการเช่าเครื่องคอมพิวเตอร์",
      content: "KnizeShop ให้บริการเช่าเครื่องคอมพิวเตอร์ผ่านระบบออนไลน์ การเช่าจะมีผลสมบูรณ์เมื่อมีการชำระเงินตามอัตราที่กำหนด ผู้ใช้ต้องดูแลรักษาความปลอดภัยของบัญชีผู้ใช้งานของตนเอง",
      icon: FileText
    },
    {
      title: "3. กฎระเบียบการใช้งาน",
      content: "ห้ามมิให้ผู้ใช้งานนำเครื่องคอมพิวเตอร์ไปใช้ในทางที่ผิดกฎหมาย รวมถึงการเจาะระบบ (Hacking), การทำกิจกรรมที่ละเมิดลิขสิทธิ์ หรือการใช้งานที่ส่งผลกระทบต่อประสิทธิภาพการทำงานของระบบโดยรวม",
      icon: Scale
    },
    {
      title: "4. การคืนเงินและขอยกเลิก",
      content: "ทางบริษัทขอสงวนสิทธิ์ในการคืนเงินในกรณีที่เกิดจากความผิดพลาดของผู้ใช้งานเอง อย่างไรก็ตาม หากเกิดปัญหาจากระบบขัดข้อง เรายินดีที่จะตรวจสอบและชดเชยเวลาตามความเหมาะสม",
      icon: FileText
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
            <Scale className="h-4 w-4" /> Legal Documents
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900 mb-6">
            ข้อกำหนดการให้บริการ
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
            โปรดอ่านรายละเอียดข้อตกลงในการใช้งานระบบ KnizeShop เพื่อความเข้าใจที่ตรงกันระหว่างผู้ให้บริการและผู้ใช้งาน
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-black/5 hover:border-orange-500/20 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 flex items-center justify-center shrink-0 shadow-xl group-hover:bg-orange-500 transition-colors">
                  <section.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-zinc-900 mb-3 uppercase tracking-tight flex items-center gap-2">
                    {section.title}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-zinc-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-black mb-2 uppercase tracking-tighter">มีข้อสงสัยเพิ่มเติม?</h4>
            <p className="text-zinc-400 font-medium">หากคุณมีคำถามเกี่ยวกับข้อกำหนดเหล่านี้ โปรดติดต่อฝ่ายสนับสนุนของเรา</p>
          </div>
          <button className="h-14 px-8 rounded-2xl bg-orange-500 text-white font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all">
            ติดต่อเรา <ChevronRight className="inline ml-2" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
