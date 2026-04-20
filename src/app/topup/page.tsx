"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { 
  QrCode, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  ShieldCheck,
  CreditCard,
  Wallet,
  ArrowRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function TopUpPage() {
  const [amount, setAmount] = React.useState<string>("100");
  const [isChecking, setIsChecking] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [file, setFile] = React.useState<File | null>(null);

  const handleCheckSlip = () => {
    if (!file) return;
    setIsChecking(true);
    setStatus("idle");
    
    // Simulate API checking slip
    setTimeout(() => {
      setIsChecking(false);
      setStatus("success");
    }, 3000);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-orange-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Payment Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 mb-8">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                  <Wallet className="h-3 w-3" /> Top Up System
               </div>
               <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900">
                  เติมเงินเข้า <span className="text-orange-500">KNIZE WALLET</span>
               </h1>
            </div>

            {/* Amount Selection */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
               <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-6 flex items-center gap-2">
                  1. เลือกจำนวนเงิน <span className="text-zinc-300 font-bold">Select Amount</span>
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["50", "100", "300", "500", "1000", "2500", "5000", "10000"].map((val) => (
                     <button 
                       key={val}
                       onClick={() => setAmount(val)}
                       className={`h-16 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-0.5 group ${amount === val ? 'border-orange-500 bg-orange-50' : 'border-zinc-100 hover:border-orange-500/30 bg-white'}`}
                     >
                        <span className={`text-lg font-black tracking-tight ${amount === val ? 'text-orange-600' : 'text-zinc-900'}`}>{val} ฿</span>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-orange-500/60">THB</span>
                     </button>
                  ))}
               </div>

               <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                        <CreditCard className="h-4 w-4" />
                     </div>
                     <p className="text-xs font-bold text-zinc-500">จำนวนที่เลือกมั้งหมด:</p>
                  </div>
                  <p className="text-xl font-black text-zinc-900">{amount} ฿</p>
               </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-zinc-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-white">
                        <QrCode className="h-4 w-4 text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Siam PromptPay</span>
                     </div>
                     <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-2">สแกนชำระผ่าน QR Code</h2>
                        <p className="text-zinc-400 text-xs font-medium leading-relaxed">สแกนได้ทุกแอปธนาคาร ฟรีค่าธรรมเนียม เติมเงินเข้าทันทีหลังตรวจสอบสลิป</p>
                     </div>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <CheckCircle2 className="h-4 w-4 text-orange-500" />
                           <span className="text-[11px] font-bold text-zinc-300">รองรับธนาคารทุกสาขาในประเทศไทย</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <CheckCircle2 className="h-4 w-4 text-orange-500" />
                           <span className="text-[11px] font-bold text-zinc-300">ระบบอัตโนมัติ 24 ชม.</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-4">
                     <div className="bg-white p-4 rounded-3xl shadow-2xl relative group/qr">
                        <div className="absolute inset-0 bg-orange-500/5 group-hover/qr:scale-110 transition-transform blur-xl" />
                        <img 
                          src={`https://promptpay.io/0000000000000/${amount}.png`} 
                          alt="PromptPay QR" 
                          className="relative z-10 w-48 h-48 rounded-xl"
                        />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">SCAN TO PAY {amount} THB</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Slip Upload & Check */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm h-fit sticky top-32">
               <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-8 flex items-center gap-2">
                  2. ยืนยันการโอนเงิน <span className="text-zinc-300 font-bold">Verify Slip</span>
               </h3>

               <div className="space-y-6">
                  {/* File Dropzone */}
                  <label className="relative block group cursor-pointer">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={onFileChange}
                      disabled={isChecking}
                    />
                    <div className={`h-64 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 text-center space-y-4 ${file ? 'border-orange-500 bg-orange-50/50' : 'border-zinc-100 hover:border-orange-500/30'}`}>
                       {file ? (
                          <div className="relative group/file">
                             <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover/file:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-[10px] font-black uppercase tracking-widest">Change File</span>
                             </div>
                             <img src={URL.createObjectURL(file)} className="h-40 w-auto rounded-2xl shadow-lg" alt="Slip Preview" />
                          </div>
                       ) : (
                          <>
                            <div className="h-16 w-16 bg-slate-50 text-zinc-300 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all group-hover:text-orange-500 group-hover:bg-orange-50">
                               <Upload className="h-8 w-8" />
                            </div>
                            <div>
                               <p className="text-[13px] font-black text-zinc-900 uppercase">วางสลิปเพื่อตรวจสอบ</p>
                               <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-widest">Supports JPG, PNG, WEBP</p>
                            </div>
                          </>
                       )}
                    </div>
                  </label>

                  {/* Status Messages */}
                  <AnimatePresence mode="wait">
                    {isChecking && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0 }}
                         className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-4"
                       >
                          <div className="h-10 w-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin whitespace-nowrap" />
                          <div>
                             <p className="text-xs font-black text-orange-600 uppercase tracking-widest">กำลังตรวจสอบสลิป...</p>
                             <p className="text-[9px] font-bold text-orange-400 uppercase tracking-widest mt-0.5">โปรดอย่าปิดหน้าจอนี้</p>
                          </div>
                       </motion.div>
                    )}

                    {status === 'success' && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="p-5 bg-green-50 border border-green-100 rounded-2xl space-y-3"
                       >
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                                <CheckCircle2 className="h-5 w-5" />
                             </div>
                             <p className="text-sm font-black text-green-700 uppercase tracking-tight">ตรวจสอบสลิปสำเร็จ!</p>
                          </div>
                          <p className="text-[11px] font-bold text-green-600/80 leading-relaxed uppercase">
                             ได้รับเงินจำนวน <span className="text-green-800 underline">+{amount} THB</span> เข้ากระเป๋าของคุณแล้ว
                          </p>
                          <Button 
                             className="w-full h-10 bg-green-600 hover:bg-green-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border-none"
                             onClick={() => window.location.href = "/dashboard"}
                          >
                             กลับไปหน้าแดชบอร์ด <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                       </motion.div>
                    )}
                  </AnimatePresence>

                  <Button 
                    className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 active:scale-95 transition-all text-[12px] border-none"
                    disabled={!file || isChecking || status === 'success'}
                    onClick={handleCheckSlip}
                  >
                    ตรวจสอบสลิป <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>

                  {/* Warning Info */}
                  <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-3">
                     <div className="flex items-center gap-2 text-zinc-900">
                        <Info className="h-4 w-4 text-orange-500" />
                        <span className="text-[11px] font-black uppercase tracking-widest">ข้อมูลควรรู้</span>
                     </div>
                     <ul className="space-y-2">
                        <li className="text-[10px] font-bold text-zinc-400 flex items-start gap-2">
                           <div className="h-1 w-1 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                           ตรวจสอบข้อมูลและยอดเงินให้ตรงกับสลิปก่อนยืนยัน
                        </li>
                        <li className="text-[10px] font-bold text-zinc-400 flex items-start gap-2">
                           <div className="h-1 w-1 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                           หากเกิดความล่าช้าเกิน 5 นาที โปรดติดต่อฝ่ายสนับสนุน
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-3 opacity-40 grayscale py-4">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted Transaction</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
