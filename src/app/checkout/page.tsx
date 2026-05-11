"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, CreditCard, Star, Check, Clock } from "lucide-react";

// ── Countdown ─────────────────────────────────────────────────────────
function Countdown() {
  const [secs, setSecs] = useState(15 * 60); // 15 min

  useEffect(() => {
    const t = setInterval(() => setSecs(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 justify-center">
      <Clock className="w-4 h-4" style={{ color: "#D4AF37" }} />
      <span className="font-poppins text-sm" style={{ color: "rgba(245,239,216,0.8)" }}>
        Preço especial expira em:
      </span>
      <div className="flex gap-1">
        <div className="countdown-box">
          <span className="font-poppins font-bold text-lg" style={{ color: "#D4AF37" }}>{m}</span>
          <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.4)" }}>min</p>
        </div>
        <span className="font-bold text-xl self-center" style={{ color: "#D4AF37" }}>:</span>
        <div className="countdown-box">
          <span className="font-poppins font-bold text-lg" style={{ color: "#D4AF37" }}>{s}</span>
          <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.4)" }}>seg</p>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let v = value;

    if (name === "card") v = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
    if (name === "expiry") {
      v = value.replace(/\D/g, "");
      if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    if (name === "cvv") v = value.replace(/\D/g, "").slice(0, 3);

    setForm(f => ({ ...f, [name]: v }));
    setErrors(er => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Digite seu nome completo";
    if (!form.email.includes("@")) e.email = "Email inválido";
    if (form.card.replace(/\s/g, "").length < 16) e.card = "Número do cartão inválido";
    if (!form.expiry.includes("/")) e.expiry = "Data inválida";
    if (form.cvv.length < 3) e.cvv = "CVV inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      router.push("/obrigada");
    }, 2500);
  };

  const inclusions = [
    "Mapa de ações dos 21 dias (PDF premium)",
    "Scripts de mensagem prontos para enviar",
    "Guia de psicologia masculina no término",
    "Técnicas de reativação de sentimentos",
    "Bônus: Leitura de compatibilidade amorosa",
    "Suporte por email por 30 dias",
  ];

  return (
    <main className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-3xl mb-2">🔐</div>
        <h1 className="font-playfair text-2xl" style={{ color: "#D4AF37" }}>
          Finalize Seu Pedido
        </h1>
        <p className="font-poppins text-sm mt-1" style={{ color: "rgba(245,239,216,0.5)" }}>
          Acesso imediato após confirmação
        </p>
      </div>

      {/* Countdown banner */}
      <div className="max-w-xl mx-auto mb-6 urgency-banner py-3 px-4 animate-urgency">
        <Countdown />
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── LEFT: Order summary ── */}
        <div>
          <div className="glass-card p-6 mb-6">
            <h2 className="font-playfair text-xl mb-4" style={{ color: "#F5EFD8" }}>
              📦 O Que Você Recebe
            </h2>

            <div className="mb-6 p-4 rounded-xl flex items-center gap-4"
              style={{ background: "linear-gradient(135deg, rgba(107,27,71,0.4), rgba(61,26,92,0.4))", border: "1px solid rgba(212,175,55,0.3)" }}>
              <div className="text-4xl">📖</div>
              <div>
                <h3 className="font-playfair text-lg font-bold" style={{ color: "#D4AF37" }}>
                  Mapa dos 21 Dias
                </h3>
                <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.7)" }}>
                  Plano completo de reconquista personalizado
                </p>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(212,175,55,0.2)", border: "1px solid rgba(212,175,55,0.4)" }}>
                    <Check className="w-3 h-3" style={{ color: "#D4AF37" }} />
                  </div>
                  <span className="font-poppins text-sm" style={{ color: "rgba(245,239,216,0.8)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="divider-gold mb-4" />

            {/* Pricing */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-poppins text-sm" style={{ color: "rgba(245,239,216,0.6)" }}>Valor original</span>
              <span className="font-poppins line-through" style={{ color: "rgba(245,239,216,0.4)" }}>R$ 197,00</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-poppins text-sm" style={{ color: "#D4AF37" }}>🎁 Desconto especial</span>
              <span className="font-poppins" style={{ color: "#D4AF37" }}>– R$ 100,00</span>
            </div>
            <div className="divider-gold my-3" />
            <div className="flex items-center justify-between">
              <span className="font-playfair text-xl font-bold" style={{ color: "#F5EFD8" }}>Total hoje</span>
              <div className="text-right">
                <span className="font-playfair text-3xl font-bold" style={{ color: "#D4AF37" }}>R$ 97</span>
                <p className="font-poppins text-xs" style={{ color: "rgba(245,239,216,0.4)" }}>
                  pagamento único • acesso vitalício
                </p>
              </div>
            </div>
          </div>

          {/* Guarantee */}
          <div className="glass-card p-5 flex items-center gap-4">
            <Shield className="w-10 h-10 flex-shrink-0" style={{ color: "#D4AF37" }} />
            <div>
              <h3 className="font-playfair text-base font-bold" style={{ color: "#F5EFD8" }}>
                Garantia de 30 Dias
              </h3>
              <p className="font-poppins text-xs leading-relaxed" style={{ color: "rgba(245,239,216,0.65)" }}>
                Se não funcionar, devolvemos 100% do seu dinheiro. Sem perguntas.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Payment form ── */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4" style={{ color: "#D4AF37" }} />
            <h2 className="font-playfair text-xl" style={{ color: "#F5EFD8" }}>
              Pagamento Seguro
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="font-poppins text-xs mb-1.5 block" style={{ color: "#D4AF37" }}>
                Nome completo
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInput}
                placeholder="Seu nome"
                className="input-mystic w-full px-4 py-3 text-sm"
              />
              {errors.name && <p className="text-xs mt-1 text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="font-poppins text-xs mb-1.5 block" style={{ color: "#D4AF37" }}>
                Email (onde enviaremos o acesso)
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                placeholder="seu@email.com"
                className="input-mystic w-full px-4 py-3 text-sm"
              />
              {errors.email && <p className="text-xs mt-1 text-red-400">{errors.email}</p>}
            </div>

            <div className="divider-gold" />

            {/* Card number */}
            <div>
              <label className="font-poppins text-xs mb-1.5 block" style={{ color: "#D4AF37" }}>
                Número do cartão
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="card"
                  value={form.card}
                  onChange={handleInput}
                  placeholder="0000 0000 0000 0000"
                  className="input-mystic w-full px-4 py-3 text-sm pr-10"
                  maxLength={19}
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "rgba(212,175,55,0.5)" }} />
              </div>
              {errors.card && <p className="text-xs mt-1 text-red-400">{errors.card}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-poppins text-xs mb-1.5 block" style={{ color: "#D4AF37" }}>
                  Validade
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleInput}
                  placeholder="MM/AA"
                  className="input-mystic w-full px-4 py-3 text-sm"
                  maxLength={5}
                />
                {errors.expiry && <p className="text-xs mt-1 text-red-400">{errors.expiry}</p>}
              </div>
              <div>
                <label className="font-poppins text-xs mb-1.5 block" style={{ color: "#D4AF37" }}>
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleInput}
                  placeholder="123"
                  className="input-mystic w-full px-4 py-3 text-sm"
                  maxLength={3}
                />
                {errors.cvv && <p className="text-xs mt-1 text-red-400">{errors.cvv}</p>}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-cta w-full text-white font-poppins font-bold text-lg py-5 rounded-2xl cursor-pointer flex items-center justify-center gap-3 mt-2"
              id="btn-finalizar-compra"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </>
              ) : (
                <>🔐 GARANTIR MEU PLANO DOS 21 DIAS — R$ 97</>
              )}
            </button>

            <p className="text-center font-poppins text-xs" style={{ color: "rgba(245,239,216,0.4)" }}>
              🔒 Pagamento 100% seguro • Criptografia SSL 256-bit
            </p>

            {/* Card logos */}
            <div className="flex justify-center gap-4 pt-2">
              {["VISA", "MASTER", "PIX", "AMEX"].map(b => (
                <div key={b} className="px-3 py-1.5 rounded text-xs font-bold"
                  style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.2)" }}>
                  {b}
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
