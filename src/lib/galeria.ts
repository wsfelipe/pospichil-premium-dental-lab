import { supabase } from "@/lib/supabase";

export type GaleriaItem = {
  src: string;
  categoria: string;
  titulo: string;
  filename: string;
  gallery_categories?: {
    id: number;
    name: string;
  }[];
};

export type GaleriaItems = {
  trabalho: GaleriaItem[];
  casa: GaleriaItem[];
};

export async function getGaleriaItems(): Promise<GaleriaItems> {
  const { data, error } = await supabase
    .from("gallery")
    .select(`
      id,
      image_url,
      title,
      order,
      active,
      fk_category,
      gallery_categories (
        id,
        name
      )
    `)
    .eq("active", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("Erro ao buscar galeria:", error);

    return {
      trabalho: [],
      casa: [],
    };
  }

  const items: GaleriaItem[] = data.map((item) => ({
    src: item.image_url,
    categoria: item.gallery_categories?.name || "",
    titulo: item.title,
    filename: item.image_url.split("/").pop() ?? String(item.id),
    gallery_categories: item.gallery_categories,
  }));

  return {
    trabalho: items.filter(
      (item) => item.categoria.toLowerCase() === "trabalho"
    ),
    casa: items.filter(
      (item) => item.categoria.toLowerCase() === "casa"
    ),
  };
}