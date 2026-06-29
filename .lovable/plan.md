# Site institucional — Laboratório Pospichil

Site premium em dark mode, sofisticado (sem azul), com o logo enviado integrado no header e footer. Arquitetura preparada para crescer (Equipe, Tecnologias, Casos Clínicos).

## Direção visual

- **Paleta**: fundo preto absoluto (#0A0A0B) e camadas em ônix (#111114) / charcoal (#1A1A1D), textos em marfim quente (#F2EFE9) e cinza neutro (#9A9A9E), acento em prata/platina (#D4D4D8 → #8A8A90) combinando com o gradiente metálico do logo. Sem azul. Detalhes pontuais em champanhe muito sutil apenas se necessário em hover.
- **Tipografia**: serifada elegante para títulos (Cormorant Garamond ou Fraunces) + sans neutra para corpo (Inter ou Manrope). Labels em uppercase com tracking generoso.
- **Atmosfera**: muito respiro, divisores hairline, grão sutil no fundo, glow radial discreto atrás do hero, hover com brilho metálico suave.
- **Microanimações** (framer-motion): fade-up no scroll, parallax leve, underline animado, contagem dos números (26 anos), respeitando `prefers-reduced-motion`.

## Logo

- Upload integrado via `lovable-assets` a partir de `/mnt/user-uploads/image.png` → pointer em `src/assets/logo-pospichil.png.asset.json`.
- Componente `<Logo />` reutilizável, com variantes de tamanho para header (compacto, 40–48px de altura) e footer (maior, ~80px). Como o logo já é em fundo preto, encaixa direto sem retrabalho.

## Estrutura de seções (one-page)

1. **Header fixo preto** translúcido com blur, logo Pospichil à esquerda, navegação âncora (Sobre, Serviços, Diferenciais, Galeria, FAQ, Contato), CTA "Fale no WhatsApp".
2. **Hero** — headline impactante ("Próteses dentárias com 26 anos de precisão artesanal e tecnologia digital"), subcopy curta, CTAs WhatsApp + Contato, selo "Desde 1999 · Taquara/RS".
3. **Sobre** — trajetória de 26 anos, fusão analógico + digital, números-chave animados (anos, dentistas atendidos, peças entregues — placeholders).
4. **Serviços** — grid de 7 cards (totais, parciais removíveis, protocolo acrílico/cerâmica, placas de bruxismo, coroas e pontes sobre dente e implante, facetas/lentes, inlay/onlay) com ícone, descrição curta, hover elegante.
5. **Diferenciais** — 4–6 pilares (precisão, prazos, comunicação direta com o dentista, materiais premium, acompanhamento de caso, garantia).
6. **Tecnologias** — CAD/CAM, scanner, impressão 3D, fresagem, fluxo digital integrado ao analógico.
7. **Galeria** — masonry responsivo para fotos do laboratório, equipe, equipamentos e trabalhos (placeholders neutros, fáceis de trocar).
8. **Depoimentos** — carrossel preparado com 2–3 cards placeholder e instruções no código para incluir reais.
9. **FAQ** — accordion com 6–8 perguntas (prazos, retirada/envio, pagamento, garantia, fluxo digital, atendimento fora de Taquara).
10. **Contato** — formulário (nome, clínica/CRO, e-mail, telefone, mensagem) + bloco lateral com dados rápidos.
11. **Footer** — logo, endereço Rua Gáspar Martins, 984 - Centro, Taquara/RS, WhatsApp (51) 98444-9117, Instagram @laboratoriopospichil, mapa embed Google Maps, links rápidos, copyright.
12. **Botão flutuante WhatsApp** fixo no canto inferior direito, com tooltip, link `https://wa.me/5551984449117`.

## Detalhes técnicos

- **Stack**: TanStack Start (já configurado). Rota `/` one-page; estrutura preparada para `/equipe`, `/tecnologias`, `/casos`.
- **Componentes reutilizáveis**: `Section`, `SectionHeading`, `ServiceCard`, `DifferentialItem`, `FAQItem`, `WhatsAppFAB`, `Logo`, `FadeUp` (wrapper motion).
- **Tokens** em `src/styles.css` (`--bg`, `--surface`, `--ink`, `--ink-muted`, `--accent`, `--hairline`) em oklch.
- **Fontes** carregadas via `<link>` no `__root.tsx` (Google Fonts — Cormorant + Inter); sem `@import` em CSS.
- **SEO**: `head()` por rota com title/description/og em PT-BR, JSON-LD `Dentist`/`LocalBusiness` com endereço, telefone e geo de Taquara/RS. Canonical e og:url relativos.
- **Formulário**: validação Zod + toast de sucesso, pronto para integração futura com Lovable Cloud.
- **Imagens**: placeholders neutros em tons grafite com proporções definidas para troca fácil por fotos reais. Evita visual artificial de IA.
- **Responsivo**: grid colapsa para 1 coluna em mobile, header vira drawer, FAB sempre visível, tipografia fluida com `clamp()`.
- **Performance**: `loading="lazy"` em imagens, animações leves, somente framer-motion + lucide-react além do baseline.

## Entregáveis desta iteração

- Site one-page completo, dark e sofisticado, com todas as seções.
- Logo Pospichil real integrado no header e footer.
- Botão WhatsApp flutuante funcional com o número informado.
- Footer com endereço, Instagram e mapa embed reais.
- Estrutura de rotas pronta para páginas internas futuras.
