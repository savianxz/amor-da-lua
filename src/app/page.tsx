"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Sparkles, Star, Lock, Moon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
export default function LuxuryLandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Scroll to quiz section OR navigate to /consulta
  const handleCTA = () => {
    if (quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/consulta");
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#120817]">

      {/* ── Background Glows ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7A1F4B, transparent)" }} />
      <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #E0B84C, transparent)" }} />

      {/* ═══════════════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center">
        <div className="flex flex-col lg:flex-row w-full items-center min-h-screen">

          {/* ── LEFT: Copy & CTA ── */}
          <div
            className="flex flex-col items-start justify-center z-10 animate-fade-in-up px-6 py-20 lg:py-0 w-full lg:w-[60%]"
            style={{ maxWidth: "540px", marginLeft: "clamp(20px, 8%, 120px)" }}
          >
            {/* Sello Método Exclusivo */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full"
              style={{
                background: "rgba(122, 31, 75, 0.15)",
                border: "1px solid rgba(122, 31, 75, 0.5)",
              }}>
              <Moon className="w-3.5 h-3.5 text-[#E0B84C]" />
              <span className="font-inter text-[11px] tracking-[0.18em] uppercase text-[#E0B84C] font-medium">
                Leitura de Reconexão Lunar · Método Exclusivo
              </span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-7 rounded-sm"
              style={{ background: "rgba(224, 184, 76, 0.07)", border: "1px solid rgba(224, 184, 76, 0.18)" }}>
              <Sparkles className="w-3.5 h-3.5 text-[#E0B84C]" />
              <span className="font-inter text-[11px] tracking-[0.2em] uppercase text-[#E0B84C] font-medium">
                Consulta Privada de Reconexão
              </span>
            </div>

            {/* Headline — 3 lines, no italic, gold only line 3 */}
            <h1 className="font-playfair font-normal leading-[1.2] text-[#FFF8E7]" style={{ marginBottom: "28px" }}>
              <span className="block text-[27px] sm:text-[33px] lg:text-[39px]">
                Ele realmente te esqueceu...
              </span>
              <span className="block text-[27px] sm:text-[33px] lg:text-[39px]">
                ou ainda existe uma
              </span>
              <span className="block text-[27px] sm:text-[33px] lg:text-[39px] text-gradient-gold">
                conexão não encerrada?
              </span>
            </h1>

            {/* Subheadline — new copy */}
            <p
              className="font-inter text-base sm:text-[17px] font-light leading-relaxed text-[#FFF8E7]/80 max-w-[480px]"
              style={{ marginBottom: "32px" }}
            >
              Existe algo que ele ainda sente e talvez nem consiga admitir. Sua leitura revela se essa conexão ainda pode ser reativada.
            </p>

            {/* ── CTA DOMINANTE ── */}
            <button
              onClick={handleCTA}
              className="font-inter font-bold text-[15px] tracking-widest uppercase w-full sm:w-auto flex items-center justify-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #C9A438, #E0B84C, #F0CD72)",
                color: "#120817",
                padding: "20px 40px",
                borderRadius: "14px",
                border: "none",
                animation: "pulse-cta 3s ease-in-out infinite",
                marginBottom: "18px",
                letterSpacing: "0.08em",
              }}
            >
              QUERO VER MINHA LEITURA AGORA
            </button>

            {/* Social Proof inline */}
            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-4 h-4 fill-[#E0B84C] text-[#E0B84C]" />
                  ))}
                </div>
                <span className="font-inter text-sm text-[#FFF8E7]/90 font-medium">
                  327 leituras realizadas recentemente
                </span>
              </div>
              <p className="font-inter text-xs text-[#FFF8E7]/45 tracking-wide">
                Resultados privados e sigilosos
              </p>
            </div>

            {/* Emotional Microcopy */}
            <p className="font-playfair text-sm italic text-[#FFF8E7]/50 leading-relaxed mb-6">
              "Algumas conexões se encerram.<br />
              Outras apenas entram em silêncio."
            </p>

            {/* Trust pills */}
            <div className="flex items-center gap-5 opacity-55">
              <div className="flex items-center gap-1.5 font-inter text-[11px] tracking-wider uppercase">
                <Lock className="w-3 h-3" /> Sigilosa
              </div>
              <div className="w-px h-3 bg-[#E0B84C]/30" />
              <div className="flex items-center gap-1.5 font-inter text-[11px] tracking-wider uppercase">
                <Sparkles className="w-3 h-3" /> Resultado Imediato
              </div>
              <div className="w-px h-3 bg-[#E0B84C]/30" />
              <div className="flex items-center gap-1.5 font-inter text-[11px] tracking-wider uppercase">
                <Shield className="w-3 h-3" /> Gratuita
              </div>
            </div>
          </div>

          {/* ── RIGHT: 3 Large Floating Tarot Cards — 35% of screen ── */}
          <div className="relative w-full lg:w-[35%] h-[460px] lg:h-screen flex items-center justify-center z-0 flex-shrink-0">
            {/* Layered ambient glow */}
            <div className="absolute w-[280px] h-[380px] rounded-[50%] blur-[90px] opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, #E0B84C 0%, #7A1F4B 50%, transparent 80%)" }} />

            {/* Card 1 — far back left */}
            <div
              className="absolute tarot-card-luxury flex flex-col items-center justify-center gap-3 animate-float"
              style={{
                width: "160px", height: "270px",
                top: "50%", left: "50%",
                marginTop: "-135px", marginLeft: "-185px",
                transform: "rotate(-16deg)",
                zIndex: 10,
                filter: "drop-shadow(0 0 18px rgba(224,184,76,0.18))",
                opacity: 0.85,
              }}
            >
              <div className="text-[42px]">🌙</div>
              <div className="font-playfair text-[#E0B84C] text-xs text-center uppercase tracking-[0.18em] px-3">O Oculto</div>
            </div>

            {/* Card 2 — front center (biggest) */}
            <div
              className="absolute tarot-card-luxury flex flex-col items-center justify-center gap-3 animate-float-delayed"
              style={{
                width: "185px", height: "305px",
                top: "50%", left: "50%",
                marginTop: "-152px", marginLeft: "-92px",
                transform: "rotate(2deg)",
                zIndex: 30,
                filter: "drop-shadow(0 0 30px rgba(224,184,76,0.35))",
              }}
            >
              <div className="text-[48px]">✨</div>
              <div className="font-playfair text-[#E0B84C] text-xs text-center uppercase tracking-[0.18em] px-3">A Conexão</div>
            </div>

            {/* Card 3 — back right */}
            <div
              className="absolute tarot-card-luxury flex flex-col items-center justify-center gap-3 animate-float-slow"
              style={{
                width: "155px", height: "260px",
                top: "50%", left: "50%",
                marginTop: "-130px", marginLeft: "10px",
                transform: "rotate(18deg)",
                zIndex: 20,
                filter: "drop-shadow(0 0 18px rgba(224,184,76,0.18))",
                opacity: 0.88,
              }}
            >
              <div className="text-[42px]">👁️</div>
              <div className="font-playfair text-[#E0B84C] text-xs text-center uppercase tracking-[0.18em] px-3">O Destino</div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. QUIZ ANCHOR (scroll target)
      ═══════════════════════════════════════════ */}
      <div ref={quizRef} id="quiz" />

      {/* ═══════════════════════════════════════════
          3. SOCIAL PROOF — Testimonials
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative bg-[#1D0E25]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl text-[#E0B84C] mb-4">
              Vozes da Intuição
            </h2>
            <div className="w-10 h-[1px] bg-[#E0B84C] mx-auto opacity-40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Foi como se as cartas lessem a minha alma. Tudo que ele não me dizia, a consulta revelou. Voltei a falar com ele e ele confirmou tudo.", name: "Isabella V." },
              { text: "Estávamos afastados há meses. O direcionamento do tarot me deu a clareza exata de qual postura adotar. Hoje, a conexão renasceu.", name: "Carolina M." },
              { text: "Eu não entendia os sinais confusos que ele dava. A leitura me mostrou a ferida que ele carregava. Com apenas uma atitude minha, tudo mudou.", name: "Marina S." },
            ].map((item, i) => (
              <div key={i} className="glass-luxury p-8 flex flex-col justify-between group hover:border-[#E0B84C]/40 transition-colors duration-500">
                <div className="mb-5 flex gap-1">
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

          {/* Second CTA after testimonials */}
          <div className="flex justify-center mt-14">
            <button
              onClick={handleCTA}
              className="font-inter font-bold text-[14px] tracking-widest uppercase cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #C9A438, #E0B84C, #F0CD72)",
                color: "#120817",
                padding: "18px 40px",
                borderRadius: "14px",
                border: "none",
                boxShadow: "0 0 25px rgba(224, 184, 76, 0.3)",
              }}
            >
              QUERO VER MINHA LEITURA AGORA
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. COMO FUNCIONA
      ═══════════════════════════════════════════ */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-playfair text-3xl md:text-4xl text-[#FFF8E7] mb-6">
            A Jornada da <span className="text-gradient-gold">Clareza</span>
          </h2>
          <p className="font-inter font-light text-lg text-[#FFF8E7]/55">
            Três etapas simples para revelar o que está oculto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#E0B84C]/25 to-transparent" />

          {[
            { num: "I", title: "Sintonia", desc: "Você responderá três perguntas essenciais para conectar sua energia ao momento atual." },
            { num: "II", title: "Revelação", desc: "Nossa leitura mística tirará as cartas certas para expor a verdade emocional dele." },
            { num: "III", title: "Direcionamento", desc: "Receba um plano claro de postura e atitude para transformar o afastamento em reconexão." },
          ].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-[#120817] border border-[#E0B84C]/40 flex items-center justify-center mb-8 relative z-10 group-hover:border-[#E0B84C] transition-colors duration-500 shadow-[0_0_15px_rgba(224,184,76,0.08)]">
                <span className="font-playfair text-[#E0B84C]">{step.num}</span>
              </div>
              <h3 className="font-playfair text-xl text-[#FFF8E7] mb-4">{step.title}</h3>
              <p className="font-inter font-light text-sm leading-relaxed text-[#FFF8E7]/55 px-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button
            onClick={handleCTA}
            className="font-inter text-sm tracking-[0.2em] uppercase text-[#E0B84C] border-b border-[#E0B84C]/30 pb-1 hover:border-[#E0B84C] transition-colors cursor-pointer"
          >
            Iniciar Sintonia Agora
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. GARANTIA
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#1D0E25]/50 border-t border-[#E0B84C]/10">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-10 h-10 mx-auto text-[#E0B84C] mb-8 opacity-75" />
          <h2 className="font-playfair text-2xl md:text-3xl text-[#FFF8E7] mb-6">
            Tranquilidade Absoluta
          </h2>
          <p className="font-inter font-light text-[15px] leading-relaxed text-[#FFF8E7]/65 mb-10">
            A sua consulta inicial é completamente gratuita. Caso decida prosseguir com o Mapa dos 21 Dias,
            seu investimento estará coberto por nossa garantia incondicional de 30 dias.
            Se não sentir a conexão reestabelecida, devolvemos seu valor integralmente.
          </p>
          <button
            onClick={handleCTA}
            className="font-inter font-bold text-[14px] tracking-widest uppercase cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #C9A438, #E0B84C, #F0CD72)",
              color: "#120817",
              padding: "18px 40px",
              borderRadius: "14px",
              border: "none",
              boxShadow: "0 0 25px rgba(224, 184, 76, 0.3)",
            }}
          >
            QUERO VER MINHA LEITURA AGORA
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 border-t border-[#E0B84C]/10 text-center">
        <div className="text-2xl mb-6 opacity-40">🌙</div>
        <p className="font-inter font-light text-xs tracking-wider uppercase text-[#FFF8E7]/25 mb-4">
          O amor é energia. A reconexão é escolha.
        </p>
        <div className="flex items-center justify-center gap-6 font-inter text-[10px] uppercase tracking-widest text-[#FFF8E7]/18">
          <a href="#" className="hover:text-[#E0B84C]/50 transition-colors">Privacidade</a>
          <span>|</span>
          <a href="#" className="hover:text-[#E0B84C]/50 transition-colors">Termos de Uso</a>
          <span>|</span>
          <span>© 2024 Tarot Reconexão</span>
        </div>
      </footer>

    </main>
  );
}
