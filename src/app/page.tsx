"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Sparkles, Star, Lock } from "lucide-react";

// ── Main Page ─────────────────────────────────────────────────────────
export default function LuxuryLandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#120817]">
      {/* ── Background Glows ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7A1F4B, transparent)" }} />
      <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #E0B84C, transparent)" }} />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center">
        <div className="flex flex-col lg:flex-row w-full items-center min-h-screen">

          {/* Left Column: Copy & CTA — max 520px, ml 8%, centered vertically */}
          <div
            className="flex flex-col items-start justify-center z-10 animate-fade-in-up px-6 py-20 lg:py-0 w-full lg:w-[55%]"
            style={{ maxWidth: "520px", marginLeft: "clamp(24px, 8%, 120px)" }}
          >

            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-sm"
              style={{ background: "rgba(224, 184, 76, 0.08)", border: "1px solid rgba(224, 184, 76, 0.2)" }}>
              <Sparkles className="w-4 h-4 text-[#E0B84C]" />
              <span className="font-inter text-xs tracking-[0.2em] uppercase text-[#E0B84C] font-medium">
                Consulta Privada de Reconexão
              </span>
            </div>

            {/* Headline — 35% smaller, 3 lines, no italic, gold only on line 3 */}
            <h1 className="font-playfair font-normal leading-[1.2] text-[#FFF8E7]" style={{ marginBottom: "28px" }}>
              <span className="block text-[26px] sm:text-[32px] lg:text-[38px]">
                Ele realmente te esqueceu...
              </span>
              <span className="block text-[26px] sm:text-[32px] lg:text-[38px]">
                ou ainda existe uma
              </span>
              <span className="block text-[26px] sm:text-[32px] lg:text-[38px] text-gradient-gold">
                conexão não encerrada?
              </span>
            </h1>

            <p className="font-inter text-base sm:text-lg font-light leading-relaxed text-[#FFF8E7]/80 max-w-[480px]" style={{ marginBottom: "32px" }}>
              Descubra através das cartas o que ele sente hoje e qual atitude exata pode reabrir essa conexão no tempo certo.
            </p>

            {/* CTA — exact specs: bg #E0B84C, text #120817, py 18px px 36px, rounded 14px, gold glow */}
            <button
              onClick={() => router.push("/consulta")}
              className="font-inter font-semibold text-[15px] tracking-wide uppercase w-full sm:w-auto flex items-center justify-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
              style={{
                background: "#E0B84C",
                color: "#120817",
                padding: "18px 36px",
                borderRadius: "14px",
                boxShadow: "0 0 25px rgba(224, 184, 76, 0.35), 0 4px 15px rgba(224, 184, 76, 0.2)",
                border: "none",
                marginBottom: "18px",
              }}
            >
              FAZER MINHA LEITURA GRATUITA
            </button>

            <div className="flex items-center gap-4 opacity-60">
              <div className="flex items-center gap-1.5 font-inter text-xs tracking-wider uppercase">
                <Lock className="w-3.5 h-3.5" /> Consulta Sigilosa
              </div>
              <div className="w-1 h-1 rounded-full bg-[#E0B84C]" />
              <div className="flex items-center gap-1.5 font-inter text-xs tracking-wider uppercase">
                <Star className="w-3.5 h-3.5" /> Resultado Imediato
              </div>
            </div>
          </div>

          {/* Right Column: 3 large floating tarot cards — 40% of screen */}
          <div className="relative w-full lg:w-[40%] h-[450px] lg:h-screen flex items-center justify-center z-0">
            {/* Ambient glow behind cards */}
            <div className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #E0B84C, transparent)" }} />

            {/* Card 1 — Left, tilted back */}
            <div
              className="absolute tarot-card-luxury flex flex-col items-center justify-center animate-float"
              style={{
                width: "180px", height: "290px",
                top: "50%", left: "50%",
                marginTop: "-145px", marginLeft: "-160px",
                transform: "rotate(-14deg)",
                zIndex: 10,
              }}
            >
              <div className="text-5xl mb-4 opacity-90">🌙</div>
              <div className="font-playfair text-[#E0B84C] text-sm text-center uppercase tracking-[0.15em]">O Oculto</div>
            </div>

            {/* Card 2 — Center, front */}
            <div
              className="absolute tarot-card-luxury flex flex-col items-center justify-center animate-float-delayed"
              style={{
                width: "190px", height: "310px",
                top: "50%", left: "50%",
                marginTop: "-155px", marginLeft: "-95px",
                transform: "rotate(3deg)",
                zIndex: 30,
              }}
            >
              <div className="text-5xl mb-4 opacity-90">✨</div>
              <div className="font-playfair text-[#E0B84C] text-sm text-center uppercase tracking-[0.15em]">A Conexão</div>
            </div>

            {/* Card 3 — Right, tilted forward */}
            <div
              className="absolute tarot-card-luxury flex flex-col items-center justify-center animate-float-slow"
              style={{
                width: "175px", height: "285px",
                top: "50%", left: "50%",
                marginTop: "-142px", marginLeft: "-20px",
                transform: "rotate(16deg)",
                zIndex: 20,
              }}
            >
              <div className="text-5xl mb-4 opacity-90">👁️</div>
              <div className="font-playfair text-[#E0B84C] text-sm text-center uppercase tracking-[0.15em]">O Destino</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. SOCIAL PROOF ── */}
      <section className="py-24 px-6 relative bg-[#1D0E25]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-playfair text-3xl md:text-4xl text-[#E0B84C] mb-4">
              Vozes da Intuição
            </h2>
            <div className="w-12 h-[1px] bg-[#E0B84C] mx-auto opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Foi como se as cartas lessem a minha alma. Tudo que ele não me dizia, a consulta revelou. Voltei a falar com ele e ele confirmou tudo.", name: "Isabella V." },
              { text: "Estávamos afastados há meses. O direcionamento do tarot me deu a clareza exata de qual postura adotar. Hoje, a conexão renasceu.", name: "Carolina M." },
              { text: "Eu não entendia os sinais confusos que ele dava. A leitura me mostrou a ferida que ele carregava. Com apenas uma atitude minha, tudo mudou.", name: "Marina S." },
            ].map((item, i) => (
              <div key={i} className="glass-luxury p-8 flex flex-col justify-between group hover:border-[#E0B84C]/40 transition-colors duration-500">
                <div className="mb-6 flex gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-[#E0B84C] text-[#E0B84C]" />)}
                </div>
                <p className="font-inter font-light text-[15px] leading-loose text-[#FFF8E7]/80 mb-8 italic">
                  "{item.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#E0B84C]/30 group-hover:bg-[#E0B84C]/60 transition-colors" />
                  <p className="font-playfair text-sm tracking-widest text-[#E0B84C] uppercase">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMO FUNCIONA ── */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-playfair text-3xl md:text-4xl text-[#FFF8E7] mb-6">
            A Jornada da <span className="text-gradient-gold">Clareza</span>
          </h2>
          <p className="font-inter font-light text-lg text-[#FFF8E7]/60">
            Três etapas simples para revelar o que está oculto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Horizontal Line Desktop */}
          <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#E0B84C]/30 to-transparent" />
          
          {[
            { num: "I", title: "Sintonia", desc: "Você responderá três perguntas essenciais para conectar sua energia ao momento atual." },
            { num: "II", title: "Revelação", desc: "Nossa leitura mística tirará as cartas certas para expor a verdade emocional dele." },
            { num: "III", title: "Direcionamento", desc: "Receba um plano claro de postura e atitude para transformar o afastamento em reconexão." },
          ].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-[#120817] border border-[#E0B84C]/40 flex items-center justify-center mb-8 relative z-10 group-hover:border-[#E0B84C] transition-colors duration-500 shadow-[0_0_15px_rgba(224,184,76,0.1)]">
                <span className="font-playfair text-[#E0B84C]">{step.num}</span>
              </div>
              <h3 className="font-playfair text-xl text-[#FFF8E7] mb-4">{step.title}</h3>
              <p className="font-inter font-light text-sm leading-relaxed text-[#FFF8E7]/60 px-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button
            onClick={() => router.push("/consulta")}
            className="font-inter text-sm tracking-[0.2em] uppercase text-[#E0B84C] border-b border-[#E0B84C]/30 pb-1 hover:border-[#E0B84C] transition-colors"
          >
            Iniciar Sintonia Agora
          </button>
        </div>
      </section>

      {/* ── 4. GARANTIA / TRUST ── */}
      <section className="py-24 px-6 bg-[#1D0E25]/50 border-t border-[#E0B84C]/10">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-10 h-10 mx-auto text-[#E0B84C] mb-8 opacity-80" />
          <h2 className="font-playfair text-2xl md:text-3xl text-[#FFF8E7] mb-6">
            Tranquilidade Absoluta
          </h2>
          <p className="font-inter font-light text-[15px] leading-relaxed text-[#FFF8E7]/70 mb-10">
            A sua consulta inicial é completamente gratuita. Caso decida prosseguir com o Mapa dos 21 Dias, 
            seu investimento estará coberto por nossa garantia incondicional de 30 dias. 
            Se não sentir a conexão reestabelecida, devolvemos seu valor integralmente.
          </p>
          <button
            onClick={() => router.push("/consulta")}
            className="btn-luxury font-inter font-semibold text-sm tracking-widest uppercase px-10 py-4"
          >
            Acessar Leitura
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 border-t border-[#E0B84C]/10 text-center">
        <div className="text-2xl mb-6 opacity-50">🌙</div>
        <p className="font-inter font-light text-xs tracking-wider uppercase text-[#FFF8E7]/30 mb-4">
          O amor é energia. A reconexão é escolha.
        </p>
        <div className="flex items-center justify-center gap-6 font-inter text-[10px] uppercase tracking-widest text-[#FFF8E7]/20">
          <a href="#" className="hover:text-[#E0B84C]/60 transition-colors">Privacidade</a>
          <span>|</span>
          <a href="#" className="hover:text-[#E0B84C]/60 transition-colors">Termos de Uso</a>
          <span>|</span>
          <span>© 2024 Tarot Reconexão</span>
        </div>
      </footer>

    </main>
  );
}
