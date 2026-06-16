"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Send,
  Heart,
  CheckCircle,
  Sparkles,
  Users,
  Music,
  Flame,
  Quote
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

type FormTab = "sugestao" | "testemunho";

// ─── DATA ────────────────────────────────────────────────────────────────────

const GALLERY_PHOTOS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=800&auto=format&fit=crop&q=70",
    alt: "Momento de louvor e adoração profunda",
    tag: "Adoração",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=70",
    alt: "Jovens sorrindo em comunhão",
    tag: "Comunhão",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=500&auto=format&fit=crop&q=70",
    alt: "Pregação da Palavra no altar",
    tag: "A Palavra",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1461532257346-8200aa9adc3f?w=500&auto=format&fit=crop&q=70",
    alt: "Oração e clamor juntos",
    tag: "Clamor & Oração",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    initials: "MS",
    name: "Mateus Silva",
    role: "Participou em 2025",
    text: "O Vibração mudou completamente minha perspectiva. A energia daquele lugar, as conexões genuínas que fiz e o encontro real com Deus... foi indescritível.",
  },
  {
    id: 2,
    initials: "AJ",
    name: "Ana Júlia",
    role: "Líder de Jovens",
    text: "Incrível do início ao fim. Voltei transformada, com o coração queimando e amizades que vou carregar pra vida inteira. Mal posso esperar pelo dia 13!",
  },
  {
    id: 3,
    initials: "RL",
    name: "Rafael Lima",
    role: "Voluntário em 2025",
    text: "Servir e participar desse evento nos mostra o verdadeiro significado de ser Igreja. A organização, o louvor e a mensagem nos impulsionam a ir além.",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function calcCountdown(): CountdownState {
  const event = new Date("2026-09-13T09:00:00-03:00");
  const diff = event.getTime() - Date.now();
  if (diff <= 0)
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return { days: pad(d), hours: pad(h), minutes: pad(m), seconds: pad(s) };
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#1C1A22] border border-amber-500/10 rounded-2xl py-4 px-2 text-center shadow-inner">
      <span className="block font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-400 leading-none tabular-nums">
        {value}
      </span>
      <span className="block text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-zinc-400 mt-2">
        {label}
      </span>
    </div>
  );
}

