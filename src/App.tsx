import { useState, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Verified,
  Quote,
  Star,
  MessageCircle,
  Moon,
  LayoutGrid,
  ScrollText,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  BadgeCheck,
} from 'lucide-react';
import { cardBackForSlot, HERO_DECK_IMAGES } from './deckImages';

const WHATSAPP_URL =
  'https://wa.me/14509135333?text=Quero%20saber%20Mais!';

type Bundle = {
  sentimento: { name: string; snippet: string };
  bloqueio: { name: string; snippet: string };
  oportunidade: { name: string; snippet: string };
};

const NARRATIVE_BUNDLES: Bundle[] = [
  {
    sentimento: {
      name: 'Presença emocional',
      snippet: 'O vínculo não se apagou: há lembrança afetiva e um lugar ainda ocupado por você.',
    },
    bloqueio: {
      name: 'Silêncio defensivo',
      snippet: 'Existe bloqueio: orgulho ou medo de se expor de novo mantém as respostas em pausa.',
    },
    oportunidade: {
      name: 'Janela de reabertura',
      snippet: 'Há abertura: gestos consistentes e calma podem reativar o diálogo sem forçar o ritmo dele.',
    },
  },
  {
    sentimento: {
      name: 'Conexão residual',
      snippet: 'As cartas mostram vínculo: o afastamento não encerrou o sentimento, apenas o contato.',
    },
    bloqueio: {
      name: 'Cansaço emocional',
      snippet: 'O bloqueio vem do esgotamento: ele precisa sentir segurança antes de qualquer passo.',
    },
    oportunidade: {
      name: 'Momento de maturidade',
      snippet: 'A abertura existe no maturar da situação: clareza sua primeiro, aproximação depois.',
    },
  },
  {
    sentimento: {
      name: 'Memória viva',
      snippet: 'Confirma vínculo: detalhes do relacionamento ainda reverberam no emocional dele.',
    },
    bloqueio: {
      name: 'Expectativa x medo',
      snippet: 'Bloqueio na dúvida do que você espera dele — ele evita repetir o mesmo desgaste.',
    },
    oportunidade: {
      name: 'Espaço para reparo',
      snippet: 'Abertura quando a comunicação for leve, sem cobrança — reparo antes de romance.',
    },
  },
  {
    sentimento: {
      name: 'Laço não resolvido',
      snippet: 'Há vínculo em aberto: a história pede um fechamento honesto ou uma segunda chance.',
    },
    bloqueio: {
      name: 'Autoproteção',
      snippet: 'Bloqueio no autoproteger-se: distância como forma de não sentir de novo a perda.',
    },
    oportunidade: {
      name: 'Sinalização clara',
      snippet: 'A abertura surge com mensagens objetivas e respeito ao tempo dele — sem joguinhos.',
    },
  },
  {
    sentimento: {
      name: 'Quente por dentro',
      snippet: 'O vínculo ainda pulsa: frieza na superfície esconde movimento interno não verbalizado.',
    },
    bloqueio: {
      name: 'Ruído recente',
      snippet: 'Bloqueio ligado a mal-entendidos recentes — ele precisa baixar a guarda para ouvir.',
    },
    oportunidade: {
      name: 'Pontes pequenas',
      snippet: 'Existe abertura em microaproximações: presença estável pesa mais que grandes declarações.',
    },
  },
];

const LABELS = ['O que ele sente por você', 'O que está bloqueando', 'O caminho possível'] as const;
const KEYS = ['sentimento', 'bloqueio', 'oportunidade'] as const;

