"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Sparkles, Loader2, Star, ChevronDown, Eye, Moon, Zap } from 'lucide-react';

/* ── Tarot Data ─────────────────────────────────────────────────── */

const CATEGORY_CARDS = {
  hope: [
    { id: 'enamorado', name: 'O Enamorado', symbol: '👩‍❤️‍👨', meaning: 'Existe uma escolha do coração pulsando. Ele ainda se vê refletido em você e na história que construíram.' },
    { id: 'lua_hope', name: 'A Lua', symbol: '🌙', meaning: 'Os sonhos dele ainda são visitados pela sua presença. Existe um magnetismo subconsciente que ele não consegue apagar.' },
    { id: 'imperatriz', name: 'A Imperatriz', symbol: '👑', meaning: 'Ele ainda reconhece em você a força e o brilho que nenhuma outra mulher conseguiu substituir.' },
  ],
  block: [
    { id: 'lua_block', name: 'A Lua', symbol: '🌑', meaning: 'Incertezas e medos estão obscurecendo o julgamento dele, criando um silêncio que parece intransponível.' },
    { id: 'eremita', name: 'O Eremita', symbol: '🕯️', meaning: 'Ele se fechou em um casulo de reflexão, temendo se machucar ou repetir erros do passado.' },
    { id: 'torre', name: 'A Torre', symbol: '⚡', meaning: 'Estruturas antigas foram abaladas. O orgulho dele é o maior muro que impede o contato hoje.' },
  ],
  solution: [
    { id: 'estrela', name: 'A Estrela', symbol: '✨', meaning: 'Uma nova esperança surge. O caminho está sendo iluminado para que a verdade entre vocês floresça.' },
    { id: 'sol', name: 'O Sol', symbol: '☀️', meaning: 'A clareza está voltando. Existe uma oportunidade real de aquecer o que esfriou e trazer alegria de volta.' },
    { id: 'mago', name: 'O Mago', symbol: '🪄', meaning: 'Você detém as ferramentas para manifestar essa mudança. A iniciativa certa transformará o cenário.' },
    { id: 'roda', name: 'A Roda', symbol: '🎡', meaning: 'O destino está girando a seu favor. O ciclo de afastamento está chegando ao fim, permitindo um novo começo.' },
  ]
};

