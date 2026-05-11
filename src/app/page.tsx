"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield, Star, Sparkles, CheckCircle2, Lock, ArrowRight, Eye, Moon } from "lucide-react";

/* ── Components ─────────────────────────────────────────────────── */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#E0B84C]/20 bg-[#E0B84C]/5 text-[#E0B84C] text-[10px] font-medium tracking-[0.2em] uppercase font-sans mb-6"
    >
      {children}
    </motion.span>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#E0B84C] text-[#E0B84C]" />
      ))}
    </div>
  );
}

function SectionHeading({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-serif text-[#FFF8E7] mb-6 leading-tight"
      >
        {title}
      </motion.h2>
      <div className={`h-[1px] w-12 bg-[#E0B84C]/30 mb-6 ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#FFF8E7]/50 text-lg font-light max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function HowCard({ num, title, text, delay = 0 }: { num: number; title: string; text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group p-10 rounded-[32px] bg-[#1C1024] border border-[#2A1834] hover:border-[#E0B84C]/20 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 text-6xl font-serif text-[#E0B84C]/5 italic group-hover:text-[#E0B84C]/10 transition-colors">
        0{num}
      </div>
      <div className="w-12 h-12 rounded-2xl bg-[#E0B84C]/10 flex items-center justify-center text-[#E0B84C] font-serif text-xl mb-8 border border-[#E0B84C]/20">
        {num}
      </div>
      <h4 className="text-xl font-serif text-[#E0B84C] mb-4 tracking-wide">{title}</h4>
      <p className="text-[#FFF8E7]/60 font-light leading-relaxed text-sm">
        {text}
      </p>
    </motion.div>
  );
}

function TestimonialCard({ quote, name, location, delay = 0 }: { quote: string; name: string; location: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-10 rounded-[32px] bg-[#1C1024] border border-[#2A1834] flex flex-col gap-8 relative"
    >
      <Stars />
      <p className="text-[#FFF8E7]/80 italic font-serif text-lg leading-relaxed">
        "{quote}"
      </p>
      <div className="pt-6 border-t border-[#FFF8E7]/5 flex items-center justify-between">
        <div>
          <p className="text-[#E0B84C] font-serif text-sm tracking-widest uppercase">{name}</p>
          <p className="text-[#FFF8E7]/30 text-[10px] mt-1 uppercase tracking-tighter">{location}</p>
        </div>
        <CheckCircle2 className="w-5 h-5 text-[#E0B84C]/20" />
      </div>
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E0B84C]/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-8 bg-transparent border-none cursor-pointer text-left group"
      >
        <span className="text-lg md:text-xl font-serif text-[#FFF8E7]/90 group-hover:text-[#E0B84C] transition-colors pr-8">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#E0B84C] transition-transform duration-500 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="pb-8 text-[#FFF8E7]/50 font-light leading-relaxed text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Visual Scenes ──────────────────────────────────────────────── */

function TarotScene() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center pointer-events-none">
      <div className="absolute w-64 h-80 bg-[#E0B84C]/5 blur-[80px] rounded-full animate-pulse" />
      
      {/* Card 1 */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [-8, -6, -8]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-40 h-64 md:w-48 md:h-72 bg-[#1C1024] border border-[#E0B84C]/20 rounded-2xl shadow-2xl z-10 -translate-x-32 md:-translate-x-40 flex flex-col items-center justify-center"
      >
        <div className="absolute inset-2 border border-[#E0B84C]/5 rounded-xl" />
        <div className="flex flex-col items-center justify-center gap-4 opacity-40">
            <Moon className="w-8 h-8 text-[#E0B84C]" />
            <span className="text-[8px] tracking-[0.4em] uppercase font-serif text-[#E0B84C]">O Oculto</span>
        </div>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        animate={{ 
          y: [-10, 5, -10],
          rotate: [0, 1, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute w-44 h-72 md:w-56 md:h-80 bg-gradient-to-br from-[#1C1024] to-[#120817] border border-[#E0B84C]/40 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.6)] z-30 flex flex-col items-center justify-center"
      >
        <div className="absolute inset-2 border border-[#E0B84C]/20 rounded-xl" />
        <div className="flex flex-col items-center justify-center gap-6">
            <Sparkles className="w-12 h-12 text-[#E0B84C] drop-shadow-[0_0_15px_rgba(224,184,76,0.5)]" />
            <span className="text-[10px] tracking-[0.5em] uppercase font-serif text-[#E0B84C] font-bold">A Conexão</span>
        </div>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        animate={{ 
          y: [0, -12, 0],
          rotate: [8, 10, 8]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute w-40 h-64 md:w-48 md:h-72 bg-[#1C1024] border border-[#E0B84C]/20 rounded-2xl shadow-2xl z-20 translate-x-32 md:translate-x-40 flex flex-col items-center justify-center"
      >
        <div className="absolute inset-2 border border-[#E0B84C]/5 rounded-xl" />
        <div className="flex flex-col items-center justify-center gap-4 opacity-40">
            <Eye className="w-8 h-8 text-[#E0B84C]" />
            <span className="text-[8px] tracking-[0.4em] uppercase font-serif text-[#E0B84C]">O Destino</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────────── */

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const ofertaRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <main className="bg-[#120817] min-h-screen text-[#FFF8E7] selection:bg-[#E0B84C]/30 selection:text-[#FFF8E7] overflow-x-hidden">
      
      {/* ── Ambient Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E0B84C]/5 blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7A1F4B]/5 blur-[150px] translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* ── Section 1: Hero ── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16">
        <div className="container mx-auto px-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
            >
              <Badge>Acesso Restrito: Leitura Espiritual</Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FFF8E7] mb-8 leading-[1.1]">
                Ele realmente te esqueceu... <br className="hidden md:block" /> 
                ou ainda existe uma <br className="hidden md:block" />
                <span className="gold-text">conexão não encerrada?</span>
              </h1>

              <p className="text-lg md:text-xl font-light text-[#FFF8E7]/60 leading-relaxed mb-12 max-w-lg">
                Existe algo que ele ainda sente e talvez nem consiga admitir para si mesmo. 
                Sua leitura de Tarot revela o campo vibracional exato entre vocês hoje.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(224, 184, 76, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/tiragem")}
                    className="bg-[#E0B84C] text-[#120817] px-10 py-6 rounded-full text-lg font-bold tracking-tight shadow-2xl transition-all duration-500 w-full sm:w-auto uppercase"
                >
                  Ver Minha Leitura Agora
                </motion.button>
                <div className="flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-2 mb-1">
                        <Stars />
                        <span className="text-[#FFF8E7] text-xs font-bold tracking-widest">4.9/5</span>
                    </div>
                    <p className="text-[#FFF8E7]/30 text-[10px] uppercase tracking-widest">Baseado em +1.200 consulentes</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[#FFF8E7]/30">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.2em]">Sua sessão é sigilosa e privada</span>
              </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="hidden lg:block relative"
            >
              <TarotScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Como Funciona ── */}
      <section className="py-32 relative bg-[#1C1024]/40 border-y border-[#E0B84C]/5">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Como sua jornada de clareza acontece"
            subtitle="Uma experiência desenhada para traduzir o invisível em direcionamento prático."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowCard 
              num={1} 
              title="A Conexão" 
              text="Você escolhe 3 cartas que estão sintonizadas com o campo energético que vocês compartilham hoje."
              delay={0.1}
            />
            <HowCard 
              num={2} 
              title="A Revelação" 
              text="O Tarot decodifica o sentimento oculto, os bloqueios inconscientes e a janela de oportunidade aberta."
              delay={0.2}
            />
            <HowCard 
              num={3} 
              title="O Direcionamento" 
              text="Você recebe o plano exato para agir com estratégia, sem desperdiçar sua energia ou tempo."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── Section 3: Depoimentos ── */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Relatos de quem atravessou o silêncio"
            subtitle="Mulheres que usaram o direcionamento para retomar o controle de suas vidas amorosas."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="A precisão foi assustadora. Ele me mandou mensagem exatamente no dia que o Mapa previu. Estou em choque."
              name="Isabella V."
              location="São Paulo, SP"
              delay={0.1}
            />
            <TestimonialCard 
              quote="Eu estava perdida e desesperada. A leitura me deu a calma que eu precisava para agir com estratégia e não com impulso."
              name="Carolina M."
              location="Rio de Janeiro, RJ"
              delay={0.2}
            />
            <TestimonialCard 
              quote="Não é apenas tarot, é um manual psicológico. Entendi os bloqueios dele e soube como contornar sem me humilhar."
              name="Marina S."
              location="Belo Horizonte, MG"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── Section 4: Oferta ── */}
      <section ref={ofertaRef} id="oferta-mapa" className="py-32 relative bg-gradient-to-b from-[#1C1024] to-[#120817]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-[#1C1024] border border-[#E0B84C]/20 rounded-[48px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative group">
            
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Sparkles className="w-64 h-64 text-[#E0B84C]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side: Content */}
              <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-[#E0B84C]/10">
                <Badge>Oferta de Lançamento</Badge>
                <h2 className="text-3xl md:text-5xl font-serif text-[#FFF8E7] mb-8 leading-tight">
                  Seu Mapa dos <br className="hidden md:block" /> 
                  <span className="gold-text">21 Dias</span>
                </h2>
                <p className="text-[#FFF8E7]/60 text-lg font-light mb-10 leading-relaxed">
                  O guia definitivo para atravessar o silêncio dele e manifestar a reconexão que você deseja.
                </p>

                <ul className="space-y-6">
                  {[
                    "Diagnóstico emocional profundo",
                    "Janela de reconexão estratégica",
                    "Script de aproximação subconsciente",
                    "O que NÃO fazer (erros fatais)",
                    "Protocolo de magnetismo diário"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[#FFF8E7]/80 text-base">
                      <div className="w-5 h-5 rounded-full bg-[#E0B84C]/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#E0B84C]" />
                      </div>
                      <span className="font-light tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Price & CTA */}
              <div className="p-10 md:p-16 flex flex-col justify-center items-center text-center bg-[#120817]/40 backdrop-blur-sm">
                <div className="mb-10">
                    <p className="text-[#E0B84C]/50 text-xs tracking-[0.4em] uppercase mb-4">Investimento Especial</p>
                    <div className="flex items-baseline gap-4 justify-center">
                        <span className="text-6xl md:text-8xl font-serif text-[#E0B84C]">97</span>
                        <div className="text-left">
                            <p className="text-[#E0B84C] text-2xl font-serif">R$</p>
                            <p className="text-[#FFF8E7]/20 text-lg line-through">197</p>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-6">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push("/checkout")}
                        className="bg-[#E0B84C] text-[#120817] w-full py-8 rounded-[24px] text-xl font-bold tracking-tight shadow-2xl flex items-center justify-center gap-3 group/btn"
                    >
                        <span>RECEBER MEU MAPA AGORA</span>
                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </motion.button>
                    
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-[#FFF8E7]/30 text-[10px] uppercase tracking-[0.2em]">
                            <Shield className="w-3 h-3" />
                            <span>Acesso imediato e seguro</span>
                        </div>
                        <p className="text-[#FFF8E7]/20 text-[9px] uppercase tracking-[0.1em] max-w-[200px]">
                            Disponível por este valor apenas durante esta sessão.
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: FAQ ── */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading title="Perguntas Frequentes" centered />
          
          <div className="space-y-4">
            <FAQItem 
              q="A tiragem inicial é realmente gratuita?"
              a="Sim. A leitura das 3 cartas é 100% gratuita para que você comprove a conexão energética antes de investir no seu Mapa de Direcionamento."
            />
            <FAQItem 
              q="Como vou receber o Mapa dos 21 Dias?"
              a="Imediatamente após a confirmação do pagamento, você receberá um e-mail com os dados de acesso à sua área privada onde o Mapa estará disponível."
            />
            <FAQItem 
              q="Funciona se ele estiver com outra pessoa?"
              a="O Mapa analisa a conexão espiritual e subconsciente. Se ainda houver resíduo emocional entre vocês (o que a tiragem revela), o método é aplicável."
            />
            <FAQItem 
              q="E se eu não gostar do conteúdo?"
              a="Oferecemos uma garantia incondicional de 30 dias. Se você sentir que o direcionamento não faz sentido para o seu caso, devolvemos 100% do seu investimento."
            />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-20 border-t border-[#E0B84C]/10">
        <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-serif text-[#FFF8E7]/20 mb-12 tracking-[0.3em] uppercase">Amor da Lua</h3>
            
            <div className="flex justify-center gap-10 mb-12 flex-wrap">
                {["Privacidade", "Termos", "Contato", "Afiliados"].map((link, i) => (
                    <a key={i} href="#" className="text-[#FFF8E7]/40 hover:text-[#E0B84C] transition-colors text-[10px] uppercase tracking-[0.3em] font-sans">
                        {link}
                    </a>
                ))}
            </div>
            
            <p className="text-[#FFF8E7]/10 text-[9px] uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                Este site não faz parte do Facebook ou Google. Além disso, este site NÃO é endossado por essas plataformas em qualquer aspecto. 
                Os resultados podem variar de pessoa para pessoa.
            </p>
            
            <p className="mt-12 text-[#FFF8E7]/20 text-[10px] uppercase tracking-[0.1em]">
                © 2024 Amor da Lua · Todos os direitos reservados
            </p>
        </div>
      </footer>

      <style jsx global>{`
        .gold-text {
          background: linear-gradient(135deg, #f0d07a, #E0B84C, #c49a2e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </main>
  );
}
