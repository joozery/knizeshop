"use client";

import React from "react";
import { 
  ShieldCheck, 
  Search, 
  RefreshCw, 
  UserPlus, 
  Mail, 
  Clock, 
  ShieldAlert,
  MoreHorizontal,
  Edit2,
  Trash2,
  Lock,
  History
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface AdminData {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function AdminStaffPage() {
  const [admins, setAdmins] = React.useState<AdminData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Create State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newAdmin, setNewAdmin] = React.useState({
    username: "",
    email: "",
    password: "",
    role: "admin"
  });
  const [createLoading, setCreateLoading] = React.useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/users");
      const data = await res.json();
      // Filter for admins only
      setAdmins(data.filter((u: any) => u.role === 'admin'));
    } catch (error) {
       console.error("Fetch Error:", error);
    } finally {
       setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreateLoading(true);
      const res = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewAdmin({ username: "", email: "", password: "", role: "admin" });
        fetchAdmins();
      }
    } catch (error) {
       console.error("Create Error:", error);
    } finally {
       setCreateLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter(a => 
    a.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1 focus:outline-none">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
             <ShieldCheck className="h-3.5 w-3.5" /> Core Team Control
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase text-zinc-900 leading-none">
            จัดการทีมผู้ดูแลระบบ <span className="text-zinc-400">({admins.length})</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
           <Button 
             onClick={fetchAdmins}
             variant="outline" 
             className="h-10 w-10 rounded-xl border-zinc-200 bg-white hover:bg-zinc-50 p-0"
           >
              <RefreshCw className={`h-3.5 w-3.5 text-zinc-500 ${loading ? 'animate-spin' : ''}`} />
           </Button>
           <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger render={<Button className="h-10 px-6 bg-orange-500 text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg shadow-orange-500/10 active:scale-95 border-none" />}>
                 <UserPlus className="mr-2 h-3.5 w-3.5" /> แต่งตั้งแอดมินใหม่
              </DialogTrigger>
              <DialogContent className="rounded-2xl border-zinc-100 max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black uppercase tracking-tight text-zinc-900">แต่งตั้งแอดมินใหม่</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateAdmin} className="space-y-4 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Username</label>
                    <Input 
                      required
                      placeholder="e.g. Admin_K" 
                      value={newAdmin.username}
                      onChange={e => setNewAdmin({...newAdmin, username: e.target.value})}
                      className="h-11 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Email Address</label>
                    <Input 
                      required
                      type="email"
                      placeholder="admin@knizeshop.com" 
                      value={newAdmin.email}
                      onChange={e => setNewAdmin({...newAdmin, email: e.target.value})}
                      className="h-11 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Password</label>
                    <Input 
                      required
                      type="password"
                      placeholder="••••••••" 
                      value={newAdmin.password}
                      onChange={e => setNewAdmin({...newAdmin, password: e.target.value})}
                      className="h-11 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500/10"
                    />
                  </div>
                  <DialogFooter className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={createLoading}
                      className="w-full h-11 bg-orange-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl border-none shadow-lg shadow-orange-500/10"
                    >
                      {createLoading ? 'กำลังบันทึก...' : 'บีนทึกข้อมูล'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
           </Dialog>
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="border border-zinc-100 shadow-sm bg-white rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-50 flex items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="ค้นหาแอดมิน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl h-10 pl-11 pr-4 text-[13px] font-bold text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
           </div>
           
           <div className="hidden md:flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl border border-zinc-100">
              <div className="px-3 py-1 rounded-lg bg-white shadow-sm border border-zinc-100 text-[10px] font-black uppercase text-zinc-900">Active Staff</div>
              <div className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase text-zinc-400">Access Logs</div>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-zinc-50">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Administrator</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Privileges</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Last Action</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Settings</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                 {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                       <tr key={i} className="animate-pulse">
                          <td colSpan={5} className="px-6 py-6 h-16 bg-zinc-50/20" />
                       </tr>
                    ))
                 ) : filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin) => (
                       <tr key={admin._id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white ring-2 ring-orange-500/20">
                                   <ShieldAlert className="h-5 w-5 text-orange-500" />
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[13px] font-black text-zinc-900 uppercase tracking-tight">{admin.username}</span>
                                   <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
                                      <Mail className="h-3 w-3" /> {admin.email}
                                   </span>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-700">Full Access</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-bold">
                                <History className="h-3.5 w-3.5" />
                                ปรับแต่งราคาเครื่อง
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-950 text-orange-400 text-[9px] font-black uppercase tracking-widest border border-orange-500/20">
                                Online
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-white hover:shadow-md transition-all border border-transparent" />}>
                                   <Lock className="h-3.5 w-3.5 text-zinc-400" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl shadow-xl mt-1">
                                   <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 font-bold text-xs">
                                      <Edit2 className="mr-2 h-3.5 w-3.5" /> จัดการสิทธิ์
                                   </DropdownMenuItem>
                                   <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 font-bold text-xs text-red-500">
                                      <Trash2 className="mr-2 h-3.5 w-3.5" /> ถอนสิทธิ์แอดมิน
                                   </DropdownMenuItem>
                                </DropdownMenuContent>
                             </DropdownMenu>
                          </td>
                       </tr>
                    ))
                 ) : (
                    <tr>
                       <td colSpan={5} className="px-6 py-20 text-center">
                          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">ไม่พบรายชื่อผู้ดูแลระบบ</p>
                       </td>
                    </tr>
                 )}
              </tbody>
           </table>
        </div>
      </Card>
    </div>
  );
}
