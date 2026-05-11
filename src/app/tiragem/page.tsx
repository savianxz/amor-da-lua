"use client";

import TarotReading from "@/components/TarotReading";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TiragemPage() {
  return (
    <main className="min-h-screen bg-[#120817]">
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#FFF8E7]/40 hover:text-[#E0B84C] transition-colors text-sm uppercase tracking-widest font-serif"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </Link>
      </div>
      
      <TarotReading />
    </main>
  );
}
