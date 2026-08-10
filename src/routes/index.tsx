import { createFileRoute } from "@tanstack/react-router";
import whatsappIconBlack from "../assets/icons/whatsapp.png";
import whatsappIcon from "../assets/icons/whatsapp_white.webp";
import instagramIcon from "../assets/icons/instagram_white.webp";
import mapsIcon from "../assets/icons/maps.png";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Shield,
  Clock,
  Headset,
  Award,
  ChevronDown,
  Check,
  Quote,
} from "lucide-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFAB } from "@/components/site/WhatsAppFAB";
import { Section, SectionHeading } from "@/components/site/Section";
import { FadeUp } from "@/components/site/FadeUp";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { galeriaItems } from "@/lib/galeria";
import emailjs from "@emailjs/browser";

const SITE_TITLE = "Laboratório Pospichil - Prótese Odontológica em Taquara/RS";
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
        {/* <Tecnologias /> */}
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
          Experiência, tecnologia
          <br />
          e<span className="italic text-accent"> precisão </span>
          para elevar o padrão dos seus casos.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Parceiro de cirurgiões-dentistas e clínicas que buscam excelência técnica,
          previsibilidade de prazos e comunicação direta - caso a caso, peça a peça.
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
            <img
              src={whatsappIconBlack}
              alt="WhatsApp"
              className="h-5 w-5 object-contain"
            />
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
    { value: "+50", label: "Dentistas parceiros" },
    { value: "+20k", label: "Peças entregues" },
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
              Nossa essência está na combinação entre tradição e inovação.
              Valorizamos o cuidado artesanal em cada etapa do processo,
              incorporando recursos digitais para oferecer mais previsibilidade,
              qualidade e excelência em cada prótese confeccionada.
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
  { icon: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/icons/protese_total.png", title: "Próteses totais", desc: "Reabilitação completa com estética natural e adaptação confortável." },
  { icon: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/icons/proteses_parciais.png", title: "Próteses parciais removíveis", desc: "PPR em estruturas metálicas, ajustadas caso a caso." },
  { icon: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/icons/protocolo.png", title: "Próteses protocolo", desc: "Acrílico e cerâmica sobre implantes, com encaixe preciso e acabamento refinado." },
  { icon: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/icons/placa.png", title: "Placas de bruxismo", desc: "Placas rígidas e miorrelaxantes sob medida para proteção e conforto." },
  { icon: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/icons/coroa.png", title: "Coroas e pontes fixas", desc: "Unitárias e múltiplas, sobre dente ou implante, em zircônia e dissilicato." },
  { icon: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/icons/faceta.png", title: "Facetas e lentes", desc: "Estética minimamente invasiva com cerâmica de alta translucidez." },
  { icon: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/icons/inlay_onlay.png", title: "Inlay e onlay", desc: "Restaurações indiretas duráveis com excelente integração marginal." },
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
          description="Da reabilitação total à estética minimamente invasiva - soluções desenhadas para cada plano de tratamento."
        />
      </FadeUp>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICOS.map((s, i) => (
          <FadeUp key={s.title} delay={i * 0.05}>
            <div className="group h-full rounded-2xl border border-hairline bg-card p-7 transition-all duration-500 hover:border-accent/40 hover:bg-secondary cursor-pointer">
              <img
                src={s.icon}
                alt={s.title}
                className="h-8 w-8 object-contain"
                loading="lazy"
              />
              <h3 className="mt-6 font-serif text-xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- DIFERENCIAIS ---------------- */
const DIFERENCIAIS = [
  { icon: Award, title: "Precisão obsessiva", desc: "Cada peça é verificada sob critérios rígidos antes de sair do laboratório." },
  { icon: Clock, title: "Prazos cumpridos", desc: "Compromisso com a agenda da sua clínica - sem surpresas, sem retrabalho." },
  { icon: Headset, title: "Comunicação direta", desc: "Conversa caso a caso entre dentista e técnico, sem intermediários." },
  { icon: Sparkles, title: "Materiais premium", desc: "Cerâmicas selecionadas das principais marcas globais." },
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
                {DIFERENCIAIS.length - 1 === i ?
                  <>
                    <d.icon className="h-5 w-5 text-[#b3a04d]" strokeWidth={1.5} />
                    <h3 className="mt-6 font-serif text-xl text-[#E7D68C]">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#b3a04d]">{d.desc}</p>
                  </>
                  :
                  <>
                    <d.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    <h3 className="mt-6 font-serif text-xl text-foreground">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                  </>
                }
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Section>
  );
}

// /* ---------------- TECNOLOGIAS ---------------- */
// const TECH = [
//   { icon: Cpu, title: "CAD/CAM", desc: "Modelagem digital precisa de coroas, pontes e protocolos." },
//   { icon: Printer, title: "Impressão 3D", desc: "Modelos, guias e provisórios com fidelidade dimensional." },
// ];

// function Tecnologias() {
//   return (
//     <Section id="tecnologias" className="border-t border-hairline">
//       <FadeUp>
//         <SectionHeading
//           eyebrow="Tecnologias"
//           title={
//             <>
//               Um parque tecnológico a serviço do seu{" "}
//               <span className="italic text-accent">fluxo clínico</span>.
//             </>
//           }
//           description="Recebemos moldagens convencionais e arquivos STL/PLY dos principais scanners intraorais do mercado."
//         />
//       </FadeUp>

//       <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
//         {TECH.map((s, i) => (
//           <FadeUp key={s.title} delay={i * 0.05}>
//             <article className="group relative h-full bg-card p-8 transition-colors duration-500 hover:bg-secondary">
//               <div className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-accent/10">
//                 <s.icon className="h-5 w-5" strokeWidth={1.5} />
//               </div>
//               <h3 className="font-serif text-2xl text-foreground">{s.title}</h3>
//               <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
//               <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
//             </article>
//           </FadeUp>
//         ))}
//       </div>
//     </Section>
//   );
// }

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
  const filtradas = galeriaItems;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + filtradas.length) % filtradas.length,
    );
  const next = () =>
    setLightboxIndex((i) => (i === null ? i : (i + 1) % filtradas.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

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
        />
      </FadeUp>

      {filtradas.length > 0 ? (
        <>
          <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
            {filtradas.map((g, i) => (
              <FadeUp key={g.filename} delay={(i % 4) * 0.05} className="mb-4 break-inside-avoid">
                <figure className="group relative overflow-hidden rounded-xl border border-hairline">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="block w-full cursor-zoom-in"
                    aria-label={`Abrir imagem ${g.titulo}`}
                  >
                    <img
                      src={g.src}
                      alt={g.titulo}
                      loading="lazy"
                      className="block w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-4">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/90">
                      {g.categoria}
                    </span>
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>

          {lightboxIndex !== null && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Visualização da imagem"
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 animate-in fade-in duration-200"
              onClick={closeLightbox}
            >
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                aria-label="Fechar"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
              {filtradas.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    aria-label="Imagem anterior"
                    className="absolute left-3 md:left-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:bg-white/10"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    aria-label="Próxima imagem"
                    className="absolute right-3 md:right-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:bg-white/10"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              <figure
                className="relative max-h-[88vh] max-w-[92vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filtradas[lightboxIndex].src}
                  alt={filtradas[lightboxIndex].titulo}
                  className="block max-h-[88vh] max-w-[92vw] rounded-lg object-contain"
                />
                <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.22em] text-white/80">
                  {filtradas[lightboxIndex].categoria} · {lightboxIndex + 1}/{filtradas.length}
                </figcaption>
              </figure>
            </div>
          )}
        </>
      ) : temImagens ? (
        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
          {galeriaItems.map((g, i) => (
            <FadeUp key={g.filename} delay={(i % 4) * 0.05} className="mb-4 break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-xl border border-hairline">
                <img
                  src={g.src}
                  alt={g.titulo}
                  loading="lazy"
                  className="block w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
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
                aria-label={`Placeholder - ${g.label}`}
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
  {
    name: "Dr. Alexander Rama Quadros",
    quote: "Após quase 30 anos de parceria, fica difícil transcrever em poucas palavras o tamanho da Excelência do Laboratório Pospichil, uma Empresa séria, competente, sempre focada nos melhores resultados e preocupada com a qualidade dos trabalhos desenvolvidos pela sua equipe que, de uma forma ou de outra, tornam a vida das pessoas melhor. Agradeço ao José Carlos e ao Silvio, seus sócios fundadores e também aos demais colaboradores, toda a atenção e dedicação que sempre tiveram comigo e com a minha Clínica, desejando sempre muito sucesso!",
    photo: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/depoimentos/alexander_quadros.jpg",
    instagram: "https://www.instagram.com/odontologiaalexander?igsh=YTBvZWg4cGh6bXU=",
    whatsapp: "https://wa.me/5551997715001"
  },
  {
    name: "Dra. Laura Pédra",
    quote: "É sempre um prazer trabalhar com o Laboratório Pospichil. A confiança que tenho no trabalho deles reflete diretamente na qualidade que entrego aos meus pacientes.\nA excelência em cada detalhe, a adaptação impecável das peças e o comprometimento com a qualidade fazem toda a diferença. É uma satisfação poder contar com um laboratório que transmite tanta segurança e credibilidade. Parabéns pelo excelente trabalho!",
    photo: "https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/depoimentos/laura_pedra.jpg",
    instagram: "https://www.instagram.com/laurapedraodontologia?igsh=MXFka3B2MWxzN2xzaw==",
    whatsapp: "https://wa.me/5551994885335"
  },
];

function Depoimentos() {
  return (
    <Section
      id="depoimentos"
      className="border-t border-hairline"
      containerClassName="max-w-6xl"
    >
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

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {DEPOIMENTOS.map((d, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-hairline bg-card p-8">
              <Quote className="h-6 w-6 text-accent" strokeWidth={1.5} />

              <blockquote className="mt-6 flex-1 font-serif text-lg leading-relaxed text-foreground">
                "{d.quote}"
              </blockquote>

              <figcaption className="mt-8 border-t border-hairline pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={d.photo}
                      alt={d.name}
                      className="h-12 w-12 rounded-full border border-white/80 bg-white/10 p-0.5 object-cover backdrop-blur-sm"
                    />

                    <div>
                      <p className="text-sm font-medium text-foreground">{d.name}</p>
                    </div>
                  </div>

                  {(d.instagram || d.whatsapp) && (
                    <div className="flex items-center gap-2">
                      {d.instagram && (
                        <a
                          href={d.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white/10 transition-all duration-200 hover:bg-white/30"
                        >
                          <img
                            src="src/assets/icons/instagram_white.webp"
                            alt="Instagram"
                            className="block h-4 w-4 object-contain"
                          />
                        </a>
                      )}

                      {d.whatsapp && (
                        <a
                          href={d.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white/10 transition-all duration-200 hover:bg-white/30"
                        >
                          <img
                            src="src/assets/icons/whatsapp_white.webp"
                            alt="WhatsApp"
                            className="block h-4 w-4 object-contain"
                          />
                        </a>
                      )}
                    </div>
                  )}
                </div>
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
  {
    q: "Qual o prazo médio de entrega?", a: `Os prazos podem variar conforme o tipo de trabalho e a complexidade de cada caso. Em média, trabalhamos com os seguintes períodos:\n\n

- Coroas unitárias: 5 a 7 dias úteis.
- Pontes fixas com prova de metal: 7 a 10 dias úteis.
- Aplicação de cerâmica: 7 a 10 dias úteis.
- Próteses fixas em dissilicato de lítio (e.max): 7 a 10 dias úteis.
- Próteses em zircônia: prazo mínimo de 15 dias úteis.
- Placas de bruxismo em acrílico prensado: 5 a 7 dias úteis.

Já trabalhos como próteses parciais removíveis (PPRs), próteses totais e protocolos exigem etapas clínicas adicionais, como provas e ajustes, o que torna o prazo de confecção maior. Nesses casos, o tempo de entrega depende da realização dessas etapas em conjunto com o cirurgião-dentista.

Cada caso é planejado e alinhado individualmente para garantir um resultado preciso, funcional e estético, permitindo que os prazos sejam definidos de acordo com as necessidades específicas de cada tratamento.` },
  { q: "Vocês atendem fora de Taquara?", a: "Sim. Atendemos cirurgiões-dentistas e clínicas em todo o Rio Grande do Sul, com logística de coleta e entrega organizada e suporte digital para envio de arquivos." },
  { q: "Recebem arquivos digitais (STL)?", a: "Sim. Aceitamos arquivos STL, PLY e OBJ para todo o fluxo CAD/CAM." },
  { q: "Como funciona a comunicação durante o caso?", a: "Durante todo o desenvolvimento do caso, nossa equipe e o técnico responsável permanecem à disposição para esclarecer dúvidas, alinhar detalhes e acompanhar cada etapa do trabalho. O contato pode ser feito por WhatsApp, telefone ou e-mail, garantindo uma comunicação ágil e eficiente." },
];

function renderAnswer(text: string) {
  const lines = text.split("\n");

  const elements: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (list.length) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="list-disc space-y-2 pl-6"
        >
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (/^- /.test(trimmed)) {
      list.push(trimmed.replace(/^- /, ""));
    } else {
      flushList();
      elements.push(
        <p
          key={`p-${elements.length}`}
          className="leading-relaxed"
        >
          {trimmed}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-4">{elements}</div>;
}

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
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent cursor-pointer"
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
                    <div className="text-sm text-muted-foreground md:text-base">
                      {renderAnswer(f.a)}
                    </div>
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
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nome: data.get("nome")?.toString().trim(),
          clinica: data.get("clinica")?.toString().trim() || "Não informado",
          email: data.get("email")?.toString().trim(),
          telefone: data.get("telefone")?.toString().trim() || "Não informado",
          mensagem: data.get("mensagem")?.toString().trim(),
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      toast.success("Mensagem enviada!", {
        description: "Em breve retornaremos seu contato.",
      });

      form.reset();
    } catch (error) {
      console.error(error);

      toast.error("Erro ao enviar mensagem", {
        description: "Tente novamente mais tarde.",
      });
    }
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
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  className="h-5 w-5 object-contain"
                />
              </span>
              (51) 98444-9117 · WhatsApp
            </a>
            <a
              href="https://maps.app.goo.gl/Z666xp6zAdtMCYHg8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-foreground transition-colors hover:text-accent"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-hairline">
                <img
                  src={mapsIcon}
                  alt="Google Maps"
                  className="h-5 w-5 object-contain"
                />
              </span>
              Rua Gáspar Martins, 984 - Centro · Taquara/RS
            </a>
            <a
              href="https://www.instagram.com/laboratoriopospichil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-foreground transition-colors hover:text-accent"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border red border-hairline">
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="h-5 w-5 object-contain"
                />
              </span>
              Siga-nos no Instagram @laboratoriopospichil
            </a>
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
              className="group mt-7 inline-flex cursor-pointer items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground"
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