export default function TarotReading() {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(1); // 1: Selection, 2: Loading, 3: Reveal, 4: Interpretation
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [readingCards, setReadingCards] = useState<any[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [loadingText, setLoadingText] = useState("Conectando ao campo energético...");

  // Generate 7 cards for the selection phase
  const [cardsPool] = useState(() => Array.from({ length: 7 }, (_, i) => i));

  const handleCardClick = (index: number) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else if (selectedIndices.length < 3) {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const getMessage = () => {
    const count = selectedIndices.length;
    if (count === 0) return "Feche os olhos e escolha 3 cartas";
    if (count === 1) return "Siga sua intuição... Faltam 2 cartas";
    if (count === 2) return "A última carta revelará o caminho...";
    return "Sua leitura está pronta para ser revelada";
  };

  const startReveal = () => {
    if (selectedIndices.length !== 3) return;
    
    // Select the "rigged" cards
    const hope = CATEGORY_CARDS.hope[Math.floor(Math.random() * CATEGORY_CARDS.hope.length)];
    const block = CATEGORY_CARDS.block[Math.floor(Math.random() * CATEGORY_CARDS.block.length)];
    const solution = CATEGORY_CARDS.solution[Math.floor(Math.random() * CATEGORY_CARDS.solution.length)];
    
    setReadingCards([
      { ...hope, label: 'O sentimento oculto' },
      { ...block, label: 'O bloqueio atual' },
      { ...solution, label: 'O destino provável' }
    ]);
    
    setPhase(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading progress effect
  useEffect(() => {
    if (phase === 2) {
      const texts = [
        "Conectando ao campo energético...",
        "Analisando memórias emocionais...",
        "Sintonizando vibrações residuais...",
        "Decodificando mensagens do Tarot...",
        "Preparando sua revelação personalizada..."
      ];
      
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase(3), 800);
            return 100;
          }
          
          // Change text based on progress
          const textIdx = Math.floor((prev / 100) * texts.length);
          if (texts[textIdx]) setLoadingText(texts[textIdx]);
          
          return prev + 1.2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Reveal cards one by one
  useEffect(() => {
    if (phase === 3 && revealedCount < 3) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (phase === 3 && revealedCount === 3) {
        const timer = setTimeout(() => {
            setPhase(4);
            setTimeout(() => {
                const interpretationBlock = document.getElementById('interpretation-start');
                if (interpretationBlock) interpretationBlock.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }, 3500);
        return () => clearTimeout(timer);
    }
  }, [phase, revealedCount]);

  const scrollToOffer = () => {
    router.push('/#oferta-mapa');
  };

  const CardNoise = () => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
    />
  );

  return (
    <div ref={topRef} className="w-full min-h-screen bg-[#120817] text-[#FFF8E7] font-sans flex flex-col items-center py-12 px-4 select-none relative overflow-x-hidden">
      
      {/* ── Ambient Background ───────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#E0B84C]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#7A1F4B]/5 blur-[100px]" />
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#E0B84C]/3 blur-[80px]" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[#7A1F4B]/3 blur-[80px]" />
      </div>

      <AnimatePresence mode="wait">
        {/* ── FASE 1: ESCOLHA DAS CARTAS ────────────────────────────── */}
        {phase === 1 && (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.5 } }}
            className="w-full max-w-6xl flex flex-col items-center z-10 pt-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#E0B84C]/50 to-transparent mx-auto mb-4" />
              <span className="text-[#E0B84C] text-xs font-serif tracking-[0.6em] uppercase block text-center">
                ✦ Leitura de Almas ✦
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-7xl font-serif text-center mb-10 leading-tight gold-text px-4"
            >
              Escolha três cartas
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-[#FFF8E7]/80 max-w-2xl mb-20 font-light space-y-6 px-4"
            >
              <p className="text-xl md:text-2xl font-serif italic text-[#FFF8E7]/90 leading-relaxed">
                "Feche os olhos por um instante. Respire fundo e visualize o rosto dele agora..."
              </p>
              <p className="text-lg text-[#FFF8E7]/40 tracking-widest uppercase text-sm">
                Sua intuição guiará suas mãos.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-24 px-4 max-w-5xl">
              {cardsPool.map((idx) => {
                const isSelected = selectedIndices.includes(idx);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx + 0.8 }}
                    whileHover={!isSelected ? { y: -20, scale: 1.02 } : {}}
                    onClick={() => handleCardClick(idx)}
                    className="relative w-[110px] h-[180px] md:w-[140px] md:h-[230px] cursor-pointer group"
                    style={{ perspective: '1500px' }}
                  >
                    <motion.div
                      animate={{ 
                        rotateY: isSelected ? 180 : 0,
                        y: isSelected ? -30 : 0,
                        boxShadow: isSelected ? '0 20px 50px rgba(224, 184, 76, 0.4)' : '0 10px 30px rgba(0,0,0,0.4)'
                      }}
                      transition={{ duration: 0.8, type: 'spring', stiffness: 150, damping: 20 }}
                      className={`w-full h-full relative rounded-2xl border-2 transition-colors duration-500 ${isSelected ? 'border-[#E0B84C]' : 'border-[#2A1834] group-hover:border-[#E0B84C]/30'}`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Back of Card */}
                      <div 
                        className="absolute inset-0 bg-[#1C1024] rounded-2xl flex items-center justify-center overflow-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <CardNoise />
                        <div className="absolute inset-2 border border-[#E0B84C]/10 rounded-xl" />
                        <div className="absolute inset-4 border border-[#E0B84C]/5 rounded-lg" />
                        
                        <div className="relative flex flex-col items-center gap-4">
                           <Moon className="w-8 h-8 text-[#E0B84C]/10 group-hover:text-[#E0B84C]/40 transition-colors" />
                           <div className="w-1 h-1 bg-[#E0B84C]/20 rounded-full" />
                        </div>
                      </div>

                      {/* Front of Card (Selected) */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-[#1C1024] to-[#120817] rounded-2xl flex flex-col items-center justify-center"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <CardNoise />
                        <div className="absolute inset-2 border border-[#E0B84C]/30 rounded-xl" />
                        <Star className="w-10 h-10 text-[#E0B84C] mb-4 fill-[#E0B84C]/20 animate-pulse" />
                        <span className="text-[10px] text-[#E0B84C] tracking-[0.4em] font-serif uppercase font-bold text-center px-2">Conectada</span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-12 pb-20 w-full">
               <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={selectedIndices.length}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`text-xl md:text-2xl font-serif tracking-widest text-center transition-all duration-700 ${selectedIndices.length === 3 ? 'text-[#E0B84C] scale-110' : 'text-[#FFF8E7]/40'}`}
                    >
                      {getMessage()}
                    </motion.p>
                  </AnimatePresence>
               </div>
               
               <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(224, 184, 76, 0.4)' }}
                whileTap={{ scale: 0.96 }}
                onClick={startReveal}
                disabled={selectedIndices.length !== 3}
                className={`px-12 py-5 rounded-full font-bold tracking-[0.3em] uppercase transition-all duration-700 text-sm md:text-base border border-transparent
                  ${selectedIndices.length === 3 
                    ? 'bg-[#E0B84C] text-[#120817] shadow-2xl cursor-pointer opacity-100' 
                    : 'bg-[#2A1834]/40 text-[#FFF8E7]/10 cursor-not-allowed opacity-30 border-[#2A1834]'}`}
               >
                REVELAR MINHA TIRAGEM
               </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── FASE 2: INTERPRETANDO ──────────────────────────────────── */}
        {phase === 2 && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="w-full h-screen flex flex-col items-center justify-center z-10 fixed inset-0 bg-[#120817]/95 backdrop-blur-xl"
          >
            <div className="relative w-40 h-40 mb-16">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t border-r border-[#E0B84C]/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-b border-l border-[#E0B84C]/10 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Sparkles className="w-8 h-8 text-[#E0B84C] animate-pulse" />
                    <span className="text-[#E0B84C] text-[10px] tracking-[0.5em] uppercase font-serif">{Math.round(loadingProgress)}%</span>
                </div>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.h3 
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl md:text-2xl font-serif mb-12 italic text-[#FFF8E7]/70 text-center px-6 tracking-wide h-8"
              >
                {loadingText}
              </motion.h3>
            </AnimatePresence>
            
            <div className="w-64 h-[2px] bg-[#1C1024] rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                className="h-full bg-[#E0B84C] shadow-[0_0_10px_rgba(224,184,76,0.8)]"
              />
            </div>
          </motion.div>
        )}

        {/* ── FASE 3: REVELAÇÃO DAS CARTAS ───────────────────────────── */}
        {phase === 3 && (
          <motion.div 
            key="reveal"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full max-w-7xl flex flex-col items-center z-10 pt-12 pb-32"
          >
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#E0B84C] text-xs tracking-[0.5em] uppercase font-serif mb-16"
            >
                Sua Revelação Sagrada
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full mt-10 items-start">
              {readingCards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  animate={revealedCount > i ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center px-4"
                >
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={revealedCount > i ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                    className="text-[#E0B84C]/40 text-[10px] tracking-[0.5em] uppercase mb-10 font-serif font-bold text-center h-4"
                  >
                    {card.label}
                  </motion.span>
                  
                  <div className="relative w-64 h-[400px] md:w-72 md:h-[450px] mb-10" style={{ perspective: '2000px' }}>
                    <motion.div 
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 180 }}
                      transition={{ duration: 1.5, delay: 0.3, type: 'spring', stiffness: 70, damping: 15 }}
                      className="w-full h-full relative"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Back (Static) */}
                      <div 
                        className="absolute inset-0 bg-[#1C1024] border border-[#E0B84C]/10 rounded-[24px] flex items-center justify-center shadow-2xl"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                         <CardNoise />
                         <div className="absolute inset-4 border border-[#E0B84C]/5 rounded-[18px]" />
                         <Moon className="w-10 h-10 text-[#E0B84C]/5" />
                      </div>

                      {/* Front (Revealed Content) */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-b from-[#1C1024] to-[#120817] border border-[#E0B84C]/30 rounded-[24px] flex flex-col items-center justify-center p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <CardNoise />
                        <div className="absolute inset-4 border border-[#E0B84C]/10 rounded-[18px]" />
                        <motion.span 
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                          className="text-[100px] mb-8 filter drop-shadow-[0_0_20px_rgba(224,184,76,0.2)] leading-none"
                        >
                          {card.symbol}
                        </motion.span>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5 }}
                          className="flex flex-col items-center text-center"
                        >
                          <h4 className="text-3xl font-serif text-[#E0B84C] tracking-widest leading-tight mb-4 uppercase">
                            {card.name}
                          </h4>
                          <div className="h-px w-8 bg-[#E0B84C]/30" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={revealedCount > i ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="text-center"
                  >
                    <p className="text-lg text-[#FFF8E7]/80 leading-relaxed max-w-[280px] font-light italic font-serif">
                      "{card.meaning}"
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {revealedCount === 3 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-24 flex flex-col items-center gap-6 text-[#E0B84C]/30"
                >
                    <span className="text-[10px] tracking-[0.6em] uppercase font-serif">A síntese final aguarda abaixo</span>
                    <motion.div 
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-6 h-6" />
                    </motion.div>
                </motion.div>
            )}
          </motion.div>
        )}

        {/* ── FASE 4: INTERPRETACAO & URGENCIA ────────────────────────── */}
        {phase === 4 && (
          <motion.div 
            key="interpretation"
            initial={{ opacity: 0, y: 80 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl flex flex-col items-center space-y-24 z-10 pt-10 pb-40"
          >
            {/* Bloco Interpretativo Principal */}
            <div id="interpretation-start" className="w-full p-10 md:p-20 rounded-[40px] md:rounded-[80px] bg-gradient-to-b from-[#1C1024] to-[#120817] border border-[#2A1834] shadow-[0_40px_100px_rgba(0,0,0,0.7)] text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E0B84C]/40 to-transparent" />
               <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E0B84C]/5 blur-[120px] rounded-full" />
               <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#7A1F4B]/5 blur-[120px] rounded-full" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <Eye className="w-10 h-10 text-[#E0B84C]/40 mx-auto mb-6" />
                <h2 className="text-4xl md:text-6xl font-serif mb-8 gold-text leading-tight">
                  A verdade revelada <br className="hidden md:block" /> pelo campo vibracional
                </h2>
              </motion.div>
              
              <div className="space-y-16 text-[#FFF8E7]/90 text-2xl md:text-3xl font-light leading-relaxed">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <p>As cartas confirmam o que sua alma já suspeitava:</p>
                  <strong className="text-[#E0B84C] font-normal text-4xl md:text-5xl block font-serif italic drop-shadow-sm tracking-tight">
                    "O vínculo de vocês ainda pulsa."
                  </strong>
                </motion.div>
                
                <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.3 }}
                   className="text-2xl md:text-3xl font-serif italic text-[#FFF8E7]/70 leading-relaxed"
                >
                  Existe sentimento residual intenso, uma memória emocional ativa e, o mais importante: uma abertura energética real para a reconexão imediata.
                </motion.p>
                
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#E0B84C]/30 to-transparent mx-auto" />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6"
                >
                  <p>Porém, há um aviso crítico:</p>
                  <p className="text-[#FFF8E7]/50 text-xl md:text-2xl">
                    Um bloqueio de comunicação está agindo como uma barreira invisível. Se você não souber o código exato para atravessar essa defesa, o orgulho dele pode cristalizar o afastamento.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="pt-8"
                >
                  <p className="text-[#FFF8E7] text-2xl md:text-3xl mb-4 font-serif">
                    Ele está em um momento de vulnerabilidade silenciosa.
                  </p>
                  <p className="text-[#E0B84C] font-bold text-3xl md:text-4xl uppercase tracking-tighter">
                    As próximas 48 horas são decisivas.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* FASE 4: ALERTA DE URGÊNCIA */}
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full p-10 md:p-16 rounded-[40px] bg-[#1a0a14] border border-[#7A1F4B]/30 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7A1F4B]/10 to-transparent pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
                <div className="shrink-0">
                    <div className="bg-[#7A1F4B]/40 p-6 rounded-3xl border border-[#7A1F4B]/60 shadow-[0_0_30px_rgba(122,31,75,0.3)]">
                        <Zap className="text-[#E0B84C] w-12 h-12 fill-[#E0B84C]/10" />
                    </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                    <h4 className="text-2xl md:text-3xl font-serif text-[#E0B84C] mb-6 flex items-center justify-center md:justify-start gap-3">
                        Janela de Oportunidade Aberta
                    </h4>
                    <p className="text-[#FFF8E7]/90 text-xl md:text-2xl leading-relaxed font-light mb-6">
                        O alinhamento das cartas revela um movimento energético favorável nos próximos 
                        <span className="font-bold text-[#E0B84C] mx-2">7 a 21 dias</span>. 
                    </p>
                    <p className="text-[#FFF8E7]/50 text-lg italic font-serif leading-relaxed">
                        Qualquer erro estratégico agora pode fechar essa porta definitivamente. <br className="hidden md:block" />
                        Você precisa agir com precisão cirúrgica no subconsciente dele.
                    </p>
                </div>
              </div>
            </motion.div>

            {/* FASE 5: CTA FINAL */}
            <div className="text-center space-y-12 pt-10 w-full pb-20">
              <div className="space-y-6">
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[#FFF8E7]/40 text-2xl font-light tracking-wide"
                >
                    A confirmação foi dada. O destino falou.
                </motion.p>
                <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-serif italic gold-text px-4"
                >
                    Você está a um passo de saber <br className="hidden md:block" /> exatamente como trazê-lo de volta.
                </motion.h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 80px rgba(224,184,76,0.5)' }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToOffer}
                className="bg-[#E0B84C] text-[#120817] px-10 py-8 md:px-14 md:py-10 rounded-full text-xl md:text-3xl font-bold tracking-tight shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-[#F0D07A] transition-all duration-500 w-full max-w-3xl border-b-[6px] border-[#c49a2e] relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-[-20deg]" />
                <span className="relative z-10 uppercase">Desbloquear meu direcionamento agora</span>
              </motion.button>

              <div className="flex flex-col items-center gap-8">
                <div className="h-16 w-px bg-gradient-to-b from-[#E0B84C]/40 to-transparent" />
                <p className="text-[#FFF8E7]/20 text-[10px] tracking-[0.6em] uppercase font-serif max-w-xs leading-relaxed">
                  Esta leitura é única e será expirada ao fechar esta página.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gold-text {
          background: linear-gradient(135deg, #f0d07a, #E0B84C, #c49a2e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
