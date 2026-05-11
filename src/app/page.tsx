"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Shield, Star } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════════════ */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 14px",
        borderRadius: "999px",
        border: "1px solid rgba(224,184,76,0.25)",
        background: "rgba(224,184,76,0.07)",
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#E0B84C",
      }}
    >
      {children}
    </span>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} style={{ width: 14, height: 14, fill: "#E0B84C", color: "#E0B84C" }} />
      ))}
    </div>
  );
}

function HowCard({ num, text }: { num: number; text: string }) {
  return (
    <div
      className="card card-hover"
      style={{ padding: "36px 28px", display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div
        style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "1px solid rgba(224,184,76,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display', serif",
          fontSize: 16, color: "#E0B84C",
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.65, color: "rgba(255,248,231,0.82)" }}>
        {text}
      </p>
    </div>
  );
}

function TestimonialCard({ quote, name, location }: { quote: string; name: string; location: string }) {
  return (
    <div className="card card-hover" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <Stars />
      <p style={{
        fontFamily: "'Inter', sans-serif", fontStyle: "italic",
        fontSize: 15, fontWeight: 300, lineHeight: 1.75,
        color: "rgba(255,248,231,0.80)",
      }}>
        "{quote}"
      </p>
      <div style={{ borderTop: "1px solid rgba(224,184,76,0.12)", paddingTop: 16 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#E0B84C", letterSpacing: "0.08em" }}>{name}</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,248,231,0.35)", marginTop: 2 }}>{location}</p>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(224,184,76,0.10)",
        paddingBottom: open ? 20 : 0,
        marginBottom: 0,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "22px 0", background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: 16,
        }}
      >
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#FFF8E7", fontWeight: 400 }}>
          {q}
        </span>
        <ChevronDown
          style={{
            width: 18, height: 18, color: "#E0B84C", flexShrink: 0,
            transition: "transform 0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && (
        <p className="faq-answer" style={{
          fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300,
          lineHeight: 1.75, color: "rgba(255,248,231,0.65)", paddingBottom: 4,
        }}>
          {a}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TAROT CARDS VISUAL
══════════════════════════════════════════════════════════════════════ */
function TarotScene() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Subtle ambient glow — just one, not overwhelming */}
      <div style={{
        position: "absolute", width: 260, height: 340,
        background: "radial-gradient(ellipse, rgba(224,184,76,0.10) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(30px)", pointerEvents: "none",
      }} />

      {/* Card 1 — back left */}
      <div
        className="tarot tarot-1"
        style={{
          width: 150, height: 250,
          top: "50%", left: "50%",
          marginTop: -125, marginLeft: -190,
          zIndex: 10,
          boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
          opacity: 0.82,
        }}
      >
        <div style={{ fontSize: 38 }}>🌙</div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: "#E0B84C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          O Oculto
        </span>
      </div>

      {/* Card 2 — front center (largest) */}
      <div
        className="tarot tarot-2"
        style={{
          width: 168, height: 278,
          top: "50%", left: "50%",
          marginTop: -139, marginLeft: -84,
          zIndex: 30,
          boxShadow: "0 24px 70px rgba(0,0,0,0.65), 0 0 40px rgba(224,184,76,0.12)",
        }}
      >
        <div style={{ fontSize: 44 }}>✨</div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: "#E0B84C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          A Conexão
        </span>
      </div>

      {/* Card 3 — back right */}
      <div
        className="tarot tarot-3"
        style={{
          width: 148, height: 246,
          top: "50%", left: "50%",
          marginTop: -123, marginLeft: 24,
          zIndex: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
          opacity: 0.80,
        }}
      >
        <div style={{ fontSize: 38 }}>👁️</div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: "#E0B84C", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          O Destino
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const ofertaRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const scrollToOferta = () =>
    ofertaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (!mounted) return null;

  return (
    <main style={{ background: "#120817", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ════════════════════════════════════════
          SEÇÃO 1 — HERO
      ════════════════════════════════════════ */}
      <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: "80px 0 60px" }}>
        <div className="container" style={{ width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

            {/* LEFT */}
            <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div style={{ marginBottom: 24 }}>
                <Badge>Consulta Privada de Reconexão</Badge>
              </div>

              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(28px, 3.2vw, 42px)",
                  fontWeight: 400,
                  lineHeight: 1.22,
                  color: "#FFF8E7",
                  marginBottom: 24,
                }}
              >
                Ele realmente te esqueceu...<br />
                ou ainda existe uma<br />
                <span className="gold-text">conexão não encerrada?</span>
              </h1>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16, fontWeight: 300,
                  lineHeight: 1.75, color: "rgba(255,248,231,0.72)",
                  marginBottom: 36, maxWidth: 440,
                }}
              >
                Existe algo que ele ainda sente e talvez nem consiga admitir.
                Sua leitura revela se essa conexão ainda pode ser reativada.
              </p>

              <button className="btn-cta" style={{ maxWidth: 400, marginBottom: 14 }} onClick={scrollToOferta}>
                Quero Ver Minha Leitura Agora
              </button>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,248,231,0.38)", letterSpacing: "0.06em", marginBottom: 24 }}>
                Consulta sigilosa&nbsp;&nbsp;•&nbsp;&nbsp;Resultado imediato
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Stars />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,248,231,0.70)" }}>
                  327 leituras realizadas recentemente
                </span>
              </div>
            </div>

            {/* RIGHT — Tarot Cards */}
            <div className="fade-up-2" style={{ position: "relative", height: 400 }}>
              <TarotScene />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO 2 — COMO FUNCIONA
      ════════════════════════════════════════ */}
      <section className="section" style={{ background: "#1C1024" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 400, color: "#FFF8E7", marginBottom: 12 }}>
              Como Sua Leitura Acontece
            </h2>
            <div className="divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            <HowCard num={1} text="Você responde 3 perguntas rápidas sobre a conexão e o momento que viveu juntos." />
            <HowCard num={2} text="As cartas revelam o estado emocional atual da conexão e o que ele carrega internamente." />
            <HowCard num={3} text="Você descobre o próximo passo ideal para agir com clareza, sem desperdício emocional." />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO 3 — DEPOIMENTOS
      ════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 400, color: "#FFF8E7", marginBottom: 12 }}>
              Relatos Reais
            </h2>
            <div className="divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            <TestimonialCard
              quote="A leitura me trouxe clareza sobre o afastamento e me ajudou a agir com mais consciência. Parei de mandar mensagens desnecessárias e a dinâmica mudou."
              name="Isabella V."
              location="São Paulo"
            />
            <TestimonialCard
              quote="Eu esperava algo genérico, mas foi surpreendentemente preciso. A carta central descreveu exatamente o silêncio que ele estava impondo."
              name="Carolina M."
              location="Rio de Janeiro"
            />
            <TestimonialCard
              quote="Não sei explicar racionalmente, mas aquela semana eu segui o direcionamento e ele entrou em contato. Estou grata pela coragem que a leitura me deu."
              name="Marina S."
              location="Belo Horizonte"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO 4 — OFERTA
      ════════════════════════════════════════ */}
      <section className="section" ref={ofertaRef} style={{ background: "#1C1024" }}>
        <div className="container-sm">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px, 2.6vw, 36px)", fontWeight: 400, color: "#FFF8E7", marginBottom: 12 }}>
              Seu Mapa dos 21 Dias
            </h2>
            <div className="divider" />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(255,248,231,0.60)", marginTop: 16 }}>
              Tudo que você precisa para agir com estratégia e presença.
            </p>
          </div>

          <div className="card" style={{ padding: "44px 48px" }}>
            {/* Features list */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {[
                "Diagnóstico emocional da conexão atual",
                "Janela de reconexão — o momento certo para agir",
                "Os erros que aumentam o afastamento",
                "Estratégia personalizada de aproximação",
                "Direcionamento prático para os próximos 21 dias",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{
                    color: "#E0B84C", fontFamily: "'Inter', sans-serif",
                    fontWeight: 600, fontSize: 15, flexShrink: 0, marginTop: 1,
                  }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(255,248,231,0.82)", lineHeight: 1.55 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div style={{ borderTop: "1px solid rgba(224,184,76,0.12)", paddingTop: 36 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                <span className="font-serif" style={{ fontSize: 42, color: "#E0B84C", fontWeight: 500 }}>R$&nbsp;97</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,248,231,0.38)", textDecoration: "line-through" }}>R$ 197</span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,248,231,0.40)", letterSpacing: "0.04em", marginBottom: 28 }}>
                Pagamento único · Acesso vitalício
              </p>
              <button className="btn-cta" onClick={() => router.push("/checkout")}>
                Receber Meu Mapa
              </button>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, textAlign: "center",
                color: "rgba(255,248,231,0.32)", marginTop: 14, letterSpacing: "0.04em",
              }}>
                Disponível apenas durante esta sessão
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 20 }}>
                <Shield style={{ width: 13, height: 13, color: "rgba(255,248,231,0.35)" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,248,231,0.35)" }}>
                  Garantia incondicional de 30 dias
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SEÇÃO 5 — FAQ
      ════════════════════════════════════════ */}
      <section className="section">
        <div className="container-sm">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 400, color: "#FFF8E7", marginBottom: 12 }}>
              Dúvidas Frequentes
            </h2>
            <div className="divider" />
          </div>

          <div>
            <FAQItem
              q="A consulta é realmente gratuita?"
              a="Sim. A leitura inicial das três cartas é completamente gratuita e imediata. Você só decide sobre o Mapa dos 21 Dias após receber sua leitura."
            />
            <FAQItem
              q="Preciso ter conhecimento de tarot?"
              a="Não. Você responde apenas três perguntas simples. Nossa leitura é apresentada de forma clara, objetiva e sem jargões."
            />
            <FAQItem
              q="Em quanto tempo recebo meu Mapa?"
              a="Assim que a compra é confirmada, você recebe acesso imediato ao PDF completo do Mapa dos 21 Dias no seu e-mail."
            />
            <FAQItem
              q="Funciona mesmo para casos difíceis?"
              a="A leitura oferece clareza emocional e direcionamento estratégico independente do estágio do afastamento. Não prometemos resultados específicos, mas oferecemos uma perspectiva que a maioria das mulheres ainda não tem."
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{
        borderTop: "1px solid rgba(224,184,76,0.08)",
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <p className="font-serif" style={{ fontSize: 18, color: "rgba(255,248,231,0.18)", marginBottom: 20 }}>
          Amor da Lua
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {["Privacidade", "Termos de Uso", "Contato"].map((item, i) => (
            <a key={i} href="#" style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(255,248,231,0.22)",
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(224,184,76,0.55)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,248,231,0.22)")}
            >
              {item}
            </a>
          ))}
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,248,231,0.14)", marginTop: 20, letterSpacing: "0.06em" }}>
          © 2024 Amor da Lua · Todos os direitos reservados
        </p>
      </footer>

    </main>
  );
}
