import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Layers,
  Shield,
  Clock,
  Headset,
  Award,
  Cpu,
  ScanLine,
  Printer,
  Wrench,
  ChevronDown,
  Check,
  Quote,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFAB } from "@/components/site/WhatsAppFAB";
import { Section, SectionHeading } from "@/components/site/Section";
import { FadeUp } from "@/components/site/FadeUp";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { galeriaItems, galeriaCategorias } from "@/lib/galeria";

const SITE_TITLE = "Laboratório Pospichil — Prótese Odontológica em Taquara/RS";
const SITE_DESC =
  "Há 26 anos produzindo próteses dentárias com precisão artesanal e tecnologia digital. Parceiro confiável de cirurgiões-dentistas e clínicas em todo o Rio Grande do Sul.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: "Laboratório Pospichil",
          description: SITE_DESC,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Gáspar Martins, 984",
            addressLocality: "Taquara",
            addressRegion: "RS",
            addressCountry: "BR",
          },
          telephone: "+55-51-98444-9117",
          areaServed: "RS",
          foundingDate: "1999",
          sameAs: ["https://www.instagram.com/laboratoriopospichil"],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Sobre />
        <Servicos />
        <Diferenciais />
        <Tecnologias />
        <Galeria />
        <Depoimentos />
        <FAQ />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFAB />
      <Toaster />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate flex min-h-[100svh] items-center pt-32 pb-24 grain">
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 0%, oklch(0.78 0.025 85 / 0.10), transparent 70%), radial-gradient(700px 400px at 80% 90%, oklch(0.86 0.012 90 / 0.06), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.15), transparent)" }}
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-hairline px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Desde 1999 · Taquara/RS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="max-w-4xl font-serif text-5xl leading-[1.05] text-balance md:text-7xl lg:text-[5.5rem]"
        >
          Próteses dentárias com{" "}
          <span className="italic text-accent">26 anos</span> de precisão
          artesanal e tecnologia digital.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Parceiro de cirurgiões-dentistas e clínicas que buscam excelência técnica,
          previsibilidade de prazos e comunicação direta — caso a caso, peça a peça.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="https://wa.me/5551984449117"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            Fale no WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contato"
            className="group inline-flex items-center gap-3 rounded-full border border-hairline px-7 py-4 text-sm text-foreground transition-all hover:border-accent hover:bg-accent/5"
          >
            Solicitar orçamento
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para próxima seção"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/60 transition-colors hover:text-accent"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const items = [
    { value: "26", label: "Anos de atuação" },
    { value: "+500", label: "Dentistas parceiros" },
    { value: "100k+", label: "Peças entregues" },
    { value: "RS", label: "Atendimento em todo o estado" },
  ];
  return (
    <section className="border-y border-hairline bg-[oklch(0.11_0.003_270)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.label}
            className="bg-background px-6 py-10 text-center md:px-10 md:py-14"
          >
            <p className="font-serif text-4xl text-foreground md:text-5xl">{it.value}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {it.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SOBRE ---------------- */
function Sobre() {
  return (
    <Section id="sobre">
      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Sobre o laboratório"
            title={
              <>
                Onde o ofício analógico encontra a{" "}
                <span className="italic text-accent">precisão digital</span>.
              </>
            }
          />
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Desde 1999, o Laboratório Pospichil é referência em prótese odontológica
              no Vale do Paranhana. Em quase três décadas, construímos uma reputação
              firme: trabalho rigoroso, prazos cumpridos e um relacionamento próximo
              com cada profissional que confia em nós.
            </p>
            <p>
              Combinamos o que há de melhor em duas eras. A sensibilidade do trabalho
              manual, refinada por gerações de protéticos, somada à exatidão dos
              fluxos digitais — escaneamento, CAD/CAM, fresagem e impressão 3D — para
              entregar peças que se ajustam com fidelidade e duram.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Atendimento direto entre técnico e dentista",
                "Fluxo híbrido: analógico + digital",
                "Materiais e cerâmicas de alta performance",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm md:text-base">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

/* ---------------- SERVIÇOS ---------------- */
const SERVICOS = [
  { icon: Layers, title: "Próteses totais", desc: "Reabilitação completa com estética natural e adaptação confortável." },
  { icon: Layers, title: "Próteses parciais removíveis", desc: "PPR em estruturas metálicas e flexíveis, ajustadas caso a caso." },
  { icon: Sparkles, title: "Próteses protocolo", desc: "Acrílico e cerâmica sobre implantes, com encaixe preciso e acabamento refinado." },
  { icon: Shield, title: "Placas de bruxismo", desc: "Placas rígidas e miorrelaxantes sob medida para proteção e conforto." },
  { icon: Award, title: "Coroas e pontes fixas", desc: "Unitárias e múltiplas, sobre dente ou implante, em zircônia e dissilicato." },
  { icon: Sparkles, title: "Facetas e lentes", desc: "Estética minimamente invasiva com cerâmica de alta translucidez." },
  { icon: Wrench, title: "Inlay e onlay", desc: "Restaurações indiretas duráveis com excelente integração marginal." },
];

function Servicos() {
  return (
    <Section id="servicos" className="border-t border-hairline">
      <FadeUp>
        <SectionHeading
          eyebrow="Serviços"
          title={
            <>
              Um portfólio completo, executado com{" "}
              <span className="italic text-accent">rigor</span>.
            </>
          }
          description="Da reabilitação total à estética minimamente invasiva — soluções desenhadas para cada plano de tratamento."
        />
      </FadeUp>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {SERVICOS.map((s, i) => (
          <FadeUp key={s.title} delay={i * 0.05}>
            <article className="group relative h-full bg-card p-8 transition-colors duration-500 hover:bg-secondary">
              <div className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-accent/10">
                <s.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </article>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- DIFERENCIAIS ---------------- */
const DIFERENCIAIS = [
  { icon: Award, title: "Precisão obsessiva", desc: "Cada peça é verificada sob critérios rígidos antes de sair do laboratório." },
  { icon: Clock, title: "Prazos cumpridos", desc: "Compromisso com a agenda da sua clínica — sem surpresas, sem retrabalho." },
  { icon: Headset, title: "Comunicação direta", desc: "Conversa caso a caso entre dentista e técnico, sem intermediários." },
  { icon: Sparkles, title: "Materiais premium", desc: "Cerâmicas, zircônia e ligas selecionadas das principais marcas globais." },
  { icon: Shield, title: "Garantia e acompanhamento", desc: "Suporte pós-instalação e revisão de casos sempre que necessário." },
  { icon: Layers, title: "Fluxo híbrido", desc: "Liberdade para receber moldagens convencionais ou arquivos digitais." },
];

function Diferenciais() {
  return (
    <Section id="diferenciais" className="border-t border-hairline">
      <div className="grid gap-14 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Diferenciais"
            title={
              <>
                O que sustenta{" "}
                <span className="italic text-accent">26 anos</span> de parcerias.
              </>
            }
          />
        </FadeUp>

        <div className="grid gap-px overflow-hidden bg-hairline sm:grid-cols-2">
          {DIFERENCIAIS.map((d, i) => (
            <FadeUp key={d.title} delay={i * 0.05}>
              <div className="h-full bg-background p-7">
                <d.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <h3 className="mt-6 font-serif text-xl text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- TECNOLOGIAS ---------------- */
const TECH = [
  { icon: ScanLine, title: "Scanner de bancada", desc: "Digitalização de alta resolução para fluxos CAD/CAM." },
  { icon: Cpu, title: "CAD/CAM", desc: "Modelagem digital precisa de coroas, pontes e protocolos." },
  { icon: Printer, title: "Impressão 3D", desc: "Modelos, guias e provisórios com fidelidade dimensional." },
  { icon: Wrench, title: "Fresagem", desc: "Usinagem de zircônia, dissilicato e resinas técnicas." },
];

function Tecnologias() {
  return (
    <Section id="tecnologias" className="border-t border-hairline">
      <FadeUp>
        <SectionHeading
          eyebrow="Tecnologias"
          title={
            <>
              Um parque tecnológico a serviço do seu{" "}
              <span className="italic text-accent">fluxo clínico</span>.
            </>
          }
          description="Recebemos moldagens convencionais e arquivos STL/PLY dos principais scanners intraorais do mercado."
        />
      </FadeUp>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TECH.map((t, i) => (
          <FadeUp key={t.title} delay={i * 0.05}>
            <div className="group h-full rounded-2xl border border-hairline bg-card p-7 transition-all duration-500 hover:border-accent/40 hover:bg-secondary">
              <t.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-xl text-foreground">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- GALERIA ---------------- */
const GALERIA_PLACEHOLDERS = [
  { ratio: "aspect-[4/5]", label: "Bancada" },
  { ratio: "aspect-square", label: "Cerâmica" },
  { ratio: "aspect-[4/3]", label: "Equipe" },
  { ratio: "aspect-[3/4]", label: "Coroa zircônia" },
  { ratio: "aspect-[4/3]", label: "Scanner" },
  { ratio: "aspect-square", label: "Protocolo" },
  { ratio: "aspect-[4/5]", label: "Acabamento" },
  { ratio: "aspect-[4/3]", label: "Laboratório" },
];

function Galeria() {
  const temImagens = galeriaItems.length > 0;
  const [filtro, setFiltro] = useState<string>("Todas");
  const filtradas =
    filtro === "Todas"
      ? galeriaItems
      : galeriaItems.filter((i) => i.categoria === filtro);

  return (
    <Section id="galeria" className="border-t border-hairline">
      <FadeUp>
        <SectionHeading
          eyebrow="Galeria"
          title={
            <>
              Um olhar sobre o{" "}
              <span className="italic text-accent">trabalho</span> e a casa.
            </>
          }
          description={
            temImagens
              ? "Espaço, equipe, equipamentos e peças entregues."
              : "Espaço, equipe, equipamentos e peças entregues. (Imagens reais em breve.)"
          }
        />
      </FadeUp>

      {temImagens && galeriaCategorias.length > 1 && (
        <FadeUp delay={0.05}>
          <div className="mt-12 flex flex-wrap gap-2">
            {["Todas", ...galeriaCategorias].map((cat) => {
              const ativa = cat === filtro;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFiltro(cat)}
                  className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] transition-all ${
                    ativa
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-hairline text-muted-foreground hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeUp>
      )}

      {temImagens ? (
        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
          {filtradas.map((g, i) => (
            <FadeUp key={g.filename} delay={(i % 4) * 0.05} className="mb-4 break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-xl border border-hairline">
                <img
                  src={g.src}
                  alt={`${g.categoria} — ${g.titulo}`}
                  loading="lazy"
                  className="block w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-accent">
                      {g.categoria}
                    </p>
                    <p className="mt-1 font-serif text-base text-foreground">
                      {g.titulo}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      ) : (
        <div className="mt-16 columns-2 gap-4 md:columns-3 lg:columns-4">
          {GALERIA_PLACEHOLDERS.map((g, i) => (
          <FadeUp key={i} delay={(i % 4) * 0.05} className={`mb-4 break-inside-avoid`}>
            <div
              className={`group relative overflow-hidden rounded-xl border border-hairline ${g.ratio}`}
              data-lov-image-placeholder
              aria-label={`Placeholder — ${g.label}`}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.22 0.003 270), oklch(0.16 0.003 270) 60%, oklch(0.18 0.005 80))",
                }}
              />
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, oklch(0.78 0.025 85 / 0.4), transparent 60%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {g.label}
                </span>
              </div>
            </div>
          </FadeUp>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ---------------- DEPOIMENTOS ---------------- */
const DEPOIMENTOS = [
  { name: "Dr. — Espaço reservado", role: "Cirurgião-dentista · Em breve", quote: "Espaço preparado para depoimentos reais de dentistas e clínicas parceiras." },
  { name: "Dra. — Espaço reservado", role: "Reabilitação oral · Em breve", quote: "Compartilhe sua experiência com o Laboratório Pospichil — entraremos em contato." },
  { name: "Clínica — Espaço reservado", role: "Parceira · Em breve", quote: "Adicionaremos aqui os relatos das clínicas que confiam em nosso trabalho." },
];

function Depoimentos() {
  return (
    <Section id="depoimentos" className="border-t border-hairline">
      <FadeUp>
        <SectionHeading
          eyebrow="Depoimentos"
          title={
            <>
              O que dizem os profissionais que confiam em{" "}
              <span className="italic text-accent">nosso trabalho</span>.
            </>
          }
        />
      </FadeUp>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {DEPOIMENTOS.map((d, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-hairline bg-card p-8">
              <Quote className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <blockquote className="mt-6 flex-1 font-serif text-lg leading-relaxed text-foreground">
                "{d.quote}"
              </blockquote>
              <figcaption className="mt-8 border-t border-hairline pt-5">
                <p className="text-sm text-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.role}</p>
              </figcaption>
            </figure>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "Qual o prazo médio de entrega?", a: "Os prazos variam conforme o tipo de trabalho: próteses totais e PPRs em torno de 7 a 12 dias úteis, coroas e pontes em 5 a 8 dias, e placas de bruxismo em até 5 dias úteis. Cada caso é alinhado individualmente." },
  { q: "Vocês atendem fora de Taquara?", a: "Sim. Atendemos cirurgiões-dentistas e clínicas em todo o Rio Grande do Sul, com logística de coleta e entrega organizada e suporte digital para envio de arquivos." },
  { q: "Recebem arquivos digitais (STL)?", a: "Sim. Trabalhamos com os principais scanners intraorais do mercado e aceitamos arquivos STL, PLY e OBJ para todo o fluxo CAD/CAM." },
  { q: "Quais materiais utilizam?", a: "Trabalhamos com zircônia (multilayer e monolítica), dissilicato de lítio, cerâmicas feldspáticas, resinas técnicas e ligas selecionadas das principais marcas internacionais." },
  { q: "Como funciona a comunicação durante o caso?", a: "Cada caso tem comunicação direta entre dentista e técnico responsável, via WhatsApp, telefone ou e-mail. Sem intermediários." },
  { q: "Oferecem garantia nos trabalhos?", a: "Sim. Todas as peças têm garantia conforme o tipo de trabalho e material utilizado, com acompanhamento pós-instalação." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="border-t border-hairline">
      <FadeUp>
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Respostas diretas para sua clínica."
          align="center"
          className="mx-auto"
        />
      </FadeUp>

      <div className="mx-auto mt-16 max-w-3xl">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <FadeUp key={i} delay={i * 0.04}>
              <div className="border-b border-hairline">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg text-foreground md:text-xl">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- CONTATO ---------------- */
function Contato() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Mensagem enviada", {
      description: "Em breve retornaremos seu contato.",
    });
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <Section id="contato" className="border-t border-hairline">
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Contato"
            title={
              <>
                Vamos conversar sobre seu{" "}
                <span className="italic text-accent">próximo caso</span>.
              </>
            }
            description="Atendimento direto para cirurgiões-dentistas e clínicas. Resposta em horário comercial."
          />

          <div className="mt-10 space-y-5 text-sm">
            <a
              href="https://wa.me/5551984449117"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-foreground transition-colors hover:text-accent"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-hairline">
                <MessageCircle className="h-4 w-4" />
              </span>
              (51) 98444-9117 · WhatsApp
            </a>
            <p className="text-muted-foreground">
              Rua Gáspar Martins, 984 — Centro · Taquara/RS
            </p>
            <p className="text-muted-foreground">@laboratoriopospichil</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-hairline bg-card p-8 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome" name="nome" required />
              <Field label="Clínica / CRO" name="clinica" />
              <Field label="E-mail" name="email" type="email" required />
              <Field label="Telefone" name="telefone" type="tel" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Mensagem
              </label>
              <textarea
                name="mensagem"
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-hairline bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                placeholder="Conte-nos sobre o caso, tipo de trabalho e prazo desejado."
              />
            </div>
            <button
              type="submit"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground"
            >
              Enviar mensagem
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </FadeUp>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-hairline bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
      />
    </div>
  );
}