function TestimonialCard({ initials, name, role, text }: Omit<typeof TESTIMONIALS[0], "id">) {
  return (
    <div className="bg-[#16141A] border border-zinc-800 rounded-2xl p-6 relative flex flex-col justify-between transition-all duration-300 hover:border-amber-500/20">
      <Quote className="absolute top-4 right-4 text-amber-500/10 w-12 h-12 stroke-[1.5]" />
      
      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic mb-6 relative z-10">
        "{text}"
      </p>
      
      <div className="flex items-center gap-3 border-t border-zinc-800/60 pt-4">
        <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-['Syne',sans-serif] text-xs font-extrabold shrink-0">
          {initials}
        </div>
        <div>
          <div className="font-['Syne',sans-serif] text-sm font-bold text-zinc-100">
            {name}
          </div>
          <div className="text-xs text-zinc-400">{role}</div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-[#16141A] border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all appearance-none";

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [countdown, setCountdown] = useState<CountdownState>(calcCountdown());
  const [activeTab, setActiveTab] = useState<FormTab>("sugestao");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setCountdown(calcCountdown()), 1_000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1_200));
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Erro ao enviar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-['Inter',sans-serif] bg-[#0E0D12] text-zinc-100 min-h-screen w-full overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[620px] lg:min-h-screen flex items-center overflow-hidden py-12 lg:py-0">
        {/* Imagem de Fundo Evangélica Emocionante */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=1600&auto=format&fit=crop&q=80')] bg-center bg-cover bg-no-repeat brightness-[0.35] saturate-[0.7]"
          aria-hidden="true"
        />
        {/* Overlay de gradiente suave */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0D12]/40 via-[#0E0D12]/80 to-[#0E0D12]" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center lg:text-left grid lg:grid-cols-5 gap-12 items-center">
          
          <div className="lg:col-span-3">
            {/* Badge de Inscrição */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-[11px] font-bold tracking-widest uppercase text-amber-400 mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
              <Sparkles size={12} className="text-amber-400" />
              Vagas Limitadas
            </div>

            <p className="font-['Syne',sans-serif] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-amber-500/70 mb-2">
              Conferência de Jovens 2026
            </p>

            <h1 className="font-['Syne',sans-serif] text-[clamp(44px,8vw,80px)] font-black leading-[0.95] tracking-tight mb-6">
              <span className="block text-zinc-100">VIBRAÇÃO</span>
              <span className="block text-transparent [-webkit-text-stroke:1px_rgba(251,191,36,0.5)]">
                JOVEM
              </span>
              <span className="block text-amber-500">2026</span>
            </h1>

            <p className="text-base lg:text-lg text-zinc-400 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
              Um lugar de adoração profunda, palavra transformadora e comunhão real. Você foi chamado para incendiar a sua geração.
            </p>

            {/* Informações Principais */}
            <div className="flex gap-3 justify-center lg:justify-start flex-wrap mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm font-medium backdrop-blur-md text-zinc-300">
                <Calendar size={14} className="text-amber-400" />
                13 de Setembro de 2026
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm font-medium backdrop-blur-md text-zinc-300">
                <MapPin size={14} className="text-amber-400" />
                União da Vitória — PR
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => alert("Redirecionar para o fluxo de inscrição")}
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-zinc-950 font-['Syne',sans-serif] text-base font-extrabold rounded-xl transition-all shadow-[0_4px_20px_rgba(245,158,11,0.2)] cursor-pointer"
              >
                Garantir minha vaga
              </button>
              <button
                onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-zinc-900 border border-zinc-700 text-zinc-300 font-['Syne',sans-serif] text-base font-bold rounded-xl transition-all cursor-pointer"
              >
                Deixar sugestão / testemunho
              </button>
            </div>
          </div>

          {/* Mini Card Informativo na Direita (Visual Pro) */}
          <div className="hidden lg:block lg:col-span-2 bg-[#16141A]/80 border border-zinc-800 backdrop-blur-md p-6 rounded-2xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400"><Music size={20} /></div>
              <div>
                <h4 className="font-bold text-zinc-200">Louvor & Entrega</h4>
                <p className="text-xs text-zinc-400 mt-1">Ministrações focadas em criar um ambiente de adoração verdadeira.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400"><Flame size={20} /></div>
              <div>
                <h4 className="font-bold text-zinc-200">Palavra & Avivamento</h4>
                <p className="text-xs text-zinc-400 mt-1">Mensagens bíblicas direcionadas aos desafios da juventude atual.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400"><Users size={20} /></div>
              <div>
                <h4 className="font-bold text-zinc-200">Novas Amizades</h4>
                <p className="text-xs text-zinc-400 mt-1">Espaço dedicado para dinâmicas, lanches e muita comunhão.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. COUNTDOWN ───────────────────────────────────────────────────── */}
      <div className="bg-[#121116] border-y border-zinc-900 px-5 py-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 text-center mb-6">
            Tempo para o início do nosso encontro
          </p>
          <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto">
            <CountdownBox value={countdown.days} label="dias" />
            <CountdownBox value={countdown.hours} label="horas" />
            <CountdownBox value={countdown.minutes} label="min" />
            <CountdownBox value={countdown.seconds} label="seg" />
          </div>
        </div>
      </div>

      {/* ── 3. GALLERY ─────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-zinc-100 leading-tight">
            O que vivemos juntos
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Um vislumbre do mover e da nossa atmosfera de comunhão.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="relative rounded-2xl overflow-hidden border border-zinc-800 group aspect-square bg-zinc-900"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 bg-[#0E0D12]/90 border border-zinc-800 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-amber-400">
                {photo.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#121116] border-y border-zinc-900">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Vidas Transformadas
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              Relatos reais de jovens que tiveram suas trajetórias marcadas nas edições anteriores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FORM ────────────────────────────────────────────────────────── */}
      <section id="form-section" className="py-20 max-w-xl mx-auto px-5">
        <div className="mb-10 text-center">
          <h2 className="font-['Syne',sans-serif] text-3xl font-extrabold text-zinc-100">
            Fale com a Organização
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Quer dar uma ideia ou contar o que Deus fez na sua vida? Escolha abaixo.
          </p>
        </div>

        {success ? (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 text-center" role="status">
            <CheckCircle size={40} className="text-emerald-400 mx-auto mb-4" />
            <h3 className="font-['Syne',sans-serif] text-xl font-bold text-zinc-100 mb-2">
              Mensagem enviada!
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Obrigado por nos ajudar a construir uma conferência abençoada. Nossa equipe de liderança já recebeu seu contato!
            </p>
            <button
              className="text-sm font-semibold text-amber-400 underline underline-offset-4 bg-transparent cursor-pointer hover:text-amber-300 transition-colors"
              onClick={() => setSuccess(false)}
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Abas Alternadoras com UX Clean */}
            <div className="grid grid-cols-2 bg-[#16141A] border border-zinc-800 rounded-xl p-1 gap-1" role="tablist">
              {(["sugestao", "testemunho"] as FormTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-amber-500 text-zinc-950 shadow-md"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab === "sugestao" ? "Dar Sugestão" : "Enviar Testemunho"}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500" htmlFor="f-name">
                  Seu nome completo
                </label>
                <input
                  id="f-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Mateus Oliveira"
                  className={inputCls}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500" htmlFor="f-email">
                  Seu melhor e-mail
                </label>
                <input
                  id="f-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className={inputCls}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500" htmlFor="f-msg">
                  {activeTab === "sugestao" ? "Sua sugestão ou ideia para o evento" : "Seu testemunho"}
                </label>
                <textarea
                  id="f-msg"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    activeTab === "sugestao"
                      ? "Que banda, preletor ou dinâmica você gostaria de ver aqui?"
                      : "Compartilhe conosco o impacto espiritual que você recebeu..."
                  }
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-['Syne',sans-serif] text-base font-extrabold rounded-xl transition-all cursor-pointer shadow-md"
            >
              {loading ? (
                "Processando..."
              ) : (
                <>
                  <Send size={16} />
                  Enviar {activeTab === "sugestao" ? "Ideia" : "Testemunho"}
                </>
              )}
            </button>
          </form>
        )}
      </section>

      {/* ── 6. FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 text-center border-t border-zinc-900 px-5 bg-[#121116]">
        <div className="font-['Syne',sans-serif] text-base font-extrabold text-zinc-200 tracking-widest uppercase">
          VIBRAÇÃO JOVEM 2026
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          Uma igreja viva para uma geração sedenta. · União da Vitória — PR
        </p>
        <Heart
          size={16}
          className="mx-auto my-4 text-amber-500 animate-pulse stroke-[2.5]"
          aria-hidden="true"
        />
        <p className="text-[11px] text-zinc-600">
          © 2026 Vibração Jovem. Servindo ao Reino com excelência.
        </p>
      </footer>
    </div>
  );
}