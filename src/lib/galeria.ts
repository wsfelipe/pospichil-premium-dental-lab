// Carrega automaticamente todas as imagens em src/assets/galeria/.
// Convenção de nome do arquivo: `categoria__titulo-do-caso.ext`
// Ex.: `coroas__zirconia-superior-caso-1.jpg`

const modules = import.meta.glob(
  "/src/assets/galeria/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export type GaleriaItem = {
  src: string;
  categoria: string;
  titulo: string;
  filename: string;
};

function humanize(slug: string): string {
  const corrections: Record<string, string> = {
    protese: "prótese",
    proteses: "próteses",
    zirconia: "zircônia",
    ceramica: "cerâmica",
    estetica: "estética",
    acrilico: "acrílico",
    ceramicos: "cerâmicos",
  };

  const cleaned = slug
    .replace(/(?:[-_\s]?\d+)$/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .map((word) => corrections[word.toLowerCase()] ?? word)
    .join(" ");

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function parseFilename(path: string): GaleriaItem {
  const filename = path.split("/").pop() ?? path;
  const base = filename.replace(/\.[^.]+$/, "");
  const [rawCategoria, ...rest] = base.split("__");
  const rawTitulo = rest.join("__") || rawCategoria;
  return {
    src: modules[path],
    categoria: humanize(rawCategoria),
    titulo: humanize(rawTitulo),
    filename,
  };
}

export const galeriaItems: GaleriaItem[] = Object.keys(modules)
  .sort()
  .map(parseFilename);

export const galeriaCategorias: string[] = Array.from(
  new Set(galeriaItems.map((i) => i.categoria)),
);