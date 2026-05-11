"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Star, ArrowRight, Heart, Sparkles } from "lucide-react";

// ── Confetti particle ─────────────────────────────────────────────────
function ConfettiParticle({ style }: { style: React.CSSProperties }) {
  return <div className="fixed w-2 h-2 rounded-sm pointer-events-none z-50" style={style} />;
}

// ── Page ──────────────────────────────────────────────────────────────
export default function ObrigadaPage() {
  const router = useRouter();
  const [showUpsell, setShowUpsell] = useState(false);
  const [confetti, setConfetti] = useState<{ top: string; left: string; bg: string; delay: string }[]>([]);

  useEffect(() => {
    // Generate confetti
    const particles = Array.from({ length: 40 }, () => ({
      top: `${Math.random() * 20}vh`,
      left: `${Math.random() * 100}vw`,
      bg: ["#D4AF37", "#6B1B47", "#C2185B", "#F0C84A", "#8B2560"][Math.floor(Math.random() * 5)],
      delay: `${Math.random() * 2}s`,
    }));
    setConfetti(particles);

    const t = setTimeout(() => setShowUpsell(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const bonuses = [
    { icon: "📖", title: "Mapa dos 21 Dias", desc: "Plano dia a dia completo", status: "Liberado ✓" },
    { icon: "💬", title: "Scripts de Mensagem", desc: "Modelos prontos para WhatsApp", status: "Liberado ✓" },
    { icon: "🧠", title: "Guia de Psicologia Masculina", desc: "Entenda o que ele pensa", status: "Liberado ✓" },
    { icon: "🎁", title: "Leitura de Compatibilidade", desc: "Bônus surpresa incluso", status: "Liberado ✓" },
  ];

  const mentoringFeatures = [
    "1 sessão individual por mês (60 min)",
    "Plano customizado para seu caso específico",
    "WhatsApp direto para dúvidas urgentes",
    "Revisão semanal do seu progresso",
    "Acesso à comunidade premium fechada",
    "Material exclusivo de cada sessão",
  ];

  return (
    <main className="min-h-screen py-8 px-4 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((c, i) => (
        <ConfettiParticle
          key={i}
          style={{
            top: c.top,
            left: c.left,
            background: c.bg,
            animationDelay: c.delay,
            animation: `float 3s ${c.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Bg orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }} />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* ── CELEBRATION ── */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="text-7xl mb-4 animate-float inline-block">🎉</div>
          <div className="inline-block px-4 py-1.5 rounded-full mb-4 text-xs font-poppins font-semibold tracking-widest uppercase"
            style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37" }}>
            ✨ Compra Confirmada
          </div>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: "#F5EFD8" }}>
            Parabéns! Seu Plano<br />
            <span className="text-gradient-gold">Está Liberado</span>
          </h1>
          <p className="font-poppins text-lg" style={{ color: "rgba(245,239,216,0.75)" }}>
            Você acabou de dar o passo mais importante.<br />
            O Mapa dos 21 Dias já está no seu email. 💌
          </p>
        </div>

        {/* ── WHAT'S UNLOCKED ── */}
        <div className="glass-card p-6 mb-8">
          <h2 className="font-playfair text-xl mb-4 flex items-center gap-2" style={{ color: "#D4AF37" }}>
            <Sparkles className="w-5 h-5" /> Seus Materiais
          </h2>
          <div className="space-y-3">
            {bonuses.map((b, i) => (
              <div key={i}
                className="flex items-center gap-4 p-3 rounded-xl"
                style={{
                  background: "rgba(212,175,55,0.05)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  animation: `fadeInUp 0.5s ${i * 0.15}s ease both`,
                }}>
                <span className="text-2xl">{b.icon}</span>
                <div className="flex-1">
                  <p className="font-poppins text-sm font-semibold" style={{ color: "#F5EFD8" }}>{b.title}</p>
                  <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.55)" }}>{b.desc}</p>
                </div>
                <span className="font-poppins text-xs font-semibold" style={{ color: "#D4AF37" }}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-xl text-center"
            style={{ background: "linear-gradient(135deg, rgba(107,27,71,0.3), rgba(61,26,92,0.3))", border: "1px solid rgba(212,175,55,0.2)" }}>
            <p className="font-poppins text-sm" style={{ color: "rgba(245,239,216,0.7)" }}>
              📧 Acesso enviado para o email informado. Verifique a caixa de entrada e spam.
            </p>
          </div>
        </div>

        {/* ── NEXT STEPS ── */}
        <div className="glass-card p-6 mb-8">
          <h2 className="font-playfair text-xl mb-4" style={{ color: "#F5EFD8" }}>
            🗺️ Seus Próximos Passos
          </h2>
          <div className="space-y-4">
            {[
              { day: "Hoje", action: "Leia o plano completo. Entenda os 3 pilares da reconquista." },
              { day: "Dia 1–7", action: "Execute a Fase 1: Silêncio estratégico e posicionamento emocional." },
              { day: "Dia 8–14", action: "Fase 2: Primeiro contato. Use exatamente os scripts fornecidos." },
              { day: "Dia 15–21", action: "Fase 3: Reencontro e reconexão profunda. O momento decisivo." },
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-16 flex-shrink-0 text-center">
                  <span className="font-poppins text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}>
                    {step.day}
                  </span>
                </div>
                <p className="font-poppins text-sm leading-relaxed pt-0.5" style={{ color: "rgba(245,239,216,0.8)" }}>
                  {step.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── UPSELL: MENTORIA ── */}
        {showUpsell && (
          <div className="animate-fade-in-up">
            <div className="divider-gold mb-8" />

            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1.5 rounded-full mb-3 text-xs font-poppins font-semibold tracking-widest uppercase"
                style={{ background: "rgba(194,24,91,0.15)", border: "1px solid rgba(194,24,91,0.4)", color: "#C2185B" }}>
                🔥 Oferta Especial — Apenas Para Quem Comprou
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl mb-3" style={{ color: "#F5EFD8" }}>
                Quer Resultado <span className="text-gradient-gold">3x Mais Rápido?</span>
              </h2>
              <p className="font-poppins" style={{ color: "rgba(245,239,216,0.7)" }}>
                Adicione a Mentoria Individual e faça o plano junto comigo, ao vivo.
              </p>
            </div>

            <div className="glass-card p-8 mb-6"
              style={{ border: "1px solid rgba(212,175,55,0.3)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: features */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5" style={{ color: "#C2185B" }} />
                    <h3 className="font-playfair text-xl" style={{ color: "#D4AF37" }}>
                      Mentoria 1:1
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {mentoringFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#D4AF37" }} />
                        <span className="font-poppins text-sm" style={{ color: "rgba(245,239,216,0.8)" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: comparison */}
                <div>
                  <h3 className="font-poppins text-sm font-semibold mb-4 text-center"
                    style={{ color: "rgba(245,239,216,0.6)" }}>
                    Compare os resultados
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Tempo médio de resultado", solo: "21 dias", mentoria: "7 dias" },
                      { label: "Taxa de reconquista", solo: "62%", mentoria: "89%" },
                      { label: "Suporte personalizado", solo: "❌", mentoria: "✅" },
                      { label: "Adaptação ao seu caso", solo: "Parcial", mentoria: "Total" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-3 gap-2 text-center">
                        <p className="font-poppins text-xs text-left" style={{ color: "rgba(245,239,216,0.6)" }}>
                          {row.label}
                        </p>
                        <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.4)" }}>
                          {row.solo}
                        </p>
                        <p className="font-poppins text-xs font-bold" style={{ color: "#D4AF37" }}>
                          {row.mentoria}
                        </p>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-poppins"
                      style={{ color: "rgba(245,239,216,0.3)" }}>
                      <p></p><p>Plano Solo</p><p style={{ color: "#D4AF37" }}>+ Mentoria</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divider-gold my-6" />

              {/* Pricing */}
              <div className="text-center mb-6">
                <p className="font-poppins text-sm mb-1" style={{ color: "rgba(245,239,216,0.5)" }}>
                  Valor regular: R$ 397/mês
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="font-playfair text-5xl font-bold" style={{ color: "#D4AF37" }}>R$ 297</span>
                  <span className="font-poppins text-sm" style={{ color: "rgba(245,239,216,0.5)" }}>/mês</span>
                </div>
                <p className="font-poppins text-xs mt-1" style={{ color: "rgba(245,239,216,0.4)" }}>
                  Cancele quando quiser • Mínimo 3 meses
                </p>
              </div>

              <button
                onClick={() => router.push("/mentoria")}
                className="btn-gold w-full text-gray-900 font-poppins font-bold text-lg py-5 rounded-2xl cursor-pointer flex items-center justify-center gap-2 mb-4"
                id="btn-upgrade-mentoria"
              >
                💎 Quero Resultado 3x Mais Rápido
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                className="w-full text-center font-poppins text-sm py-3 cursor-pointer"
                style={{ color: "rgba(245,239,216,0.35)" }}
                onClick={() => {}}
              >
                Não, obrigada. Vou fazer sozinha com o plano.
              </button>
            </div>
          </div>
        )}

        {/* Testimonial */}
        <div className="glass-card p-6 mb-8">
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
          </div>
          <p className="font-poppins text-sm italic mb-3" style={{ color: "rgba(245,239,216,0.8)" }}>
            "Fiz a mentoria junto com o plano e no dia 9 ele me ligou pedindo para conversar.
            Estamos juntos novamente há 2 meses. Não consigo imaginar o que seria sem esse guia."
          </p>
          <p className="font-poppins text-xs" style={{ color: "#D4AF37" }}>— Fernanda K., Porto Alegre</p>
        </div>

        <p className="text-center font-poppins text-xs mb-8" style={{ color: "rgba(245,239,216,0.3)" }}>
          Dúvidas? Email: contato@amordafua.com.br
        </p>
      </div>
    </main>
  );
}
