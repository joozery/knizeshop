"use client";

import React from "react";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  ChevronLeft,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [serverStatus, setServerStatus] = React.useState<"checking" | "online" | "offline">("checking");

  // Check server health on load
  React.useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/auth/login", { method: "OPTIONS" });
        setServerStatus("online");
      } catch (err) {
        setServerStatus("offline");
      }
    };
    checkHealth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Sending Login Request to:", "http://localhost:5001/api/auth/login");
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.role !== 'admin') {
          setError("⚠️ จำกัดการเข้าถึงเฉพาะบัญชีผู้ดูแลระบบเท่านั้น! บัญชีของคุณมีระดับเป็น: " + (data.role || "user"));
          setLoading(false);
          // Clear any user data just in case
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          return;
        }
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        window.location.href = "/admin";
      } else {
        setError(data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err: any) {
      setError("ไม่สามารถติดต่อ Server ได้: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDevBypass = () => {
    const mockUser = {
      _id: "dev_mock_id",
      username: "DevAdmin",
      email: "admin@knizeshop.com",
      role: "admin",
      token: "dev_mock_token"
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-8">
        {/* Back to Home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to storefront
        </Link>

        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-900 shadow-xl shadow-zinc-900/10 mb-2 ring-4 ring-orange-500/10">
             <img src="/logo/logo.jpg" alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter uppercase text-zinc-900 leading-none">
              KNIZE<span className="text-orange-500">ADMIN</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
               <div className={`h-1.5 w-1.5 rounded-full ${serverStatus === 'online' ? 'bg-green-500 animate-pulse' : serverStatus === 'offline' ? 'bg-red-500' : 'bg-zinc-300'}`} />
               <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                 API Server: <span className={serverStatus === 'online' ? 'text-green-500' : 'text-red-500'}>{serverStatus.toUpperCase()}</span>
               </p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] p-8 border border-zinc-100 shadow-2xl shadow-zinc-200/50"
        >
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Administrator Email</label>
              <div className="relative">
                <Input 
                  required
                  type="email"
                  placeholder="admin@knizeshop.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="h-12 bg-slate-50 border-none rounded-xl pl-12 focus:ring-2 focus:ring-orange-500/10 font-bold"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Security Password</label>
              <div className="relative">
                <Input 
                  required
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="h-12 bg-slate-50 border-none rounded-xl pl-12 focus:ring-2 focus:ring-orange-500/10 font-bold"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p className="text-[11px] font-bold uppercase tracking-tight">{error}</p>
              </motion.div>
            )}

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-zinc-900 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-orange-500 transition-all shadow-lg active:scale-95 border-none"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Sign into Admin Panel <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Footer & Debug */}
        <div className="space-y-4">
          <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
             &copy; 2026 KnizeShop Ecosystem. All Rights Reserved.
          </p>
          
          <div className="pt-4 flex flex-col items-center gap-2">
             <p className="text-[10px] text-zinc-300 font-bold italic uppercase">Developer Mode Tools:</p>
             <button 
               type="button"
               onClick={handleDevBypass}
               className="text-[10px] font-black uppercase text-orange-500 hover:text-white hover:bg-orange-500 transition-all bg-white px-5 py-2.5 rounded-xl border-2 border-orange-500/20 shadow-xl"
             >
               ⚠️ Click here to Force Entry (Bypass)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
