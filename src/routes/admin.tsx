import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Categoria = {
    id: number;
    name: string;
};

type GaleriaItem = {
    id: number;
    image_url: string;
    title: string;
    order: number | null;
    active: boolean;
    fk_category: number;
    gallery_categories: {
        id: number;
        name: string;
    } | null;
};

export const Route = createFileRoute("/admin")({
    component: Admin,
});

function Admin() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [galeria, setGaleria] = useState<GaleriaItem[]>([]);

    const [imagem, setImagem] = useState<File | null>(null);
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [categoriaOpen, setCategoriaOpen] = useState(false);
    const [novaCategoria, setNovaCategoria] = useState("");
    const [adicionandoCategoria, setAdicionandoCategoria] = useState(false);
    const [salvandoCategoria, setSalvandoCategoria] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const navigate = useNavigate();
    const [authChecking, setAuthChecking] = useState(true);

    const invalidForm =
        !imagem ||
        !titulo.trim() ||
        !categoria;

    useEffect(() => {
        async function verificarAuth() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                await navigate({
                    to: "/login",
                });

                return;
            }

            setAuthChecking(false);
        }

        verificarAuth();
    }, [navigate]);

    async function carregarCategorias() {
        const { data, error } = await supabase
            .from("gallery_categories")
            .select("id, name")
            .order("name", { ascending: true });

        if (error) {
            console.error("Erro ao carregar categorias:", error);
            return;
        }

        setCategorias(data ?? []);
    }

    async function carregarGaleria() {
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
            .order("order", { ascending: true });

        if (error) {
            console.error("Erro ao carregar galeria:", error);
            return;
        }

        setGaleria(data as any ?? []);
    }

    useEffect(() => {
        carregarCategorias();
        carregarGaleria();
    }, []);

    async function adicionarCategoria() {
        const nome = novaCategoria.trim();

        if (!nome) return;

        setSalvandoCategoria(true);

        try {
            const { data, error } = await supabase
                .from("gallery_categories")
                .insert({
                    name: nome,
                })
                .select("id, name")
                .single();

            if (error) {
                throw error;
            }

            // Adiciona imediatamente na lista
            setCategorias((prev) =>
                [...prev, data].sort((a, b) =>
                    a.name.localeCompare(b.name),
                ),
            );

            // Seleciona automaticamente a nova categoria
            setCategoria(String(data.id));

            setNovaCategoria("");
            setAdicionandoCategoria(false);
            setCategoriaOpen(false);
        } catch (error) {
            console.error("Erro ao adicionar categoria:", error);
            setMensagem("Erro ao adicionar categoria.");
        } finally {
            setSalvandoCategoria(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!imagem || !titulo.trim() || !categoria) {
            setMensagem("Preencha todos os campos.");
            return;
        }

        setLoading(true);
        setMensagem("");

        try {
            const extension =
                imagem.name.split(".").pop()?.toLowerCase() || "jpg";

            const filename = `${crypto.randomUUID()}.${extension}`;
            const path = `gallery/${filename}`;

            // Upload da imagem
            const { error: uploadError } = await supabase.storage
                .from("icons")
                .upload(path, imagem, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) {
                throw uploadError;
            }

            // URL pública
            const { data: urlData } = supabase.storage
                .from("icons")
                .getPublicUrl(path);

            // Cadastro no banco
            const { error: insertError } = await supabase
                .from("gallery")
                .insert({
                    image_url: urlData.publicUrl,
                    title: titulo.trim(),
                    order: Number(null),
                    active: true,
                    fk_category: Number(categoria),
                });

            if (insertError) {
                throw insertError;
            }

            setMensagem("Imagem adicionada com sucesso!");

            setImagem(null);
            setTitulo("");
            setCategoria("");
            setCategoriaOpen(false);

            const input = document.getElementById(
                "imagem",
            ) as HTMLInputElement | null;

            if (input) {
                input.value = "";
            }

            // Atualiza a lista
            await carregarGaleria();
        } catch (error) {
            console.error(error);
            setMensagem("Erro ao adicionar imagem.");
        } finally {
            setLoading(false);
        }
    }

    if (authChecking) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-background">
                <p className="text-sm text-muted-foreground">
                    Verificando acesso...
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background px-6 py-12">
            <div className="mx-auto max-w-xl">
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        Administração
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold">
                        Adicionar imagem
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border border-hairline p-6"
                >
                    {/* Imagem */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Imagem
                        </label>

                        <label
                            htmlFor="imagem"
                            className="group flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-hairline bg-background transition-colors hover:bg-white/5"
                        >
                            {imagem ? (
                                <div className="relative w-full">
                                    <img
                                        src={URL.createObjectURL(imagem)}
                                        alt="Preview"
                                        className="max-h-80 w-full object-contain"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 bg-black/60 px-4 py-3">
                                        <p className="truncate text-sm text-white">
                                            {imagem.name}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center px-6 py-12 text-center">
                                    <svg
                                        className="mb-4 h-8 w-8 text-muted-foreground"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <path
                                            d="M12 16V4m0 0L7 9m5-5 5 5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M5 20h14"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    <p className="text-sm font-medium">
                                        Clique para selecionar uma imagem
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        JPG, PNG, WEBP ou AVIF
                                    </p>
                                </div>
                            )}

                            <input
                                id="imagem"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/avif"
                                onChange={(e) =>
                                    setImagem(e.target.files?.[0] ?? null)
                                }
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Título */}
                    <div>
                        <label
                            htmlFor="titulo"
                            className="mb-2 block text-sm font-medium"
                        >
                            Título
                        </label>

                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ex.: Coroas em emax"
                            className="w-full rounded-lg border border-hairline bg-transparent px-4 py-3 outline-none"
                        />
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Categoria
                        </label>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setCategoriaOpen((open) => !open)
                                }
                                className="flex w-full items-center justify-between rounded-2xl border border-hairline bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors hover:bg-white/5 focus:border-accent"
                            >
                                <span
                                    className={
                                        categoria
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    }
                                >
                                    {categorias.find(
                                        (item) =>
                                            String(item.id) === categoria,
                                    )?.name ?? "Selecione uma categoria"}
                                </span>

                                <svg
                                    className={`h-4 w-4 text-muted-foreground transition-transform ${categoriaOpen ? "rotate-180" : ""
                                        }`}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        d="m6 8 4 4 4-4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {categoriaOpen && (
                                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-hairline bg-background p-1 shadow-xl">
                                    {!adicionandoCategoria ? (
                                        <>
                                            {/* Adicionar categoria */}
                                            <button
                                                type="button"
                                                onClick={() => setAdicionandoCategoria(true)}
                                                className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                                            >
                                                <span className="text-lg leading-none">+</span>
                                                Adicionar categoria
                                            </button>

                                            <div className="my-1 border-t border-hairline" />

                                            {/* Categorias */}
                                            {categorias.map((item) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setCategoria(String(item.id));
                                                        setCategoriaOpen(false);
                                                    }}
                                                    className="w-full rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-white/10"
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="p-2">
                                            <input
                                                autoFocus
                                                type="text"
                                                value={novaCategoria}
                                                onChange={(e) =>
                                                    setNovaCategoria(e.target.value)
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        adicionarCategoria();
                                                    }

                                                    if (e.key === "Escape") {
                                                        setAdicionandoCategoria(false);
                                                        setNovaCategoria("");
                                                    }
                                                }}
                                                placeholder="Nome da categoria"
                                                className="w-full rounded-xl border border-hairline bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
                                            />

                                            <div className="mt-2 flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setAdicionandoCategoria(false);
                                                        setNovaCategoria("");
                                                    }}
                                                    className="flex-1 rounded-xl px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                                                >
                                                    Cancelar
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={
                                                        salvandoCategoria ||
                                                        !novaCategoria.trim()
                                                    }
                                                    onClick={adicionarCategoria}
                                                    className="flex-1 rounded-xl bg-[#E3E3E3] px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-[#CCCCCC] disabled:cursor-not-allowed disabled:bg-accent disabled:opacity-50"
                                                >
                                                    {salvandoCategoria
                                                        ? "Salvando..."
                                                        : "Adicionar"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {mensagem && (
                        <p className="text-sm text-muted-foreground">
                            {mensagem}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || invalidForm}
                        className="w-full cursor-pointer rounded-lg bg-[#E3E3E3] px-4 py-3 font-medium text-black transition-colors hover:bg-[#CCCCCC] disabled:cursor-not-allowed disabled:bg-accent disabled:opacity-50"
                    >
                        {loading ? "Enviando..." : "Adicionar imagem"}
                    </button>
                </form>

                {/* Galeria existente */}
                <div className="mt-12">
                    <div className="mb-6">
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            Galeria
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold">
                            Imagens cadastradas
                        </h2>
                    </div>

                    {galeria.length === 0 ? (
                        <div className="rounded-2xl border border-hairline p-6 text-sm text-muted-foreground">
                            Nenhuma imagem cadastrada.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {galeria.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 rounded-2xl border border-hairline p-3"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-medium">
                                            {item.title}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {item.gallery_categories?.name ??
                                                "Sem categoria"}
                                        </p>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs ${item.active
                                            ? "bg-white/10 text-foreground"
                                            : "bg-white/5 text-muted-foreground"
                                            }`}
                                    >
                                        {item.active
                                            ? "Ativo"
                                            : "Inativo"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}