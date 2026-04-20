"use client";

import React from "react";
import { 
  Images, 
  Plus, 
  Search, 
  RefreshCw, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  Layout,
  Upload,
  Loader2
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

interface HeroSlide {
  _id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  order: number;
  isActive: boolean;
}

export default function AdminHeroPage() {
  const [slides, setSlides] = React.useState<HeroSlide[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingSlide, setEditingSlide] = React.useState<HeroSlide | null>(null);
  
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    image: "",
    badge: "Premium Content",
    order: 0,
    isActive: true
  });

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/hero/admin");
      const contentType = res.headers.get("content-type");
      if (res.ok && contentType?.includes("application/json")) {
        const data = await res.json();
        setSlides(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSlides();
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

      const contentType = res.headers.get("content-type");
      const data = await res.json();

      if (res.ok && contentType?.includes("application/json")) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(`อัปโหลดล้มเหลว: ${data.message || "เซิร์ฟเวอร์ตอบกลับไม่ถูกต้อง"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์ (Port 5001) เปิดอยู่");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingSlide 
      ? `http://localhost:5001/api/hero/${editingSlide._id}` 
      : "http://localhost:5001/api/hero";
    const method = editingSlide ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingSlide(null);
        setFormData({ title: "", description: "", image: "", badge: "Premium Content", order: 0, isActive: true });
        fetchSlides();
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ยืนยันการลบสไลด์นี้?")) return;
    try {
      await fetch(`http://localhost:5001/api/hero/${id}`, { method: "DELETE" });
      fetchSlides();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    try {
      await fetch(`http://localhost:5001/api/hero/${slide._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !slide.isActive }),
      });
      fetchSlides();
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
             <Layout className="h-3.5 w-3.5" /> Visual Identity
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase text-zinc-900 leading-none">
            จัดการ Hero Section <span className="text-zinc-400">({slides.length})</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
           <Button onClick={fetchSlides} variant="outline" className="h-10 w-10 rounded-xl border-zinc-200 bg-white hover:bg-zinc-50 p-0">
              <RefreshCw className={`h-3.5 w-3.5 text-zinc-500 ${loading ? 'animate-spin' : ''}`} />
           </Button>
           <Dialog open={isModalOpen} onOpenChange={(open) => {
             setIsModalOpen(open);
             if (!open) {
               setEditingSlide(null);
               setFormData({ title: "", description: "", image: "", badge: "Premium Content", order: 0, isActive: true });
             }
           }}>
              <DialogTrigger render={<Button className="h-10 px-6 bg-zinc-900 text-white rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-orange-500 transition-all shadow-lg active:scale-95 border-none" />}>
                 <Plus className="mr-2 h-3.5 w-3.5" /> เพิ่มสไลด์ใหม่
              </DialogTrigger>
              <DialogContent className="rounded-3xl border-zinc-100 max-w-lg p-0 overflow-hidden">
                <DialogHeader className="p-8 pb-4">
                  <DialogTitle className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    {editingSlide ? "แก้ไขสไลด์" : "เพิ่มสไลด์ใหม่"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 p-8 pt-0">
                  <div className="space-y-4">
                    {/* Image Upload Area */}
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Slide Image</label>
                       <div className="relative aspect-[16/9] rounded-2xl bg-slate-50 border-2 border-dashed border-zinc-100 flex items-center justify-center overflow-hidden group">
                          {formData.image ? (
                            <>
                              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                 <label className="cursor-pointer bg-white text-zinc-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Upload className="h-3.5 w-3.5" /> Change Image
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                 </label>
                              </div>
                            </>
                          ) : (
                            <label className="cursor-pointer flex flex-col items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors">
                               {uploading ? <Loader2 className="h-8 w-8 animate-spin" /> : <Upload className="h-8 w-8" />}
                               <span className="text-[10px] font-black uppercase tracking-widest">Click to Upload Image</span>
                               <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                            </label>
                          )}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Title</label>
                        <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="h-11 rounded-xl bg-slate-50 border-none px-4 font-bold" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Badge</label>
                        <Input value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} className="h-11 rounded-xl bg-slate-50 border-none px-4 font-bold" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Description</label>
                      <textarea 
                        required 
                        value={formData.description} 
                        onChange={e => setFormData({...formData, description: e.target.value})} 
                        className="w-full min-h-[80px] rounded-xl bg-slate-50 border-none p-4 text-xs font-bold outline-none"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={uploading}
                      className="w-full h-12 bg-orange-500 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl shadow-orange-500/20 border-none hover:bg-orange-600 transition-all active:scale-95"
                    >
                      {uploading ? "กำลังอัปโหลดรูป..." : "บันทึกข้อมูล"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
           </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <Card key={slide._id} className="group relative border border-zinc-100 shadow-sm bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-orange-500/5 transition-all">
             <div className="aspect-[16/9] relative overflow-hidden bg-zinc-100">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                   <button 
                     onClick={() => toggleActive(slide)}
                     className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${slide.isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white/80 backdrop-blur text-zinc-400'}`}
                   >
                      {slide.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                   </button>
                </div>
             </div>

             <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                   <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[9px] font-black uppercase tracking-widest border border-orange-100">
                      {slide.badge}
                   </span>
                </div>
                <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight mb-2 truncate">{slide.title}</h3>
                <p className="text-xs text-zinc-400 font-bold leading-relaxed mb-6 line-clamp-2">{slide.description}</p>
                
                <div className="flex items-center gap-3">
                   <Button 
                     onClick={() => {
                       setEditingSlide(slide);
                       setFormData({
                         title: slide.title,
                         description: slide.description,
                         image: slide.image,
                         badge: slide.badge,
                         order: slide.order,
                         isActive: slide.isActive
                       });
                       setIsModalOpen(true);
                     }}
                     className="flex-1 h-10 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-zinc-900 font-black uppercase text-[10px] border-none shadow-none"
                   >
                      <Edit2 className="mr-2 h-3.5 w-3.5" /> แก้ไข
                   </Button>
                   <Button 
                     onClick={() => handleDelete(slide._id)}
                     className="h-10 w-10 rounded-xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-all border-none shadow-none"
                   >
                      <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
             </div>
          </Card>
        ))}
        {slides.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-zinc-200">
             <Images className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
             <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">ไม่มีสไลด์ในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
}
