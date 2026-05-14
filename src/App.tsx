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
} from 'lucide-react';
import { cardBackForSlot, HERO_DECK_IMAGES } from './deckImages';

const WHATSAPP_URL =
  'https://wa.me/559992116558?text=Quero%20saber%20mais!';

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

const LABELS = ['Sentimento', 'Bloqueio', 'Oportunidade'] as const;
const KEYS = ['sentimento', 'bloqueio', 'oportunidade'] as const;

function pickBundle(): Bundle {
  return NARRATIVE_BUNDLES[Math.floor(Math.random() * NARRATIVE_BUNDLES.length)];
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="glass-card p-6 rounded-xl cursor-pointer group hover:bg-white/10 transition-colors"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-4">
        <span className="font-medium text-stardust-white/90 text-left">{question}</span>
        <ChevronDown
          className={`text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
            <p className="pt-4 text-stardust-white/70 text-sm leading-relaxed text-left">{answer}</p>
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

  useLayoutEffect(() => {
    if (!resultVisible) return;
    const el = document.getElementById('resultado');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [resultVisible]);

  const runReveal = useCallback(() => {
    if (selectedOrder.length !== 3 || phase !== 'select') return;
    setPhase('busy');
    setOverlayKey((k) => k + 1);
    window.setTimeout(() => {
      setPhase('reveal');
      const b = pickBundle();
      setBundle(b);
      setFlipStep(0);
      window.setTimeout(() => setFlipStep(1), 0);
      window.setTimeout(() => setFlipStep(2), 750);
      window.setTimeout(() => setFlipStep(3), 1500);
      window.setTimeout(() => {
        setResultVisible(true);
        setPhase('done');
      }, 1500 + 900);
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
              <p className="font-display text-xl md:text-2xl italic text-primary leading-snug">
                Selando a sua combinação…
              </p>
              <p className="text-sm text-stardust-white/65 leading-relaxed">
                Poucas pessoas chegam até aqui com três cartas escolhidas com intenção. O que vem agora foi montado em
                cima da sua escolha — não é texto genérico.
              </p>
              <div
                className="h-1 rounded-full bg-primary/20 overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={100}
              >
                <motion.div
                  key={overlayKey}
                  className="h-full bg-primary rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 bg-midnight-void/90 backdrop-blur-md border-b border-primary/20">
        <div className="flex justify-between items-center px-6 md:px-20 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary w-5 h-5" fill="currentColor" />
            <span className="text-xl font-display font-semibold text-primary tracking-tight">
              Amor da Lua
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollToId('tiragem')}
            className="text-xs font-semibold uppercase tracking-widest text-primary hover:bg-primary/10 px-4 py-2 rounded-full transition-all duration-300"
          >
            Leitura gratuita
          </button>
        </div>
      </nav>

      <header className="relative pt-32 pb-24 md:pb-32 flex flex-col items-center text-center px-6 overflow-hidden">
        <div className="flex gap-4 mb-12 opacity-90 scale-90 md:scale-100">
          <motion.div
            animate={{ rotate: [-12, -10, -12] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-32 h-48 rounded-xl glass-card flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 card-inner-glow pointer-events-none" />
            <img
              src={HERO_DECK_IMAGES[0]}
              alt=""
              className="w-full h-full object-cover opacity-60"
            />
          </motion.div>
          <motion.div
            animate={{ y: [-10, 0, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-32 h-48 rounded-xl glass-card z-10 scale-110 flex items-center justify-center relative overflow-hidden -mt-4 shadow-2xl shadow-primary/20"
          >
            <div className="absolute inset-0 card-inner-glow pointer-events-none" />
            <img
              src={HERO_DECK_IMAGES[1]}
              alt=""
              className="w-full h-full object-cover opacity-70"
            />
          </motion.div>
          <motion.div
            animate={{ rotate: [12, 10, 12] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-32 h-48 rounded-xl glass-card flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 card-inner-glow pointer-events-none" />
            <img
              src={HERO_DECK_IMAGES[2]}
              alt=""
              className="w-full h-full object-cover opacity-60"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-6 relative z-10"
        >
          <span className="inline-block text-[10px] md:text-xs font-semibold bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
            Consulta privada de reconexão
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-stardust-white italic leading-tight">
            Ele realmente te esqueceu… ou ainda existe uma conexão não encerrada?
          </h1>
          <p className="text-lg text-stardust-white/80 max-w-xl mx-auto leading-relaxed">
            Existe algo que ele ainda sente e talvez nem consiga admitir. Sua leitura revela se essa conexão ainda
            pode ser reativada.
          </p>
          <div className="pt-8">
            <button
              type="button"
              onClick={() => scrollToId('tiragem')}
              className="gold-gradient text-midnight-void font-bold px-8 py-5 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 w-full md:w-auto uppercase tracking-widest text-sm"
            >
              Fazer minha leitura gratuita
            </button>
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-[10px] text-stardust-white/50 uppercase tracking-[0.2em]">
                Consulta sigilosa · Resultado imediato
              </p>
              <div className="flex items-center gap-4 mt-2 flex-wrap justify-center">
                <div className="flex text-primary" aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[10px] text-stardust-white/60 uppercase tracking-widest">
                  327 leituras realizadas recentemente
                </span>
              </div>
            </div>
          </div>
          <p className="pt-12 italic text-stardust-white/40 text-lg font-display leading-relaxed">
            Algumas conexões terminam.
            <br />
            Outras apenas entram em silêncio.
          </p>
        </motion.div>
      </header>

      <section className="py-24 bg-white/5 relative" id="como-funciona">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-display text-primary">Como funciona sua consulta</h2>
            <p className="text-stardust-white/70">Três etapas simples para revelar o que ainda existe.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '01', title: 'Sintonia', desc: 'Você responde três perguntas rápidas.' },
              { id: '02', title: 'Revelação', desc: 'As cartas identificam o momento emocional entre vocês.' },
              { id: '03', title: 'Direcionamento', desc: 'Você descobre o próximo passo ideal.' },
            ].map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="glass-card p-10 rounded-2xl flex flex-col items-center text-center space-y-4 hover:border-primary/40 transition-colors"
              >
                <span className="text-primary text-xl font-semibold opacity-60 tracking-widest">{step.id}</span>
                <h3 className="text-2xl font-display text-primary">{step.title}</h3>
                <p className="text-stardust-white/80 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 scroll-mt-24" id="tiragem">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-display text-primary">Sua Tiragem Especial</h2>
          <p className="text-stardust-white/75 mt-4 leading-relaxed">
            Escolha <strong className="text-primary/95">três cartas</strong> na ordem que o seu instinto mandar. O que
            vem depois não é &ldquo;achismo&rdquo;: é a leitura fechada em cima da combinação que só{' '}
            <em className="text-stardust-white/90">você</em> montou — e ela costuma mostrar o que ele não verbaliza.
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
                          selected ? 'opacity-100' : 'opacity-45'
                        }`}
                      />
                    </div>
                    <div className="tarot-face tarot-front">
                      {face && (
                        <>
                          <span className="text-[9px] font-semibold uppercase tracking-widest text-primary mb-1">
                            {face.label}
                          </span>
                          <span className="font-display text-[13px] sm:text-sm font-semibold text-stardust-white leading-tight mb-1 px-0.5">
                            {face.name}
                          </span>
                          <p className="text-[10px] leading-snug text-stardust-white/65 m-0 px-0.5">{face.snippet}</p>
                        </>
                      )}
                    </div>
                  </div>
                  {orderBadge !== null && !flipped && phase === 'select' && (
                    <span className="absolute top-1.5 right-1.5 bg-primary text-midnight-void w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10">
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
              className="gold-gradient text-midnight-void font-bold px-12 py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.15em] text-xs disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Revelar as cartas
            </button>
            {phase === 'select' && selectedOrder.length === 3 && (
              <p className="text-[11px] text-stardust-white/45 uppercase tracking-widest max-w-sm mx-auto">
                Ao revelar, você confirma que quer ver a leitura na íntegra — incluindo o que incomoda
              </p>
            )}
          </div>
        </div>
      </section>

      {resultVisible && bundle && (
        <section
          className="py-24 px-6 border-t border-primary/10 scroll-mt-24 md:scroll-mt-28"
          id="resultado"
          aria-labelledby="resultado-titulo"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.35em] text-primary/80 mb-3">
              Leitura montada na sua escolha
            </p>
            <h2 id="resultado-titulo" className="text-3xl md:text-4xl font-display text-primary text-center mb-4">
              O que as cartas revelam
            </h2>
            <p className="text-center text-stardust-white/70 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
              Abaixo está a tríade na <strong className="text-stardust-white/90">ordem exata</strong> em que você
              selecionou — Sentimento, Bloqueio e Oportunidade. Se algo aqui &ldquo;doer&rdquo;, respire: é sinal de que
              a leitura está batendo onde a conversa comum não chega.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {selectedOrder.map((cardIndex) => {
                const order = selectedOrder.indexOf(cardIndex);
                const key = KEYS[order];
                const piece = bundle[key];
                return (
                  <div
                    key={`res-${cardIndex}`}
                    className="tarot-scene w-[100px] h-[158px] sm:w-[112px] sm:h-[176px] pointer-events-none"
                    aria-hidden
                  >
                    <div className="tarot-inner h-full w-full is-flipped">
                      <div className="tarot-face tarot-back">
                        <img
                          src={cardBackForSlot(cardIndex)}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="tarot-face tarot-front">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-primary mb-1">
                          {LABELS[order]}
                        </span>
                        <span className="font-display text-[13px] sm:text-sm font-semibold text-stardust-white leading-tight mb-1">
                          {piece.name}
                        </span>
                        <p className="text-[10px] leading-snug text-stardust-white/65 m-0">{piece.snippet}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-5 text-center text-stardust-white/90 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              <p className="m-0 font-medium">
                As cartas fecham uma verdade que o silêncio dele esconde:{' '}
                <span className="text-primary">o vínculo não foi apagado</span> — ele foi colocado em modo de espera.
              </p>
              <p className="m-0">
                O que muda tudo agora é o <em>bloqueio</em>: ele explica por que ele se fecha, demora, some ou responde
                frio mesmo quando você sente que &ldquo;ainda existe coisa aí&rdquo;.
              </p>
              <p className="m-0 text-stardust-white/80">
                E tem um detalhe que dói admitir:{' '}
                <strong className="text-stardust-white">a próxima atitude sua pode abrir a porta… ou trancar de vez.</strong>{' '}
                Não é drama — é padrão. Quem improvisa com medo costuma pagar caro depois.
              </p>
            </div>
            <div
              className="glass-card rounded-2xl p-6 md:p-8 flex gap-4 max-w-xl mx-auto mb-10 border-primary/30 shadow-lg shadow-primary/5"
              role="status"
            >
              <span className="text-primary text-xl shrink-0" aria-hidden>
                ⚠
              </span>
              <div className="text-left">
                <strong className="font-display text-primary block mb-2 text-lg">
                  Janela emocional aberta — e ela não fica eterna
                </strong>
                <p className="text-sm text-stardust-white/80 m-0 leading-relaxed">
                  A leitura aponta movimento real nos próximos <strong>7 a 21 dias</strong>. É agora que a maioria
                  comete o erro caro: mandar mensagem no impulso, cobrar presença, provar amor em cima de medo. Se você
                  quer outro resultado, você precisa de <em>direção</em> — não de mais uma noite remoendo o celular.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <a
                href="#oferta"
                className="inline-flex gold-gradient text-midnight-void font-bold py-4 px-10 rounded-xl uppercase tracking-widest text-xs hover:brightness-110 transition-all text-center max-w-md w-full justify-center"
              >
                Quero meu direcionamento antes que eu me sabote de novo
              </a>
              <p className="text-[10px] text-stardust-white/40 uppercase tracking-widest text-center max-w-sm">
                Oferta visível nesta sessão · vaga para leitura estratégica
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-gradient-to-b from-transparent via-black/20 to-midnight-void" id="depoimentos">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display text-primary text-center mb-16 italic">
            Relatos de quem encontrou clareza
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
                className="glass-card p-8 rounded-2xl flex flex-col justify-between border-primary/20 bg-midnight-void/40 backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <Quote className="text-primary/40 -scale-x-100" size={32} />
                  <p className="italic leading-relaxed text-stardust-white/90">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="mt-8 pt-4 border-t border-primary/10">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">— {t.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6" id="oferta">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h2 className="text-4xl font-display text-primary italic">Seu mapa dos 21 dias</h2>
              <p className="text-lg text-stardust-white/70 leading-relaxed">
                Um direcionamento estratégico e emocional para atravessar esse momento com clareza.
              </p>
              <ul className="space-y-4 inline-block text-left">
                {['Diagnóstico emocional', 'Janela ideal de aproximação', 'O que evitar', 'Estratégia personalizada', 'Plano prático'].map(
                  (item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                      <span className="text-stardust-white/90 font-medium">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <motion.div
              whileHover={{ y: -5 }}
              className="w-full md:w-80 glass-card p-10 rounded-3xl text-center flex flex-col items-center border-2 border-primary/30 bg-black/30 relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-midnight-void text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Oferta
              </div>
              <span className="text-stardust-white/40 line-through text-lg">R$197</span>
              <span className="text-5xl font-display font-bold text-primary my-2">R$39,90</span>
              <div className="w-full flex flex-col items-center gap-2 mb-5">
                <p className="text-sm text-stardust-white/75 font-medium m-0">Fale comigo</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-bold text-sm uppercase tracking-widest bg-[#25D366] text-white hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#25D366]/25"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={2} />
                  WhatsApp
                </a>
              </div>
              <button
                type="button"
                id="cta-checkout"
                className="gold-gradient text-midnight-void font-bold py-4 px-8 rounded-xl w-full uppercase tracking-widest text-xs mb-4 hover:brightness-110 active:scale-95 transition-all"
              >
                Receber meu mapa agora
              </button>
              <p className="text-[10px] text-stardust-white/40 uppercase tracking-[0.2em] font-medium leading-relaxed">
                Disponível apenas durante esta sessão
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/5 text-center px-6" id="garantia">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-display text-primary italic">Compromisso com sua clareza</h2>
          <p className="text-stardust-white/70 leading-relaxed">
            Se após acessar o material você não sentir direção real sobre seus próximos passos, devolvemos
            integralmente.
          </p>
          <div className="flex justify-center pt-4">
            <Verified className="text-5xl text-primary/40 w-12 h-12" aria-hidden />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-midnight-void border-t border-primary/10" id="faq">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-3xl font-display text-primary text-center italic">Perguntas frequentes</h2>
          <div className="space-y-4">
            <FAQItem
              question="Isso realmente funciona?"
              answer="O método combina leitura emocional estruturada com um plano de ação. Funciona quando você está aberta a enxergar o relacionamento com honestidade — não como garantia, mas como ferramenta de clareza."
            />
            <FAQItem
              question="Preciso ter contato com ele?"
              answer="Não. A consulta parte do seu momento e da dinâmica entre vocês, mesmo em silêncio ou distância. O foco é o que você pode fazer com consciência."
            />
            <FAQItem
              question="Quanto tempo leva?"
              answer="A leitura inicial é imediata. O mapa dos 21 dias é organizado para leitura em etapas — você avança no seu ritmo, com orientações claras para cada fase."
            />
            <FAQItem
              question="Como recebo o mapa?"
              answer="Após a confirmação do acesso, você recebe o material digital por e-mail, com link seguro para download e consulta quando precisar."
            />
          </div>
        </div>
      </section>

      <footer className="w-full py-20 border-t border-primary/20 bg-midnight-void">
        <div className="flex flex-col items-center text-center px-6 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary w-6 h-6" fill="currentColor" />
              <span className="text-2xl font-display font-semibold text-primary tracking-tight italic">Amor da Lua</span>
            </div>
            <p className="text-[10px] text-primary/70 uppercase tracking-[0.3em] font-medium">
              Consulta privada · Experiência premium
            </p>
          </div>
          <div className="w-12 h-px bg-primary/30" />
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {['Termos de Uso', 'Privacidade', 'Contato'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-stardust-white/60 text-xs font-semibold uppercase tracking-widest hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
          <p className="text-stardust-white/30 text-[10px] uppercase tracking-[0.2em] font-medium pt-4">
            © 2026 Amor da Lua — Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
