/**
 * Amor da Lua — tiragem, overlay e revelação
 */
(function () {
  "use strict";

  const NARRATIVE_BUNDLES = [
    {
      sentimento: {
        name: "Presença emocional",
        snippet: "O vínculo não se apagou: há lembrança afetiva e um lugar ainda ocupado por você.",
      },
      bloqueio: {
        name: "Silêncio defensivo",
        snippet: "Existe bloqueio: orgulho ou medo de se expor de novo mantém as respostas em pausa.",
      },
      oportunidade: {
        name: "Janela de reabertura",
        snippet: "Há abertura: gestos consistentes e calma podem reativar o diálogo sem forçar o ritmo dele.",
      },
    },
    {
      sentimento: {
        name: "Conexão residual",
        snippet: "As cartas mostram vínculo: o afastamento não encerrou o sentimento, apenas o contato.",
      },
      bloqueio: {
        name: "Cansaço emocional",
        snippet: "O bloqueio vem do esgotamento: ele precisa sentir segurança antes de qualquer passo.",
      },
      oportunidade: {
        name: "Momento de maturidade",
        snippet: "A abertura existe no maturar da situação: clareza sua primeiro, aproximação depois.",
      },
    },
    {
      sentimento: {
        name: "Memória viva",
        snippet: "Confirma vínculo: detalhes do relacionamento ainda reverberam no emocional dele.",
      },
      bloqueio: {
        name: "Expectativa x medo",
        snippet: "Bloqueio na dúvida do que você espera dele — ele evita repetir o mesmo desgaste.",
      },
      oportunidade: {
        name: "Espaço para reparo",
        snippet: "Abertura quando a comunicação for leve, sem cobrança — reparo antes de romance.",
      },
    },
    {
      sentimento: {
        name: "Laço não resolvido",
        snippet: "Há vínculo em aberto: a história pede um fechamento honesto ou uma segunda chance.",
      },
      bloqueio: {
        name: "Autoproteção",
        snippet: "Bloqueio no autoproteger-se: distância como forma de não sentir de novo a perda.",
      },
      oportunidade: {
        name: "Sinalização clara",
        snippet: "A abertura surge com mensagens objetivas e respeito ao tempo dele — sem joguinhos.",
      },
    },
    {
      sentimento: {
        name: "Quente por dentro",
        snippet: "O vínculo ainda pulsa: frieza na superfície esconde movimento interno não verbalizado.",
      },
      bloqueio: {
        name: "Ruído recente",
        snippet: "Bloqueio ligado a mal-entendidos recentes — ele precisa baixar a guarda para ouvir.",
      },
      oportunidade: {
        name: "Pontes pequenas",
        snippet: "Existe abertura em microaproximações: presença estável pesa mais que grandes declarações.",
      },
    },
  ];

  const LABELS = ["Sentimento", "Bloqueio", "Oportunidade"];
  const KEYS = ["sentimento", "bloqueio", "oportunidade"];

  const cardsRoot = document.getElementById("tiragem-cards");
  const hintEl = document.getElementById("tiragem-hint");
  const btnRevelar = document.getElementById("btn-revelar");
  const overlay = document.getElementById("interpret-overlay");
  const progressBar = document.getElementById("interpret-progress-bar");
  const progressEl = document.getElementById("interpret-progress");
  const resultadoSection = document.getElementById("resultado");
  const resultCardsRow = document.getElementById("result-cards-row");

  let selectedOrder = [];
  let cardElements = [];
  let currentBundle = null;
  let phase = "select";

  function pickBundle() {
    const i = Math.floor(Math.random() * NARRATIVE_BUNDLES.length);
    return NARRATIVE_BUNDLES[i];
  }

  function updateHint() {
    const n = selectedOrder.length;
    if (phase !== "select") return;
    if (n === 0) hintEl.textContent = "Toque em três cartas.";
    else if (n < 3) hintEl.textContent = `${3 - n} carta(s) restante(s).`;
    else hintEl.textContent = "Pronta para revelar.";
    btnRevelar.disabled = n !== 3;
  }

  function setCardSelected(el, on) {
    el.classList.toggle("is-selected", on);
  }

  function createCard(index) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tarot-card";
    btn.setAttribute("data-index", String(index));
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = `
      <span class="tarot-card__inner">
        <span class="tarot-card__face tarot-card__back">
          <span class="tarot-card__glyph">AL</span>
        </span>
        <span class="tarot-card__face tarot-card__front">
          <span class="tarot-card__label"></span>
          <span class="tarot-card__name"></span>
          <p class="tarot-card__snippet"></p>
        </span>
      </span>
    `;
    btn.addEventListener("click", () => onCardClick(index));
    return btn;
  }

  function onCardClick(index) {
    if (phase !== "select") return;
    const el = cardElements[index];
    const pos = selectedOrder.indexOf(index);
    if (pos !== -1) {
      selectedOrder.splice(pos, 1);
      setCardSelected(el, false);
      el.setAttribute("aria-pressed", "false");
    } else if (selectedOrder.length < 3) {
      selectedOrder.push(index);
      setCardSelected(el, true);
      el.setAttribute("aria-pressed", "true");
    }
    updateHint();
  }

  function fillCardFace(el, keyIndex, data) {
    const label = el.querySelector(".tarot-card__label");
    const name = el.querySelector(".tarot-card__name");
    const snippet = el.querySelector(".tarot-card__snippet");
    const key = KEYS[keyIndex];
    const piece = data[key];
    label.textContent = LABELS[keyIndex];
    name.textContent = piece.name;
    snippet.textContent = piece.snippet;
  }

  function runInterpretation() {
    phase = "busy";
    cardElements.forEach((c) => (c.disabled = true));
    btnRevelar.disabled = true;
    overlay.hidden = false;
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    if (progressEl) progressEl.setAttribute("aria-valuenow", "0");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressBar.style.transition = "width 3s linear";
        progressBar.style.width = "100%";
        if (progressEl) progressEl.setAttribute("aria-valuenow", "100");
      });
    });

    window.setTimeout(() => {
      overlay.hidden = true;
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      revealSequence();
    }, 3000);
  }

  function revealSequence() {
    phase = "reveal";
    currentBundle = pickBundle();

    selectedOrder.forEach((cardIndex, order) => {
      const el = cardElements[cardIndex];
      fillCardFace(el, order, currentBundle);
      window.setTimeout(() => {
        el.classList.add("is-flipped");
      }, order * 750);
    });

    const doneAt = selectedOrder.length * 750 + 900;
    window.setTimeout(() => {
      showResultado();
    }, doneAt);
  }

  function cloneResultCards() {
    resultCardsRow.innerHTML = "";
    selectedOrder.forEach((cardIndex, order) => {
      const source = cardElements[cardIndex];
      const wrap = document.createElement("div");
      wrap.className = "tarot-card is-flipped";
      wrap.setAttribute("aria-hidden", "true");
      wrap.innerHTML = source.innerHTML;
      resultCardsRow.appendChild(wrap);
    });
  }

  function showResultado() {
    resultadoSection.hidden = false;
    cloneResultCards();
    resultadoSection.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("is-visible");
    });
    const y = resultadoSection.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
    phase = "done";
  }

  function initCards() {
    for (let i = 0; i < 7; i++) {
      const el = createCard(i);
      cardsRoot.appendChild(el);
      cardElements.push(el);
    }
    updateHint();
  }

  btnRevelar.addEventListener("click", () => {
    if (selectedOrder.length !== 3 || phase !== "select") return;
    runInterpretation();
  });

  /* Scroll reveal */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    io.observe(el);
  });

  initCards();
})();
