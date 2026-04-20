"use client";

import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Monitor, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell,
  Menu,
  ChevronRight,
  Shield,
  Images
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SIDEBAR_GROUPS = [
  {
    title: "Overview",
    items: [
      { name: "แดชบอร์ด", icon: LayoutDashboard, href: "/admin" },
      { name: "รายงาน", icon: BarChart3, href: "/admin/reports" },
    ]
  },
  {
    title: "Branding & Visuals",
    items: [
      { name: "จัดการแบนเนอร์", icon: Images, href: "/admin/hero" },
    ]
  },
  {
    title: "Business Management",
    items: [
      { name: "จัดการเครื่องเช่า", icon: Monitor, href: "/admin/machines" },
      { name: "รายการจอง", icon: Calendar, href: "/admin/bookings" },
    ]
  },
  {
    title: "Administrative Control",
    items: [
      { name: "ผู้ใช้งาน", icon: Users, href: "/admin/users" },
      { name: "จัดการแอดมิน", icon: Shield, href: "/admin/staff" },
    ]
  },
  {
    title: "System Settings",
    items: [
      { name: "ตั้งค่าระบบ", icon: Settings, href: "/admin/settings" },
    ]
  }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  React.useEffect(() => {
    const userData = localStorage.getItem("user");
    
    // Basic protection (Non-blocking)
    if (pathname !== "/admin/login") {
       if (!userData) {
         router.push("/admin/login");
       } else {
         const parsed = JSON.parse(userData);
         setCurrentUser(parsed);
         if (parsed.role !== 'admin') router.push("/");
       }
    } else if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, [pathname, router]);

  // Don't render sidebar/header on login page
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#09090B] flex flex-col fixed h-full z-50 overflow-hidden border-r border-white/5">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-[80px] pointer-events-none" />

        {/* Brand Logo Section */}
        <div className="p-8 relative">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="h-11 w-11 flex items-center justify-center rounded-2xl overflow-hidden bg-white ring-2 ring-white/10 relative z-10 transition-transform group-hover:scale-105">
                <img src="/logo/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col relative z-10">
              <span className="text-xl font-black tracking-tight text-white leading-none uppercase">Knize<span className="text-orange-500">Core</span></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mt-1">Management</span>
            </div>
          </Link>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto mt-4 custom-scrollbar">
          {SIDEBAR_GROUPS.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all relative group ${
                        isActive 
                        ? "text-white" 
                        : "text-zinc-500 hover:text-zinc-200"
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10 shadow-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <div className={`relative z-10 p-1.5 rounded-lg transition-all ${
                        isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-transparent group-hover:bg-white/5"
                      }`}>
                         <item.icon className="h-4 w-4" />
                      </div>
                      
                      <span className="text-[13px] font-bold tracking-tight relative z-10">{item.name}</span>
                      
                      {isActive && (
                        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Card - Bottom Section */}
        <div className="p-6 mt-auto">
          <div className="bg-white/[0.03] border border-white/10 rounded-[24px] p-4 relative overflow-hidden group hover:border-white/20 transition-all">
             <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 blur-xl" />
             
             <div className="flex items-center gap-3 relative z-10 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-white font-black text-xs uppercase">
                   {currentUser?.username?.substring(0, 2) || "KS"}
                </div>
                <div className="flex flex-col min-w-0">
                   <span className="text-[12px] font-black text-white uppercase leading-none truncate pr-2">
                     {currentUser?.username || "Admin"}
                   </span>
                   <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                     {currentUser?.role || "Global Access"}
                   </span>
                </div>
             </div>

             <button 
               onClick={() => {
                 localStorage.removeItem("user");
                 localStorage.removeItem("token");
                 window.location.href = "/";
               }}
               className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all text-[11px] font-black uppercase tracking-widest border border-white/5"
             >
               <LogOut className="h-3.5 w-3.5" /> Log Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[280px]">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
               <h2 className="text-lg font-black uppercase text-zinc-900 tracking-tight leading-none">
                 {SIDEBAR_GROUPS.flatMap(g => g.items).find(i => i.href === pathname)?.name || "ต้อนรับแอดมิน"}
               </h2>
               <div className="flex items-center gap-2 mt-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">System Operational</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative h-11 w-11 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:bg-orange-50 transition-all cursor-pointer group">
              <Bell className="h-5 w-5 transition-transform group-hover:rotate-12" />
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-orange-500 border-2 border-white" />
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-zinc-100">
               <div className="text-right hidden sm:block">
                  <p className="text-[13px] font-black text-zinc-900 leading-none uppercase">
                    {currentUser?.username || "Admin"}
                  </p>
                  <p className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-1.5">
                    {currentUser?.role === 'admin' ? 'Master Admin' : 'Staff Access'}
                  </p>
               </div>
               <div className="h-11 w-11 rounded-2xl bg-zinc-900 flex items-center justify-center text-white font-black shadow-lg shadow-zinc-900/10 uppercase">
                  {currentUser?.username?.substring(0, 2) || "KS"}
               </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
