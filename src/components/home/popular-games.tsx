"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, ChevronRight } from "lucide-react";

const GAMES = [
  { name: "Valorant", image: "/game/valorant.jpg", players: "1.2M+" },
  { name: "God of War", image: "/game/godofwar.avif", players: "400K+" },
  { name: "Spider-Man 2", image: "/game/spiderman2.jpeg", players: "300K+" },
  { name: "Minecraft", image: "/game/minecraft.avif", players: "2M+" },
  { name: "Horizon", image: "/game/horizon.jpg", players: "250K+" },
];

export function PopularGames() {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tighter uppercase text-zinc-900">เกมยอดนิยม</h2>
        </div>
        <button className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-orange-500 transition-colors">
          ดูทั้งหมด <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {GAMES.map((game, idx) => (
          <motion.div
            key={game.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative h-72 overflow-hidden rounded-2xl cursor-pointer border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            <img 
              src={game.image} 
              alt={game.name} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            <div className="absolute bottom-4 left-4 right-4">
               <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">{game.players} Online</div>
               <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tighter">{game.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
