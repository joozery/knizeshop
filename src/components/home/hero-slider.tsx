"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HERO_SLIDES = [
  {
    title: "Project: AEON",
    description: "สัมผัสความแรงระดับ Ultra ด้วย RTX 4090 และระบบระบายความร้อนระดับเทพ จองเลยวันนี้สิทธิพิเศษเพียบ",
    image: "/hero-card-rig.png",
    color: "from-zinc-900 to-zinc-800"
  },
  {
    title: "Knize Mascot",
    description: "พบกับตัวแทนความแรงและสไตล์ใหม่ของ KnizeShop เร็วๆ นี้ พร้อมระบบสมาชิกแบบ VIP",
    image: "/mascot.png",
    color: "from-orange-600 to-red-600"
  },
  {
    title: "Next Gen Alpha",
    description: "ระบบเช่าคอมพิวเตอร์ที่ทรงพลังที่สุดที่คุณเคยเจอ พร้อมให้บริการคุณ 24/7",
    image: "/hero-rig.png",
    color: "from-zinc-100 to-zinc-50"
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mb-8 md:mb-16 flex items-center justify-center group px-4 md:px-0">
      {/* Precision Navigation Arrows - Hidden on Mobile */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-0 md:-translate-x-1/2 z-30 h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-orange-600 hover:scale-110 active:scale-95 transition-all lg:flex hidden border border-black/5"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-0 md:translate-x-1/2 z-30 h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-orange-600 hover:scale-110 active:scale-95 transition-all lg:flex hidden border border-black/5"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Main Slider Card */}
      <div className="w-full max-w-[1600px] h-[450px] md:h-[500px] relative overflow-hidden rounded-[24px] md:rounded-[32px] shadow-2xl border border-black/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* BACKGROUND IMAGE COVER */}
            <div className="absolute inset-0">
               <img 
                 src={HERO_SLIDES[currentSlide].image} 
                 className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear scale-100 group-hover:scale-110 ${currentSlide === 1 ? 'object-top' : 'object-center'}`}
                 alt="Background"
               />
               {/* OVERLAY GRADIENT - Ensuring text readability */}
               <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent ${currentSlide === 2 ? 'opacity-40' : 'opacity-80'}`} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>

            <div className={`relative z-20 h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl text-left`}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="bg-orange-500 text-white border-none mb-4 md:mb-5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20">
                  Premium Content
                </Badge>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter leading-[1.1] md:leading-none uppercase text-white drop-shadow-sm">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                <p className="text-sm md:text-lg mb-6 md:mb-8 max-w-lg font-bold leading-relaxed text-zinc-100 opacity-90">
                  {HERO_SLIDES[currentSlide].description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="h-11 md:h-12 px-6 md:px-8 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-xl shadow-xl shadow-orange-500/20 transition-all hover:translate-y-[-4px] active:scale-95 text-[11px] md:text-[12px]">
                    จองตอนนี้ <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-11 md:h-12 px-6 md:px-8 bg-white/10 hover:bg-white/20 text-white border-white/20 font-black uppercase tracking-widest rounded-xl backdrop-blur-md transition-all text-[11px] md:text-[12px]">
                    รายละเอียด
                  </Button>
                </div>
              </motion.div>

              {/* Progress Indicators */}
              <div className="flex items-center gap-2 mt-10 md:mt-12">
                {HERO_SLIDES.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1 transition-all duration-700 rounded-full cursor-pointer ${currentSlide === i ? 'w-12 md:w-16 bg-orange-500' : 'w-3 md:w-4 bg-white/30 hover:bg-white/50'}`} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
