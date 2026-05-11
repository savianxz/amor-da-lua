"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";

// ── Tarot cards data ─────────────────────────────────────────────────
const tarotCards = [
  { name: "A Estrela", emoji: "⭐", meaning: "Esperança renovada — ele guarda sentimentos que ainda não expressou." },
  { name: "O Sol", emoji: "☀️", meaning: "Clareza emocional virá — ele está começando a enxergar seu valor." },
  { name: "A Lua", emoji: "🌙", meaning: "Sonhos e desejos ocultos — ele pensa em você quando está sozinho." },
  { name: "O Mundo", emoji: "🌍", meaning: "Um ciclo quer se fechar — e ele sente que você faz parte disso." },
  { name: "A Justiça", emoji: "⚖️", meaning: "O universo está alinhando os eventos — tudo terá seu momento." },
  { name: "O Julgamento", emoji: "🎺", meaning: "Um despertar emocional está próximo — ele vai rever suas escolhas." },
  { name: "Os Amantes", emoji: "💑", meaning: "A conexão de vocês dois ainda está viva — mais do que você imagina." },
  { name: "A Sacerdotisa", emoji: "🔮", meaning: "Sua intuição está certa — há muito mais que não foi dito entre vocês." },
  { name: "O Mago", emoji: "🎩", meaning: "Você tem o poder de mudar a situação — as ferramentas já estão em suas mãos." },
];

// ── Step indicator ────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="transition-all duration-500 rounded-full"
          style={{
            width: i === current ? 32 : 10,
            height: 10,
            background: i <= current ? "linear-gradient(90deg, #6B1B47, #D4AF37)" : "rgba(212,175,55,0.2)",
          }}
        />
      ))}
    </div>
  );
}

