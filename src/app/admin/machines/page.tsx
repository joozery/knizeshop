"use client";

import React from "react";
import { 
  Monitor, 
  Plus, 
  Search, 
  RefreshCw, 
  Edit2, 
  Trash2, 
  Settings2,
  Cpu,
  Zap,
  HardDrive,
  ScreenShare,
  Upload,
  Loader2,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Wrench
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Machine {
  _id: string;
  name: string;
  category: "Gaming" | "Server" | "Streaming";
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    ssd: string;
  };
  price: {
    hourly: number;
    daily: number;
  };
  image: string;
  status: "available" | "unavailable" | "maintenance";
}

export default function AdminMachinesPage() {
  const [machines, setMachines] = React.useState<Machine[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingMachine, setEditingMachine] = React.useState<Machine | null>(null);
  
  const [formData, setFormData] = React.useState({
    name: "",
    category: "Gaming",
    cpu: "",
    gpu: "",
    ram: "",
    ssd: "",
    hourly: 0,
    daily: 0,
    image: "",
    status: "available"
  });

  const openEditModal = (machine: Machine) => {
    setEditingMachine(machine);
    setFormData({
      name: machine.name,
      category: machine.category,
      cpu: machine.specs.cpu,
      gpu: machine.specs.gpu,
      ram: machine.specs.ram,
      ssd: machine.specs.ssd,
      hourly: machine.price.hourly,
      daily: machine.price.daily,
      image: machine.image,
      status: machine.status
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingMachine(null);
    setFormData({
      name: "", category: "Gaming", cpu: "", gpu: "", ram: "", ssd: "", hourly: 0, daily: 0, image: "", status: "available"
    });
    setIsModalOpen(true);
  };

  const fetchMachines = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/machines");
      if (res.ok) {
        const data = await res.json();
        setMachines(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMachines();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        // Show detailed error from backend
        alert(`อัปโหลดล้มเหลว: ${data.message || "Unknown Error"}\nรายละเอียด: ${data.details || data.error || "ไม่มีข้อมูล"}`);
      }
    } catch (error: any) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์เพื่ออัปโหลด");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editingMachine;
    const url = isEdit 
      ? `http://localhost:5001/api/machines/${editingMachine?._id}`
      : "http://localhost:5001/api/machines";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingMachine(null);
        setFormData({
          name: "", category: "Gaming", cpu: "", gpu: "", ram: "", ssd: "", hourly: 0, daily: 0, image: "", status: "available"
        });
        fetchMachines();
      } else {
        const err = await res.json();
        alert(err.message || "บันทึกไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ต้องการลบเครื่องนี้ใช่หรือไม่?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/machines/${id}`, {
        method: "DELETE"
      });
      if (res.ok) fetchMachines();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/machines/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchMachines();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'available': return <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-2 py-0.5 rounded-lg font-black text-[9px] uppercase"><CheckCircle2 className="w-3 h-3 mr-1" /> Available</Badge>;
      case 'maintenance': return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20 px-2 py-0.5 rounded-lg font-black text-[9px] uppercase"><Wrench className="w-3 h-3 mr-1" /> Maintenance</Badge>;
      default: return <Badge className="bg-red-500/10 text-red-600 border-red-500/20 px-2 py-0.5 rounded-lg font-black text-[9px] uppercase"><AlertCircle className="w-3 h-3 mr-1" /> Reserved</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 blur-[80px] -mr-24 -mt-24" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
             <Monitor className="h-3.5 w-3.5" /> Hardware Assets
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase text-zinc-900 leading-none">
            คลังเครื่องเช่า <span className="text-zinc-300 ml-1">({machines.length})</span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5 relative z-10">
           <Button onClick={fetchMachines} variant="outline" className="h-10 w-10 rounded-xl border-zinc-100 bg-white hover:bg-zinc-50 p-0 shadow-sm">
              <RefreshCw className={`h-3.5 w-3.5 text-zinc-500 ${loading ? 'animate-spin' : ''}`} />
           </Button>
           <Dialog open={isModalOpen} onOpenChange={(open) => {
               setIsModalOpen(open);
               if (!open) {
                 setEditingMachine(null);
                 setFormData({
                    name: "", category: "Gaming", cpu: "", gpu: "", ram: "", ssd: "", hourly: 0, daily: 0, image: "", status: "available"
                 });
               }
           }}>
              <DialogTrigger render={<Button onClick={handleAddNew} className="h-10 px-6 bg-zinc-900 text-white rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-orange-500 transition-all shadow-lg active:scale-95 border-none" />}>
                 <Plus className="mr-2 h-3.5 w-3.5" /> เพิ่มเครื่องใหม่
              </DialogTrigger>
              <DialogContent className="rounded-2xl border-white/5 bg-white max-w-lg p-0 overflow-hidden shadow-2xl">
                <DialogHeader className="p-8 pb-3">
                  <DialogTitle className="text-xl font-black uppercase tracking-tight text-zinc-900">
                     {editingMachine ? "Update Machine" : "Machine Config"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-6 overflow-y-auto max-h-[75vh] custom-scrollbar">
                  {/* Image Upload Block */}
                  <div className="space-y-1.5 slice-image-up">
                     <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Hardware Visual</label>
                     <div className="relative aspect-video rounded-2xl bg-zinc-50 border-2 border-dashed border-zinc-100 flex items-center justify-center overflow-hidden group">
                        {formData.image ? (
                          <>
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                               <label className="cursor-pointer bg-white text-zinc-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                                  <Upload className="h-3.5 w-3.5" /> Change
                                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                               </label>
                            </div>
                          </>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors">
                             {uploading ? <Loader2 className="h-8 w-8 animate-spin" /> : <Monitor className="h-8 w-8" />}
                             <span className="text-[10px] font-black uppercase tracking-widest">Select Image</span>
                             <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                          </label>
                        )}
                     </div>
                  </div>

                  {/* Identity Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Name</label>
                       <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-11 rounded-xl bg-zinc-50 border-none px-4 font-bold" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Category</label>
                       <select 
                         value={formData.category} 
                         onChange={e => setFormData({...formData, category: e.target.value as any})}
                         className="w-full h-11 rounded-xl bg-zinc-50 border-none px-4 font-bold text-xs outline-none"
                       >
                         <option value="Gaming">Gaming</option>
                         <option value="Server">Server</option>
                         <option value="Streaming">Streaming</option>
                       </select>
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-zinc-100">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">CPU</label>
                       <div className="relative">
                          <Cpu className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input required value={formData.cpu} onChange={e => setFormData({...formData, cpu: e.target.value})} className="h-11 rounded-xl bg-zinc-50 border-none pl-10 font-bold text-xs" />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">GPU</label>
                       <div className="relative">
                          <ScreenShare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input required value={formData.gpu} onChange={e => setFormData({...formData, gpu: e.target.value})} className="h-11 rounded-xl bg-zinc-50 border-none pl-10 font-bold text-xs" />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">RAM</label>
                       <div className="relative">
                          <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input required value={formData.ram} onChange={e => setFormData({...formData, ram: e.target.value})} className="h-11 rounded-xl bg-zinc-50 border-none pl-10 font-bold text-xs" />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">SSD</label>
                       <div className="relative">
                          <HardDrive className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input required value={formData.ssd} onChange={e => setFormData({...formData, ssd: e.target.value})} className="h-11 rounded-xl bg-zinc-50 border-none pl-10 font-bold text-xs" />
                       </div>
                    </div>
                  </div>

                  {/* Pricing Block */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                       <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest block mb-1">รายชั่วโมง (บาท)</label>
                       <div className="relative">
                          <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
                          <input 
                            type="number"
                            required
                            value={formData.hourly}
                            onChange={e => setFormData({...formData, hourly: parseFloat(e.target.value)})}
                            className="bg-transparent text-xl font-black w-full pl-5 outline-none"
                          />
                       </div>
                    </div>
                    <div className="space-y-1 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                       <label className="text-[9px] font-black uppercase text-zinc-400 tracking-widest block mb-1">รายวัน (บาท)</label>
                       <div className="relative">
                          <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
                          <input 
                            type="number"
                            required
                            value={formData.daily}
                            onChange={e => setFormData({...formData, daily: parseFloat(e.target.value)})}
                            className="bg-transparent text-xl font-black w-full pl-5 outline-none"
                          />
                       </div>
                    </div>
                  </div>

                  <DialogFooter className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={uploading}
                      className="w-full h-14 bg-zinc-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl active:scale-95 border-none hover:bg-orange-500 transition-all"
                    >
                      {uploading ? "กำลังบันทึก..." : "Deploy Hardware"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
           </Dialog>
        </div>
      </div>

      {/* Machines Table Area */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
           <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">Fleet Control</h2>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-100">
              <Search className="h-3.5 w-3.5 text-zinc-400" />
              <input placeholder="Search assets..." className="bg-transparent outline-none text-[10px] font-bold w-40 uppercase" />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-50/50">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">Inventory & Technicals</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">Category</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">Yield / Hour</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">System State</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-zinc-400 text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {machines.map((m) => (
                <tr key={m._id} className="hover:bg-zinc-50/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="h-12 w-16 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-100 relative shadow-sm">
                          <img src={m.image} className="w-full h-full object-cover" />
                       </div>
                       <div className="space-y-0.5">
                          <div className="text-xs font-black uppercase text-zinc-900 tracking-tight">{m.name}</div>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-400 uppercase">
                             <span className="flex items-center gap-1"><Cpu className="w-2.5 h-2.5" /> {m.specs.cpu.split(' ').pop()}</span>
                             <span className="flex items-center gap-1"><Zap className="w-2.5 h-2.5" /> {m.specs.ram}</span>
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                       {m.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-black text-zinc-900">฿{m.price.hourly}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(m.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                       <Button 
                         onClick={() => openEditModal(m)}
                         variant="outline" 
                         className="h-8 w-8 rounded-lg p-0 border-zinc-100 hover:bg-zinc-900 hover:text-white transition-all"
                       >
                          <Edit2 className="h-3.5 w-3.5" />
                       </Button>
                       <Button 
                         onClick={() => updateStatus(m._id, m.status === 'available' ? 'maintenance' : 'available')}
                         variant="outline" 
                         className="h-8 w-8 rounded-lg p-0 border-zinc-100"
                       >
                          <Settings2 className="h-3.5 w-3.5 text-zinc-500" />
                       </Button>
                       <Button 
                         onClick={() => handleDelete(m._id)}
                         variant="outline" 
                         className="h-8 w-8 rounded-lg p-0 border-red-50 hover:bg-red-500 hover:text-white transition-all"
                       >
                          <Trash2 className="h-3.5 w-3.5 text-red-400 group-hover:text-inherit" />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {machines.length === 0 && !loading && (
            <div className="py-20 text-center">
               <div className="h-20 w-20 bg-zinc-50 rounded-[32px] flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                  <Monitor className="h-8 w-8 text-zinc-200" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[.3em] text-zinc-400">Empty Fleet Readiness</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
