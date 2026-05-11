import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Sparkles, Loader2 } from 'lucide-react';

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
  const [phase, setPhase] = useState(1); // 1: Selection, 2: Loading/Reveal, 3: Interpretation
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [readingCards, setReadingCards] = useState<any[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);

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
    if (count === 0) return "Selecione 3 cartas";
    if (count === 1) return "Faltam 2 cartas";
    if (count === 2) return "Falta 1 carta";
    return "Sua leitura está pronta";
  };

  const startReveal = () => {
    if (selectedIndices.length !== 3) return;
    
    // Select the "rigged" cards
    const hope = CATEGORY_CARDS.hope[Math.floor(Math.random() * CATEGORY_CARDS.hope.length)];
    const block = CATEGORY_CARDS.block[Math.floor(Math.random() * CATEGORY_CARDS.block.length)];
    const solution = CATEGORY_CARDS.solution[Math.floor(Math.random() * CATEGORY_CARDS.solution.length)];
    
    setReadingCards([
      { ...hope, label: 'O que ele sente por você' },
      { ...block, label: 'O que está bloqueando' },
      { ...solution, label: 'O caminho possível' }
    ]);
    
    setPhase(2);
  };

  // Loading progress effect
  useEffect(() => {
    if (phase === 2) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Reveal cards one by one
  useEffect(() => {
    if (loadingProgress === 100 && revealedCount < 3) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 900);
      return () => clearTimeout(timer);
    }
    if (loadingProgress === 100 && revealedCount === 3) {
        // Automatically transition to interpretation after a brief delay
        const timer = setTimeout(() => setPhase(3), 1500);
        return () => clearTimeout(timer);
    }
  }, [loadingProgress, revealedCount]);

  const scrollToOffer = () => {
    // If we are on the home page, scroll to offer. 
    // If not, we might need to redirect or handle it differently.
    const element = document.getElementById('oferta-mapa');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Fallback: router push to home with anchor or just home
        router.push('/#oferta');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#120817] text-[#FFF8E7] font-sans overflow-hidden flex flex-col items-center py-12 px-4 select-none">
      
      {/* ── PHASE 1: SELECTION ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div 
            key="selection"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl flex flex-col items-center"
          >
            <span className="text-[#E0B84C] text-sm tracking-[0.3em] font-serif mb-4 uppercase">✦ Tiragem Especial ✦</span>
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-6 leading-tight">Escolha três cartas</h2>
            <p className="text-center text-[#FFF8E7]/70 max-w-md mb-12 font-light italic">
              Feche os olhos por um instante. Pense nele. <br/>
              Agora deixe sua intuição revelar o que ainda existe entre vocês.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {cardsPool.map((idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10, boxShadow: '0 0 20px rgba(224, 184, 76, 0.3)' }}
                  onClick={() => handleCardClick(idx)}
                  className={`relative w-28 h-44 md:w-32 md:h-52 rounded-xl cursor-pointer border-2 transition-all duration-300
                    ${selectedIndices.includes(idx) 
                      ? 'border-[#E0B84C] bg-[#1C1024] rotate-y-180 scale-105 z-10 shadow-[0_0_15px_rgba(224,184,76,0.3)]' 
                      : 'border-[#2A1834] bg-[#1C1024]'
                    }`}
                  style={{
                    perspective: '1000px',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 rounded-xl">
                    <div className="w-full h-full border border-[#E0B84C]/10 rounded-lg flex items-center justify-center bg-[#1C1024]">
                       <Sparkles className={`w-6 h-6 transition-colors ${selectedIndices.includes(idx) ? 'text-[#E0B84C]' : 'text-[#E0B84C]/10'}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6">
               <p className={`text-xl font-serif transition-colors duration-300 ${selectedIndices.length === 3 ? 'text-[#E0B84C]' : 'text-[#FFF8E7]/50'}`}>
                {getMessage()}
               </p>
               
               <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startReveal}
                disabled={selectedIndices.length !== 3}
                className={`px-10 py-4 rounded-full font-bold tracking-widest uppercase transition-all duration-500
                  ${selectedIndices.length === 3 
                    ? 'bg-[#E0B84C] text-[#120817] shadow-[0_0_30px_rgba(224,184,76,0.4)] cursor-pointer' 
                    : 'bg-[#2A1834] text-[#FFF8E7]/20 cursor-not-allowed'}`}
               >
                REVELAR MINHA LEITURA
               </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 2: LOADING & REVEAL ──────────────────────────────── */}
        {phase === 2 && (
          <motion.div 
            key="reveal"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full max-w-5xl flex flex-col items-center"
          >
            {loadingProgress < 100 ? (
              <div className="flex flex-col items-center py-20">
                <Loader2 className="w-12 h-12 text-[#E0B84C] animate-spin mb-6" />
                <h3 className="text-2xl font-serif mb-8 italic">Interpretando os sinais energéticos...</h3>
                <div className="w-64 h-1.5 bg-[#2A1834] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    className="h-full bg-[#E0B84C]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-12">
                {readingCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={revealedCount > i ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-[#E0B84C]/60 text-xs tracking-widest uppercase mb-6 font-serif">{card.label}</span>
                    <div className="w-56 h-80 bg-[#1C1024] border border-[#E0B84C]/30 rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl relative group mb-8">
                      <div className="absolute inset-2 border border-[#E0B84C]/10 rounded-xl pointer-events-none" />
                      <span className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-700 ease-out">{card.symbol}</span>
                      <h4 className="text-2xl font-serif text-[#E0B84C] tracking-wide text-center">{card.name}</h4>
                    </div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={revealedCount > i ? { opacity: 1 } : {}}
                      transition={{ delay: 0.4 }}
                      className="text-center text-base text-[#FFF8E7]/80 leading-relaxed max-w-[240px]"
                    >
                      {card.meaning}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── PHASE 3: INTERPRETATION & CTA ──────────────────────────── */}
        {phase === 3 && (
          <motion.div 
            key="interpretation"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl flex flex-col items-center space-y-12"
          >
            {/* Bloco Interpretativo Principal */}
            <div className="w-full p-8 md:p-12 rounded-3xl bg-[#1C1024] border border-[#2A1834] shadow-2xl text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E0B84C]/30 to-transparent" />
              <h3 className="text-3xl md:text-4xl font-serif mb-10 text-[#E0B84C]">O que as cartas revelam sobre vocês</h3>
              <div className="space-y-8 text-[#FFF8E7]/90 text-xl font-light leading-relaxed">
                <p>
                  As três cartas revelam algo importante: <br/>
                  <strong className="text-[#E0B84C] font-normal text-2xl">o vínculo entre vocês não desapareceu.</strong>
                </p>
                <p>
                  Existe sentimento residual, memória emocional ativa e uma abertura real de reconexão.
                </p>
                <p>
                  Mas as cartas também mostram um bloqueio. Algo na dinâmica entre vocês está impedindo que esse movimento aconteça naturalmente.
                </p>
                <p className="pt-6 text-[#E0B84C]/80 italic border-t border-[#2A1834]">
                  A questão agora não é descobrir se ele ainda sente. A questão é saber exatamente como agir antes que essa abertura emocional se feche.
                </p>
                <p className="font-semibold text-2xl text-[#FFF8E7] pt-4">
                  As próximas atitudes definem tudo.
                </p>
              </div>
            </div>

            {/* Alerta de Urgência */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full p-8 rounded-2xl bg-[#2D1220] border border-[#7A1F4B]/30 flex flex-col md:flex-row items-center gap-8"
            >
              <div className="bg-[#7A1F4B]/30 p-5 rounded-full shadow-[0_0_20px_rgba(122,31,75,0.4)]">
                <AlertTriangle className="text-[#E0B84C] w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-serif text-[#E0B84C] mb-3 flex items-center gap-2">
                  ⚠ Janela emocional identificada
                </h4>
                <p className="text-[#FFF8E7]/90 text-base leading-relaxed">
                  As cartas mostram movimento energético real nos próximos <span className="font-bold text-[#E0B84C] text-lg">7 a 21 dias</span>. 
                  Uma atitude impulsiva pode encerrar essa abertura. Agir com clareza agora é o que separa reconexão de encerramento definitivo.
                </p>
              </div>
            </motion.div>

            {/* CTA Final */}
            <div className="text-center space-y-10 pb-20 w-full">
              <div className="space-y-2">
                <p className="text-[#FFF8E7]/60 text-xl font-light">
                    Você já recebeu a confirmação.
                </p>
                <p className="text-[#FFF8E7] text-2xl font-serif italic">
                    Agora falta o direcionamento exato.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(224,184,76,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToOffer}
                className="bg-[#E0B84C] text-[#120817] px-16 py-7 rounded-2xl text-2xl font-bold tracking-tight shadow-2xl cursor-pointer hover:bg-[#F0D07A] transition-all duration-300 w-full max-w-xl"
              >
                DESBLOQUEAR MEU DIRECIONAMENTO AGORA
              </motion.button>

              <p className="text-[#FFF8E7]/30 text-sm tracking-[0.2em] uppercase">
                Sua leitura permanecerá acessível apenas nesta sessão.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