// ── Card reveal ───────────────────────────────────────────────────────
function TarotCardReveal({ card, index, revealed }: {
  card: typeof tarotCards[0];
  index: number;
  revealed: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (revealed) {
      const t = setTimeout(() => setFlipped(true), index * 600);
      return () => clearTimeout(t);
    }
  }, [revealed, index]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-28 h-44 cursor-pointer"
        style={{ perspective: "800px" }}
        onClick={() => revealed && setFlipped(f => !f)}
      >
        {/* Back */}
        <div
          className="tarot-card-back absolute inset-0 flex items-center justify-center text-4xl transition-all duration-700"
          style={{
            backfaceVisibility: "hidden",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          🌟
        </div>
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-700"
          style={{
            backfaceVisibility: "hidden",
            transform: flipped ? "rotateY(0deg)" : "rotateY(-180deg)",
            background: "linear-gradient(145deg, #3D1A5C, #6B1B47)",
            border: "2px solid #D4AF37",
          }}
        >
          <span className="text-4xl">{card.emoji}</span>
          <p className="font-playfair text-xs text-center font-semibold px-2"
            style={{ color: "#D4AF37" }}>
            {card.name}
          </p>
        </div>
      </div>
      {flipped && (
        <p className="text-xs text-center max-w-[120px] leading-relaxed animate-fade-in-up font-poppins"
          style={{ color: "rgba(245,239,216,0.8)" }}>
          {card.meaning}
        </p>
      )}
    </div>
  );
}

// ── Questions ─────────────────────────────────────────────────────────
const questions = [
  {
    id: "situation",
    label: "Como você descreveria a situação atual com ele?",
    options: [
      { value: "distant", label: "🌫️ Distante — sem contato há semanas" },
      { value: "with_other", label: "💔 Com outra pessoa" },
      { value: "mysterious", label: "🌀 Misterioso — dando sinais misturados" },
      { value: "recent_break", label: "🕊️ Término recente — ainda em contato" },
    ],
  },
  {
    id: "time",
    label: "Há quanto tempo vocês estão separados?",
    options: [
      { value: "weeks", label: "📅 Semanas (menos de 1 mês)" },
      { value: "months", label: "🗓️ Meses (1–6 meses)" },
      { value: "long", label: "⌛ Muito tempo (mais de 6 meses)" },
      { value: "years", label: "🏛️ Anos (mas o sentimento persiste)" },
    ],
  },
  {
    id: "feeling",
    label: "O que você sente quando pensa nele agora?",
    options: [
      { value: "hope", label: "✨ Esperança — acredito que pode voltar" },
      { value: "doubt", label: "🤔 Dúvida — não sei se vale lutar" },
      { value: "certainty", label: "💪 Certeza — sei que temos futuro" },
      { value: "pain", label: "😔 Dor — mas não consigo desistir" },
    ],
  },
];

// ── Page ──────────────────────────────────────────────────────────────
export default function ConsultaPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0,1,2 = questions; 3 = loading; 4 = cards
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedCards] = useState(() =>
    [...tarotCards].sort(() => Math.random() - 0.5).slice(0, 3)
  );
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [showUrgency, setShowUrgency] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Acessando o arquivo espiritual...");

  const loadingSteps = [
    "Acessando o arquivo espiritual...",
    "Sintonizando com a energia dele...",
    "As cartas estão se posicionando...",
    "Interpretando os arquétipos...",
    "Preparando sua leitura exclusiva...",
  ];

  const selectAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (step < 2) {
      setTimeout(() => setStep(s => s + 1), 400);
    } else {
      // Start loading
      setStep(3);
      let progress = 0;
      let textIdx = 0;
      const interval = setInterval(() => {
        progress += 2;
        if (progress % 20 === 0 && textIdx < loadingSteps.length - 1) {
          textIdx++;
          setLoadingText(loadingSteps[textIdx]);
        }
        setLoadingProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setStep(4);
          setTimeout(() => setCardsRevealed(true), 500);
          setTimeout(() => setShowUrgency(true), 3000);
        }
      }, 50);
    }
  };

  const currentQuestion = step <= 2 ? questions[step] : null;

  return (
    <main className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Bg orbs */}
      <div className="fixed top-1/4 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #6B1B47, transparent)" }} />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3D1A5C, transparent)" }} />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-2 animate-float inline-block">🔮</div>
          <h1 className="font-playfair text-2xl sm:text-3xl" style={{ color: "#D4AF37" }}>
            Consulta das Cartas
          </h1>
        </div>

        {/* ── QUESTIONS ── */}
        {step <= 2 && currentQuestion && (
          <div className="animate-fade-in-up">
            <StepIndicator current={step} total={3} />
            <div className="glass-card p-8">
              <p className="font-poppins text-xs tracking-widest uppercase mb-3" style={{ color: "#D4AF37" }}>
                Pergunta {step + 1} de 3
              </p>
              <h2 className="font-playfair text-xl sm:text-2xl mb-6 leading-snug" style={{ color: "#F5EFD8" }}>
                {currentQuestion.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => selectAnswer(currentQuestion.id, opt.value)}
                    className="text-left p-4 rounded-xl font-poppins text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    style={{
                      background: answers[currentQuestion.id] === opt.value
                        ? "linear-gradient(135deg, rgba(107,27,71,0.6), rgba(61,26,92,0.6))"
                        : "rgba(26,15,30,0.6)",
                      border: answers[currentQuestion.id] === opt.value
                        ? "1px solid #D4AF37"
                        : "1px solid rgba(212,175,55,0.2)",
                      color: "#F5EFD8",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {step === 3 && (
          <div className="text-center animate-fade-in-up">
            <div className="text-6xl mb-6 animate-spin-slow inline-block">🌙</div>
            <h2 className="font-playfair text-2xl mb-3" style={{ color: "#D4AF37" }}>
              As cartas estão sendo consultadas...
            </h2>
            <p className="font-poppins text-sm mb-8" style={{ color: "rgba(245,239,216,0.6)" }}>
              {loadingText}
            </p>
            <div className="w-full max-w-sm mx-auto h-2 rounded-full mb-4"
              style={{ background: "rgba(212,175,55,0.15)" }}>
              <div
                className="h-2 rounded-full progress-gold"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="font-poppins text-xs" style={{ color: "rgba(212,175,55,0.7)" }}>
              {loadingProgress}%
            </p>
          </div>
        )}

        {/* ── CARDS REVEALED ── */}
        {step === 4 && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-8">
              <p className="font-poppins text-xs tracking-widest uppercase mb-2" style={{ color: "#D4AF37" }}>
                ✦ Sua Leitura Exclusiva ✦
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl" style={{ color: "#F5EFD8" }}>
                As Cartas Falam sobre Ele
              </h2>
            </div>

            <div className="flex justify-center gap-6 mb-10 flex-wrap">
              {selectedCards.map((card, i) => (
                <TarotCardReveal key={i} card={card} index={i} revealed={cardsRevealed} />
              ))}
            </div>

            {/* Urgency banner */}
            {showUrgency && (
              <div className="animate-fade-in-up">
                <div className="urgency-banner p-6 mb-6 animate-urgency">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🔴</div>
                    <div>
                      <h3 className="font-poppins font-bold mb-1" style={{ color: "#F5EFD8" }}>
                        AVISO IMPORTANTE — Janela Crítica Detectada
                      </h3>
                      <p className="font-poppins text-sm leading-relaxed" style={{ color: "rgba(245,239,216,0.8)" }}>
                        As cartas revelaram que você está em um{" "}
                        <strong style={{ color: "#D4AF37" }}>momento decisivo</strong>.
                        Se agir <em>errado</em>, a porta fecha. Se <em>não agir</em>, ela também fecha.
                        Você sabe exatamente o que fazer nos próximos{" "}
                        <strong style={{ color: "#D4AF37" }}>21 dias</strong>?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content preview */}
                <div className="glass-card p-6 mb-6">
                  <p className="font-poppins text-xs tracking-widest uppercase mb-4 text-center"
                    style={{ color: "#D4AF37" }}>
                    O que você recebe no Mapa dos 21 Dias
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { icon: "📋", title: "Plano Dia a Dia", desc: "Ações específicas para cada um dos 21 dias" },
                      { icon: "💬", title: "Scripts de Mensagem", desc: "Exatamente o que escrever e quando enviar" },
                      { icon: "🧠", title: "Psicologia Dele", desc: "Por que ele age assim e como mudar isso" },
                    ].map((item, i) => (
                      <div key={i} className="text-center p-3 rounded-xl"
                        style={{ background: "rgba(61,26,92,0.3)", border: "1px solid rgba(212,175,55,0.15)" }}>
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <p className="font-playfair text-sm font-semibold mb-1" style={{ color: "#D4AF37" }}>
                          {item.title}
                        </p>
                        <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.65)" }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => router.push("/checkout")}
                    className="btn-cta w-full text-white font-poppins font-bold text-lg py-5 rounded-2xl cursor-pointer animate-pulse-gold"
                    id="btn-quero-plano"
                  >
                    ⚡ EU QUERO MEU PLANO DOS 21 DIAS
                  </button>
                  <p className="text-center mt-3 font-poppins text-sm"
                    style={{ color: "rgba(245,239,216,0.7)" }}>
                    Por apenas{" "}
                    <span className="line-through text-xs mr-1" style={{ color: "rgba(245,239,216,0.4)" }}>
                      R$ 197
                    </span>
                    <strong style={{ color: "#D4AF37" }}>R$ 97</strong>{" "}
                    <span className="text-xs" style={{ color: "rgba(245,239,216,0.5)" }}>
                      (acesso imediato)
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
