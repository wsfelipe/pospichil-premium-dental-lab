import { supabase } from "@/lib/supabase";

export type GaleriaItem = {
  src: string;
  categoria: string;
  titulo: string;
  filename: string;
};

export async function getGaleriaItems(): Promise<GaleriaItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select(`
      id,
      image_url,
      title,
      order,
      active
    `)
    .eq("active", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("Erro ao buscar galeria:", error);
    return [];
  }

  console.log("GALERIA DATA:", data);
  console.log("GALERIA ERROR:", error);

  return data.map((item) => ({
    src: item.image_url,
    categoria: "",
    titulo: item.title,
    filename: item.image_url.split("/").pop() ?? String(item.id),
  }));
}