function pickBundle(): Bundle {
  return NARRATIVE_BUNDLES[Math.floor(Math.random() * NARRATIVE_BUNDLES.length)];
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="border-b border-white/5 py-4 cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-4 py-2">
        <span className="font-semibold text-on-surface text-base text-left">{question}</span>
        <ChevronDown
          className={`text-celestial-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 pt-2 text-on-surface-variant text-sm leading-relaxed text-left">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [phase, setPhase] = useState<'select' | 'busy' | 'reveal' | 'done'>('select');
  const [flipStep, setFlipStep] = useState(0);
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [overlayKey, setOverlayKey] = useState(0);

  const toggleCard = (index: number) => {
    if (phase !== 'select') return;
    setSelectedOrder((prev) => {
      const pos = prev.indexOf(index);
      if (pos !== -1) return prev.filter((i) => i !== index);
      if (prev.length >= 3) return prev;
      return [...prev, index];
    });
  };

  const hint =
    phase !== 'select'
      ? ''
      : selectedOrder.length === 0
        ? 'Toque em três cartas — a ordem que você escolher importa para a leitura.'
        : selectedOrder.length < 3
          ? `Faltam ${3 - selectedOrder.length}. Cada carta que você encaixa aqui abre uma camada do que ele guarda.`
          : 'Combinação fechada. Quando você revelar, a leitura desce inteira — na ordem exata que você montou.';

  // Auto-scroll logic removed to avoid breaking emotional flow.

  const runReveal = useCallback(() => {
    if (selectedOrder.length !== 3 || phase !== 'select') return;
    setPhase('busy');
    setOverlayKey((k) => k + 1);
    
    // Step 2: Progress Bar / Interpretation Loading
    window.setTimeout(() => {
      setPhase('reveal');
      const b = pickBundle();
      setBundle(b);
      setFlipStep(0);
      
      // Step 3: Reveal cards one by one with 900ms delay
      window.setTimeout(() => setFlipStep(1), 0);
      window.setTimeout(() => setFlipStep(2), 900);
      window.setTimeout(() => setFlipStep(3), 1800);
      
      window.setTimeout(() => {
        setPhase('done');
      }, 1800 + 900);
    }, 3000);
  }, [phase, selectedOrder.length]);

  const cardDisabled = phase !== 'select';
  const isFlipped = (cardIndex: number) => {
    if (phase !== 'reveal' && phase !== 'done') return false;
    const order = selectedOrder.indexOf(cardIndex);
    if (order === -1) return false;
    return flipStep > order;
  };

  const faceFor = (cardIndex: number) => {
    const order = selectedOrder.indexOf(cardIndex);
    if (order === -1 || !bundle) return null;
    const key = KEYS[order];
    const piece = bundle[key];
    return { label: LABELS[order], ...piece };
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {phase === 'busy' && (
          <motion.div
            key={overlayKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-midnight-void/90 backdrop-blur-md px-6"
          >
            <div className="text-center max-w-sm space-y-6">
              <p className="font-display text-xl md:text-2xl italic text-celestial-gold leading-snug">
                Interpretando os sinais dessa conexão...
              </p>
              <p className="text-sm text-stardust-white/65 leading-relaxed italic">
                "As cartas estão revelando aquilo que o silêncio dele esconde."
              </p>
              <div
                className="h-1 rounded-full bg-celestial-gold/20 overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={100}
              >
                <motion.div
                  key={overlayKey}
                  className="h-full bg-celestial-gold rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="text-celestial-gold w-5 h-5" fill="currentColor" />
            <span className="text-lg font-display font-bold text-on-surface tracking-widest uppercase">
              Amor da Lua
            </span>
          </div>
          <div className="p-1 rounded-full border border-on-surface/10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container">
              <Sparkles className="text-celestial-gold w-4 h-4" />
            </div>
          </div>
        </div>
      </nav>

      <header className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* Background Moon Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80&w=2000" 
            alt="Full moon background" 
            className="w-full h-full object-cover opacity-20 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto space-y-8 relative z-10 pt-10"
        >
          <span className="inline-block text-[11px] font-bold text-celestial-gold border border-celestial-gold/30 px-6 py-2 rounded-full uppercase tracking-[0.25em] bg-celestial-gold/5">
            Leitura privada de reconexão
          </span>
          
          <h1 className="text-[42px] md:text-6xl font-display text-on-surface font-bold leading-[1.1] tracking-tight">
            O silêncio dele <br />
            não é resposta...
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Tem uma diferença entre alguém que foi embora e alguém que está esperando você dar o primeiro passo energético.
          </p>

          <div className="pt-4 flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToId('tiragem')}
              className="gold-gradient text-on-primary font-bold px-10 py-5 rounded-full shadow-2xl cta-glow hover:scale-105 active:scale-95 transition-all duration-300 w-full md:w-auto uppercase tracking-widest text-sm"
            >
              Quero saber o que ele ainda sente
            </button>
            
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1 text-celestial-gold" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest">
                Mais de 327 leituras realizadas
              </span>
            </div>
          </div>
        </motion.div>
      </header>

      <section className="py-24 px-6 bg-surface" id="como-funciona">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-[32px] font-display font-bold text-on-surface leading-tight">
              Em alguns minutos, você <br className="md:hidden" /> vai entender...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: <Moon className="text-celestial-gold" size={24} />, 
                title: 'Energia', 
                desc: 'Nossas cartas captam a vibração atual entre vocês, mesmo à distância.' 
              },
              { 
                icon: <LayoutGrid className="text-celestial-gold" size={24} />, 
                title: 'Cards', 
                desc: 'Uma leitura personalizada revelando os bloqueios e desejos ocultos.' 
              },
              { 
                icon: <ScrollText className="text-celestial-gold" size={24} />, 
                title: 'Next Step', 
                desc: 'O plano exato para desbloquear a comunicação e reatar os laços.' 
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-[24px] flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container mb-2">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-on-surface">{feature.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        {/* Mystical Background for Prepare section */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000" 
            alt="Mystical smoke" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface" />
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10 space-y-10">
          <h2 className="text-3xl md:text-[32px] font-display font-bold text-celestial-gold">Prepare seu Coração</h2>
          
          <p className="text-lg md:text-xl text-on-surface italic leading-relaxed font-medium">
            "Respire fundo. Pense no rosto dele, sinta o cheiro, lembre do último abraço... Deixe a energia fluir."
          </p>

          <button
            type="button"
            onClick={() => scrollToId('tiragem')}
            className="inline-block border-2 border-celestial-gold/50 text-celestial-gold font-bold px-10 py-4 rounded-full uppercase tracking-[0.2em] text-xs hover:bg-celestial-gold/10 transition-all duration-300"
          >
            REVELAR MINHA LEITURA
          </button>
        </div>
      </section>

      <section className="py-24 px-6 scroll-mt-24" id="tiragem">
        <div className="max-w-2xl mx-auto text-center mb-12 flex flex-col items-center">
          <Star className="text-celestial-gold w-10 h-10 mb-8" fill="currentColor" />
          <h2 className="text-3xl font-display font-bold text-on-surface">Sua Tiragem Especial</h2>
          <p className="text-on-surface-variant mt-4 leading-relaxed">
            Escolha <strong className="text-celestial-gold">três cartas</strong> na ordem que o seu instinto mandar.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {Array.from({ length: 7 }, (_, idx) => {
              const selected = selectedOrder.includes(idx);
              const orderBadge = selected ? selectedOrder.indexOf(idx) + 1 : null;
              const flipped = isFlipped(idx);
              const face = faceFor(idx);
              return (
                <motion.button
                  key={idx}
                  type="button"
                  disabled={cardDisabled}
                  whileHover={!cardDisabled && !flipped ? { y: -4 } : undefined}
                  onClick={() => toggleCard(idx)}
                  className={`tarot-scene w-[100px] h-[158px] sm:w-[112px] sm:h-[176px] shrink-0 relative rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default ${
                    selected && !flipped ? 'ring-2 ring-primary' : ''
                  }`}
                  aria-pressed={selected}
                >
                  <div className={`tarot-inner h-full w-full ${flipped ? 'is-flipped' : ''}`}>
                    <div className="tarot-face tarot-back">
                      <img
                        src={cardBackForSlot(idx)}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                          selected ? 'opacity-100' : 'opacity-40'
                        }`}
                      />
                    </div>
                    <div className="tarot-face tarot-front">
                      {face && (
                        <>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-celestial-gold mb-1">
                            {face.label}
                          </span>
                          <span className="font-display text-[13px] sm:text-sm font-bold text-on-surface leading-tight mb-1 px-0.5">
                            {face.name}
                          </span>
                          <p className="text-[10px] leading-snug text-on-surface-variant m-0 px-0.5">{face.snippet}</p>
                        </>
                      )}
                    </div>
                  </div>
                  {orderBadge !== null && !flipped && phase === 'select' && (
                    <span className="absolute top-1.5 right-1.5 bg-celestial-gold text-on-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10">
                      {orderBadge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
          <div className="mt-12 text-center space-y-6">
            {phase === 'select' && (
              <p className="text-stardust-white/65 text-sm max-w-md mx-auto leading-relaxed">{hint}</p>
            )}
            {(phase === 'busy' || phase === 'reveal') && (
              <p className="text-primary/90 text-xs font-semibold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
                Não saia da tela — em instantes você será levada para &ldquo;O que as cartas revelam&rdquo; com a leitura
                completa da sua combinação.
              </p>
            )}
            <button
              type="button"
              onClick={runReveal}
              disabled={selectedOrder.length !== 3 || phase !== 'select'}
              className="gold-gradient text-on-primary font-bold px-12 py-4 rounded-full shadow-lg cta-glow hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.15em] text-xs disabled:opacity-35 disabled:cursor-not-allowed"
            >
              Revelar as cartas
            </button>
            {phase === 'select' && selectedOrder.length === 3 && (
              <p className="text-[11px] text-on-surface-variant/45 uppercase tracking-widest max-w-sm mx-auto">
                Ao revelar, você confirma que quer ver a leitura na íntegra — incluindo o que incomoda
              </p>
            )}
          </div>
          
          {phase === 'done' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-20 space-y-12 max-w-2xl mx-auto"
            >
              <div className="space-y-6 text-center">
                <h3 className="text-2xl font-display font-bold text-on-surface">O que as cartas revelam sobre vocês</h3>
                <div className="space-y-4 text-on-surface-variant leading-relaxed text-lg">
                  <p>As cartas mostram que essa conexão ainda carrega movimento emocional. Existe algo não encerrado entre vocês.</p>
                  <p>Mas também existe um bloqueio que precisa ser compreendido com clareza.</p>
                  <p className="font-semibold text-on-surface">A questão agora não é descobrir se ele ainda sente.</p>
                  <p>A questão é saber como agir sem transformar essa abertura em encerramento definitivo.</p>
                </div>
              </div>

              <div className="bg-[#1E0E0E]/60 border border-[#93000A]/30 p-8 rounded-[24px] flex gap-4 items-start text-left shadow-2xl">
                <AlertCircle className="text-[#ffb4ab] shrink-0 mt-1" size={24} />
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#ffb4ab] uppercase tracking-[0.2em] block">⚠ Janela emocional identificada</span>
                  <p className="text-base text-[#ffdad6] leading-relaxed">
                    As cartas indicam abertura emocional ativa nos próximos dias. Uma atitude precipitada pode fechar essa abertura.
                  </p>
                </div>
              </div>

              <div className="pt-8 flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setResultVisible(true);
                    setTimeout(() => scrollToId('oferta'), 100);
                  }}
                  className="gold-gradient text-on-primary font-bold px-12 py-6 rounded-full shadow-2xl cta-glow w-full uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  QUERO MEU DIRECIONAMENTO COMPLETO
                </button>
                <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-[0.3em] font-bold">
                  Clique para ver a estratégia completa de reconexão
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {resultVisible && bundle && (
        <section
          className="py-24 px-6 scroll-mt-24 md:scroll-mt-28 bg-surface"
          id="resultado"
          aria-labelledby="resultado-titulo"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <Star className="text-celestial-gold w-10 h-10 mb-8" fill="currentColor" />
            
            <h2 id="resultado-titulo" className="text-3xl md:text-4xl font-display font-bold text-on-surface text-center mb-12">
              Seu Mapa para o <br /> Coração Dele
            </h2>

            <p className="text-center text-on-surface-variant text-base max-w-xl mx-auto mb-16 leading-relaxed">
              Não é apenas uma leitura. É um plano estratégico de reconexão espiritual e emocional.
            </p>

            <div className="w-full space-y-6 mb-20">
              {[
                'O que ele pensa antes de dormir',
                'O gatilho que fará ele te procurar',
                'Cronograma de 7 dias de reconexão',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-on-surface">
                  <div className="w-5 h-5 rounded-full border border-celestial-gold flex items-center justify-center">
                    <Sparkles className="text-celestial-gold w-3 h-3" />
                  </div>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <div className="w-full glass-card p-10 rounded-[32px] text-center space-y-4 mb-10">
              <span className="text-on-surface-variant/40 line-through text-lg">De R$ 197</span>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-on-surface text-xl">por</span>
                <span className="text-5xl md:text-6xl font-display font-bold text-celestial-gold">R$ 39,90</span>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient text-on-primary font-bold px-10 py-6 rounded-full shadow-2xl cta-glow w-full uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all duration-300 text-center"
            >
              QUERO MEU DIRECIONAMENTO AGORA
            </a>
          </div>
        </section>
      )}

      <section className="py-24 px-6 bg-surface" id="relatos">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-on-surface text-center mb-16">
              Vozes que encontraram a luz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: 'A leitura me trouxe clareza sobre o afastamento e me fez agir com mais consciência. Parecia conversar com alguém que entendia o meu silêncio.',
                  author: 'Mariana, 34',
                },
                {
                  text: 'Eu estava presa no ciclo de mensagens e espera. O direcionamento me ajudou a respirar e escolher o que era melhor para mim, sem drama.',
                  author: 'Letícia, 29',
                },
                {
                  text: 'Não é promessa milagrosa — é estrutura. Senti que finalmente tinha um plano emocional para atravessar aqueles dias.',
                  author: 'Camila, 41',
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="glass-card p-10 rounded-[32px] flex flex-col justify-between border-transparent"
                >
                  <div className="space-y-6">
                    <Quote className="text-celestial-gold/20 -scale-x-100" size={40} />
                    <p className="leading-relaxed text-on-surface-variant font-medium italic">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="mt-10 pt-6 border-t border-on-surface/5">
                    <span className="text-xs font-bold uppercase tracking-widest text-celestial-gold">— {t.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      <section className="py-24 px-6 bg-surface-variant/30" id="oferta">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface leading-tight">Seu mapa de <br /> reconexão</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Um direcionamento estratégico e emocional para atravessar esse momento com clareza.
              </p>
              <ul className="space-y-6 inline-block text-left">
                {['Diagnóstico emocional completo', 'Janela ideal de aproximação', 'O que NÃO fazer em hipótese alguma', 'Plano prático de 21 dias'].map(
                  (item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-celestial-gold/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="text-celestial-gold w-4 h-4" />
                      </div>
                      <span className="text-on-surface font-semibold">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            
            <div className="w-full md:w-[400px] glass-card p-12 rounded-[40px] text-center flex flex-col items-center border-transparent relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-50" />
              <span className="text-on-surface-variant/40 line-through text-xl">De R$ 197</span>
              <div className="flex items-baseline gap-2 mt-2 mb-8">
                <span className="text-on-surface text-xl">por</span>
                <span className="text-6xl font-display font-bold text-celestial-gold">R$ 39,90</span>
              </div>

              <div className="w-full space-y-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-gradient text-on-primary font-bold py-5 px-8 rounded-full w-full uppercase tracking-[0.2em] text-xs hover:brightness-110 active:scale-95 transition-all shadow-xl text-center"
                >
                  LIBERAR MEU ACESSO
                </a>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-on-surface-variant uppercase tracking-widest font-bold py-2">
                  <ShieldCheck size={14} className="text-celestial-gold" />
                  <span>Pagamento 100% Seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface text-center px-6" id="garantia">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="w-20 h-20 rounded-full border border-celestial-gold/30 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-celestial-gold w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-on-surface">Compromisso com sua clareza</h2>
          <p className="text-on-surface-variant leading-relaxed text-lg max-w-lg mx-auto">
            Se após acessar o material você não sentir direção real sobre seus próximos passos, devolvemos seu investimento integralmente.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-surface" id="faq">
        <div className="max-w-3xl mx-auto space-y-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface text-center">Dúvidas Frequentes</h2>
          <div className="space-y-2">
            <FAQItem
              question="Isso realmente funciona?"
              answer="O método combina leitura emocional estruturada com um plano de ação prático. Funciona quando você está aberta a enxergar o relacionamento com honestidade — não como garantia, mas como ferramenta de clareza."
            />
            <FAQItem
              question="Preciso ter contato com ele agora?"
              answer="Não. A consulta parte do seu momento atual e da dinâmica entre vocês, mesmo em silêncio absoluto. O foco é preparar você para o momento certo."
            />
            <FAQItem
              question="Como recebo o acesso?"
              answer="Após a confirmação do pagamento, você recebe imediatamente no seu e-mail o acesso ao seu portal de leitura e ao mapa completo."
            />
          </div>
        </div>
      </section>

      <footer className="w-full py-24 bg-surface border-t border-on-surface/5">
        <div className="flex flex-col items-center text-center px-6 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <Sparkles className="text-celestial-gold w-8 h-8" fill="currentColor" />
              <span className="text-3xl font-display font-bold text-on-surface tracking-tight">Amor da Lua</span>
            </div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.4em] font-bold">
              Experiência de Reconexão Premium
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-16 gap-y-6">
            {['Privacidade', 'Termos', 'Suporte'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest hover:text-celestial-gold transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="pt-8 border-t border-on-surface/5 w-full max-w-sm">
            <p className="text-on-surface-variant/30 text-[10px] uppercase tracking-[0.2em] font-bold">
              © 2026 Amor da Lua — Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
