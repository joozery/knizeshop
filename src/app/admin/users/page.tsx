"use client";

import React from "react";
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Shield, 
  ShieldCheck, 
  Mail, 
  Clock,
  Filter,
  RefreshCw,
  Edit2,
  Trash2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface UserData {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1 focus:outline-none">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
             <Users className="h-3.5 w-3.5" /> User Management
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase text-zinc-900 leading-none">
            จัดการผู้ใช้งาน <span className="text-zinc-400">({users.length})</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
           <Button 
             onClick={fetchUsers}
             variant="outline" 
             className="h-10 w-10 rounded-xl border-zinc-200 bg-white hover:bg-zinc-50 p-0"
           >
              <RefreshCw className={`h-3.5 w-3.5 text-zinc-500 ${loading ? 'animate-spin' : ''}`} />
           </Button>
           <Button className="h-10 px-6 bg-zinc-900 text-white rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-orange-500 transition-all shadow-lg active:scale-95 border-none">
              <UserPlus className="mr-2 h-3.5 w-3.5" /> เพิ่มผู้ใช้งาน
           </Button>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border border-zinc-100 shadow-sm bg-white rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-50 flex flex-col md:flex-row md:items-center justify-between gap-3">
           <div className="relative flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="ค้นหาชื่อ หรือ อีเมล..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl h-10 pl-11 pr-4 text-[13px] font-bold text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
           </div>

           <div className="flex items-center gap-2">
              <Button variant="ghost" className="h-10 px-4 rounded-xl text-zinc-500 font-bold text-xs">
                 <Filter className="mr-2 h-3.5 w-3.5" /> ตัวกรอง
              </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-zinc-50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">User Information</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Account Role</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Join Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-6 h-20 bg-zinc-50/20" />
                  </tr>
                ))
              ) : filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-orange-500/10 uppercase">
                          {user.username.substring(0, 2)}
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[13px] font-black text-zinc-900 uppercase tracking-tight">{user.username}</span>
                          <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
                             <Mail className="h-3 w-3" /> {user.email}
                          </span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      user.role === 'admin' 
                      ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                      : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {user.role === 'admin' ? <ShieldCheck className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="flex items-center gap-2 text-[11px] font-bold text-green-500">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        Active
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-bold">
                        <Clock className="h-3 w-3" />
                        20 Apr 2026
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-white hover:shadow-md transition-all group-hover:border-zinc-200 border border-transparent" />}>
                        <MoreHorizontal className="h-3.5 w-3.5 text-zinc-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl shadow-xl mt-1 border-zinc-100">
                         <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 font-bold text-xs text-zinc-600 focus:text-zinc-900">
                            <Edit2 className="mr-2 h-3.5 w-3.5" /> แก้ไขข้อมูล
                         </DropdownMenuItem>
                         <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 font-bold text-xs text-red-500 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="mr-2 h-3.5 w-3.5" /> ระงับการใช้งาน
                         </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
