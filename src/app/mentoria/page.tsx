"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Star, ArrowLeft, Heart, Crown, Users, MessageCircle } from "lucide-react";

const plans = [
  {
    id: "solo",
    icon: "📖",
    name: "Plano Solo",
    price: "R$ 97",
    period: "pagamento único",
    highlight: false,
    features: [
      "Mapa dos 21 dias (PDF)",
      "Scripts de mensagem",
      "Acesso vitalício",
      "Garantia 30 dias",
    ],
    cta: "Já tenho este plano",
    disabled: true,
  },
  {
    id: "mentoria",
    icon: "👑",
    name: "Mentoria Individual",
    price: "R$ 297",
    period: "/mês • mínimo 3 meses",
    highlight: true,
    badge: "MAIS POPULAR",
    features: [
      "Tudo do Plano Solo +",
      "1 sessão 1:1 por mês (60 min)",
      "Plano adaptado ao seu caso",
      "WhatsApp direto (urgências)",
      "Revisão semanal do progresso",
      "Acesso à comunidade fechada",
      "Material exclusivo por sessão",
      "Suporte prioritário por email",
    ],
    cta: "💎 Quero a Mentoria",
    disabled: false,
  },
  {
    id: "comunidade",
    icon: "🌙",
    name: "Comunidade Premium",
    price: "R$ 67",
    period: "/mês",
    highlight: false,
    features: [
      "Grupo privado no Telegram",
      "Leituras de tarot ao vivo",
      "Workshop mensal (gravado)",
      "Biblioteca de scripts",
      "Acesso a casos de sucesso",
    ],
    cta: "🌙 Entrar na Comunidade",
    disabled: false,
  },
];

const faqs = [
  {
    q: "Como funciona a mentoria?",
    a: "Você agenda uma sessão por mês pelo nosso sistema. A sessão dura 60 minutos por videochamada. Entre as sessões, você pode enviar dúvidas pelo WhatsApp e receber resposta em até 24h.",
  },
  {
    q: "E se eu não precisar de mais de 3 meses?",
    a: "Você pode cancelar após 3 meses sem nenhuma taxa. Mas a maioria das clientes prefere continuar porque os resultados se estendem além da reconquista.",
  },
  {
    q: "A mentora tem acesso ao meu plano?",
    a: "Sim! Com sua permissão, analisamos suas respostas da consulta para personalizar ainda mais o plano da mentoria ao seu caso.",
  },
  {
    q: "Posso fazer só a comunidade sem a mentoria?",
    a: "Sim! A comunidade é independente e complementa o plano dos 21 dias com suporte coletivo e recursos extras.",
  },
];

export default function MentoriaPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (id === "solo") return;
    setSelected(id);
    setTimeout(() => router.push(`/checkout?plan=${id}`), 300);
  };

  return (
    <main className="min-h-screen py-8 px-4">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 ml-4 font-poppins text-sm transition-colors hover:opacity-80 cursor-pointer"
        style={{ color: "rgba(245,239,216,0.5)" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Crown className="w-12 h-12 mx-auto mb-4 animate-glow" style={{ color: "#D4AF37" }} />
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: "#F5EFD8" }}>
            Escolha Seu <span className="text-gradient-gold">Nível de Suporte</span>
          </h1>
          <p className="font-poppins text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,239,216,0.7)" }}>
            Quanto mais personalizado, mais rápido o resultado.
            Escolha o plano que melhor se adapta ao seu momento.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative glass-card p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                border: plan.highlight
                  ? "2px solid rgba(212,175,55,0.6)"
                  : "1px solid rgba(212,175,55,0.15)",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(212,175,55,0.15)"
                  : undefined,
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-poppins font-bold tracking-wider"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #B8960F)", color: "#1A0F1E" }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{plan.icon}</div>
                <h2 className="font-playfair text-xl font-bold mb-1" style={{ color: plan.highlight ? "#D4AF37" : "#F5EFD8" }}>
                  {plan.name}
                </h2>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-playfair text-3xl font-bold" style={{ color: "#D4AF37" }}>
                    {plan.price}
                  </span>
                </div>
                <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.4)" }}>
                  {plan.period}
                </p>
              </div>

              <div className="divider-gold mb-4" />

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: plan.highlight ? "#D4AF37" : "rgba(212,175,55,0.6)" }}
                    />
                    <span
                      className="font-poppins text-sm"
                      style={{ color: plan.disabled ? "rgba(245,239,216,0.4)" : "rgba(245,239,216,0.8)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(plan.id)}
                disabled={plan.disabled}
                className={`w-full font-poppins font-bold py-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  plan.disabled
                    ? "opacity-40 cursor-not-allowed"
                    : plan.highlight
                    ? "btn-gold text-gray-900"
                    : "btn-cta text-white"
                }`}
                id={`btn-plan-${plan.id}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: <Users className="w-6 h-6" />, number: "2.847+", label: "mulheres atendidas" },
            { icon: <Heart className="w-6 h-6" />, number: "89%", label: "taxa de reconquista" },
            { icon: <Star className="w-6 h-6" />, number: "4.9/5", label: "satisfação média" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <div className="flex justify-center mb-2" style={{ color: "#D4AF37" }}>{stat.icon}</div>
              <p className="font-playfair text-3xl font-bold mb-1" style={{ color: "#D4AF37" }}>{stat.number}</p>
              <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.6)" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="font-playfair text-2xl text-center mb-8" style={{ color: "#F5EFD8" }}>
            Perguntas Frequentes
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-poppins text-sm font-medium" style={{ color: "#F5EFD8" }}>
                    {faq.q}
                  </span>
                  <span
                    className="text-xl flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: "#D4AF37",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 animate-fade-in-up">
                    <p className="font-poppins text-sm leading-relaxed" style={{ color: "rgba(245,239,216,0.7)" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="glass-card p-6 mb-8">
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
          </div>
          <p className="font-poppins text-sm italic mb-3" style={{ color: "rgba(245,239,216,0.8)" }}>
            "A mentoria foi um divisor de águas. No meu caso específico, o plano geral precisava de ajustes
            que só uma mentora especializada poderia identificar. No dia 12, ele me pediu para se ver."
          </p>
          <p className="font-poppins text-xs" style={{ color: "#D4AF37" }}>— Beatriz M., Salvador</p>
        </div>

        <div className="text-center">
          <MessageCircle className="w-6 h-6 mx-auto mb-2" style={{ color: "rgba(212,175,55,0.4)" }} />
          <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.3)" }}>
            Dúvidas sobre os planos? Fale conosco: contato@amordafua.com.br
          </p>
        </div>
      </div>
    </main>
  );
}
