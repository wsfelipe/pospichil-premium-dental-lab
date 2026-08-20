import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

import { SortableGalleryItem } from "./../components/ui/SortableGallery";


type Categoria = {
    id: number;
    name: string;
};

type GaleriaItem = {
    id: number;
    image_url: string;
    title: string;
    order: number | null;
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
    const [editandoId, setEditandoId] = useState<number | null>(null);

    const [galeriaOrdenada, setGaleriaOrdenada] = useState(galeria);
    const [salvandoOrdem, setSalvandoOrdem] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Trabalho");

    const navigate = useNavigate();
    const [authChecking, setAuthChecking] = useState(true);

    const invalidForm =
        !titulo.trim() ||
        (!editandoId && !imagem);

    const galeriaFiltrada = galeriaOrdenada.filter(
        (item) =>
            item.gallery_categories?.name.toLowerCase() ===
            categoriaSelecionada.toLowerCase(),
    );

    function resetFormulario() {
        setImagem(null);
        setTitulo("");
        setCategoria("");
        setCategoriaOpen(false);
        setEditandoId(null);

        const input = document.getElementById(
            "imagem",
        ) as HTMLInputElement | null;

        if (input) {
            input.value = "";
        }
    }

    function getStoragePathFromUrl(url: string) {
        if (!url) return null;

        const marker = "/storage/v1/object/public/icons/";
        const index = url.indexOf(marker);

        if (index === -1) {
            return null;
        }

        return decodeURIComponent(url.slice(index + marker.length));
    }

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }

        if (typeof error === "string") {
            return error;
        }

        if (error && typeof error === "object" && "message" in error) {
            return String((error as { message?: string }).message);
        }

        return "Erro desconhecido ao atualizar o registro.";
    }

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

    useEffect(() => {
        setGaleriaOrdenada(galeria);
    }, [galeria]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        setGaleriaOrdenada((items) => {
            const oldIndex = items.findIndex(
                (item) => item.id === active.id
            );

            const newIndex = items.findIndex(
                (item) => item.id === over.id
            );

            return arrayMove(items, oldIndex, newIndex);
        });
    }

    async function salvarOrdem() {
        try {
            setSalvandoOrdem(true);

            const updates = galeriaOrdenada.map((item, index) =>
                supabase
                    .from("gallery")
                    .update({ order: index })
                    .eq("id", item.id)
            );



            const results = await Promise.all(updates);

            const error = results.find((result) => result.error)?.error;

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error("Erro ao salvar ordem:", error);
        } finally {
            setSalvandoOrdem(false);
        }
    }

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

        console.log("DEBUG carregarGaleria -> rows:", data ?? []);
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
                .select("id, name");

            if (error) {
                throw error;
            }

            const categoriaCriada = Array.isArray(data) ? data[0] ?? null : data ?? null;

            if (!categoriaCriada) {
                throw new Error("Não foi possível criar a categoria.");
            }

            // Adiciona imediatamente na lista
            setCategorias((prev) =>
                [...prev, categoriaCriada].sort((a, b) =>
                    a.name.localeCompare(b.name),
                ),
            );

            // Seleciona automaticamente a nova categoria
            setCategoria(String(categoriaCriada.id));

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

        console.log("DEBUG handleSubmit -> início", {
            editandoId,
            titulo,
            categoria,
            imagem: imagem?.name ?? null,
            galeriaLength: galeria.length,
        });

        if (!titulo.trim() || (!editandoId && !imagem)) {
            console.log("DEBUG handleSubmit -> validação falhou", {
                tituloTrimmed: titulo.trim(),
                editandoId,
                hasImagem: !!imagem,
            });
            setMensagem("Preencha todos os campos.");
            return;
        }

        setLoading(true);
        setMensagem("");

        try {
            const itemAtual = galeria.find((item) => item.id === editandoId) ?? null;
            let proximaUrl = itemAtual?.image_url ?? "";

            console.log("DEBUG handleSubmit -> itemAtual", itemAtual);

            if (imagem) {
                const extension =
                    imagem.name.split(".").pop()?.toLowerCase() || "jpg";

                const filename = `${crypto.randomUUID()}.${extension}`;
                const path = `gallery/${filename}`;

                console.log("DEBUG upload -> path", { path, fileName: imagem.name, size: imagem.size });

                const { error: uploadError } = await supabase.storage
                    .from("icons")
                    .upload(path, imagem, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (uploadError) {
                    console.error("DEBUG upload error:", uploadError);
                    throw uploadError;
                }

                const { data: urlData } = supabase.storage
                    .from("icons")
                    .getPublicUrl(path);

                proximaUrl = urlData.publicUrl;
                console.log("DEBUG upload -> publicUrl", proximaUrl);

                if (itemAtual?.image_url) {
                    const oldPath = getStoragePathFromUrl(itemAtual.image_url);
                    console.log("DEBUG upload -> oldPath", { oldPath, imageUrl: itemAtual.image_url });

                    if (oldPath) {
                        await supabase.storage.from("icons").remove([oldPath]);
                    }
                }
            }

            if (editandoId) {
                const itemId = Number(editandoId);

                if (!Number.isFinite(itemId)) {
                    throw new Error(`ID inválido para edição: ${String(editandoId)}`);
                }

                const payload = {
                    image_url: proximaUrl,
                    title: titulo.trim(),
                    fk_category: Number(categoria) || null,
                };

                const { data, error: updateError } = await supabase
                    .from("gallery")
                    .update(payload)
                    .eq("id", itemId)
                    .select("id, title, image_url, fk_category");

                await supabase.auth.getUser();

                if (updateError) {
                    throw updateError;
                }

                const updatedRow = Array.isArray(data) ? data[0] ?? null : data ?? null;

                if (updatedRow) {
                    setGaleria((prev) =>
                        prev.map((item) =>
                            item.id === editandoId
                                ? {
                                    ...item,
                                    image_url: updatedRow.image_url ?? item.image_url,
                                    title: updatedRow.title ?? item.title,
                                    fk_category: updatedRow.fk_category ?? item.fk_category,
                                    gallery_categories: item.gallery_categories,
                                }
                                : item,
                        ),
                    );
                }

                setMensagem("Imagem atualizada com sucesso!");
            } else {
                const payload = {
                    image_url: proximaUrl || "",
                    title: titulo.trim(),
                    order: Number(null),
                    fk_category: Number(categoria) || null,
                };

                console.log("DEBUG insert -> payload", payload);

                const { data, error: insertError } = await supabase
                    .from("gallery")
                    .insert(payload)
                    .select();

                console.log("DEBUG insert -> result", { data, error: insertError });

                if (insertError) {
                    throw insertError;
                }

                const insertedRow = Array.isArray(data) ? data[0] ?? null : data ?? null;

                if (insertedRow) {
                    setGaleria((prev) => [
                        ...prev,
                        {
                            ...insertedRow,
                            gallery_categories: categorias.find(
                                (cat) => String(cat.id) === String(insertedRow.fk_category),
                            )
                                ? {
                                    id: Number(insertedRow.fk_category),
                                    name: categorias.find(
                                        (cat) => String(cat.id) === String(insertedRow.fk_category),
                                    )?.name ?? "",
                                }
                                : null,
                        },
                    ]);
                }

                setMensagem("Imagem adicionada com sucesso!");
            }

            resetFormulario();
            await carregarGaleria();
        } catch (error) {
            const mensagemErro = getErrorMessage(error);
            console.error("Erro no submit do admin:", error);
            setMensagem(
                editandoId
                    ? `Erro ao atualizar imagem: ${mensagemErro}`
                    : `Erro ao adicionar imagem: ${mensagemErro}`,
            );
        } finally {
            setLoading(false);
        }
    }

    async function excluirImagem(item: GaleriaItem) {
        const confirmar = window.confirm(
            `Deseja excluir a imagem "${item.title}"?`,
        );

        if (!confirmar) {
            return;
        }

        try {
            const path = getStoragePathFromUrl(item.image_url);

            if (path) {
                const { error: storageError } = await supabase.storage
                    .from("icons")
                    .remove([path]);

                if (storageError) {
                    console.error("Erro ao remover imagem do storage:", storageError);
                }
            }

            const { error } = await supabase
                .from("gallery")
                .delete()
                .eq("id", item.id);

            if (error) {
                throw error;
            }

            setMensagem("Imagem excluída com sucesso!");

            if (editandoId === item.id) {
                resetFormulario();
            }

            await carregarGaleria();
        } catch (error) {
            console.error("Erro ao excluir imagem:", error);
            setMensagem("Erro ao excluir imagem.");
        }
    }

    function prepararEdicao(item: GaleriaItem) {
        setEditandoId(item.id);
        setTitulo(item.title);
        setCategoria(item.fk_category ? String(item.fk_category) : "");
        setMensagem("");
        setImagem(null);
        setCategoriaOpen(false);

        const input = document.getElementById(
            "imagem",
        ) as HTMLInputElement | null;

        if (input) {
            input.value = "";
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
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                {editandoId ? "Editar" : "Adicionar"}
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold">
                                {editandoId ? "Imagem da galeria" : "Adicionar imagem"}
                            </h2>
                        </div>

                        {editandoId && (
                            <button
                                type="button"
                                onClick={resetFormulario}
                                className="rounded-lg border border-hairline bg-transparent px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>

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
                            ) : editandoId ? (
                                (() => {
                                    const itemAtual = galeria.find((item) => item.id === editandoId);
                                    return itemAtual ? (
                                        <div className="relative w-full">
                                            <img
                                                src={itemAtual.image_url}
                                                alt={itemAtual.title}
                                                className="max-h-80 w-full object-contain"
                                            />

                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 px-4 py-3">
                                                <p className="truncate text-sm text-white">
                                                    {itemAtual.title}
                                                </p>
                                            </div>
                                        </div>
                                    ) : null;
                                })()
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
                        {loading
                            ? editandoId
                                ? "Salvando..."
                                : "Enviando..."
                            : editandoId
                                ? "Salvar alterações"
                                : "Adicionar imagem"}
                    </button>
                </form>

                {/* Galeria existente */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="mt-2 text-2xl font-semibold">
                                Imagens cadastradas
                            </h2>
                        </div>
                    </div>

                    <div className="flex gap-2 border-b border-hairline">
                        {["Trabalho", "Casa"].map((categoria) => (
                            <button
                                key={categoria}
                                type="button"
                                onClick={() => setCategoriaSelecionada(categoria)}
                                className={`cursor-pointer border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                                    categoriaSelecionada === categoria
                                        ? "border-foreground text-foreground"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>

                    {galeriaFiltrada.length === 0 ? (
                        <div className="rounded-2xl border border-hairline p-6 text-sm text-muted-foreground">
                            Nenhuma imagem cadastrada nesta categoria.
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={galeriaFiltrada.map((item) => item.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-3">
                                    {galeriaFiltrada.map((item) => (
                                        <SortableGalleryItem
                                            key={item.id}
                                            item={item}
                                            onEdit={prepararEdicao}
                                            onDelete={excluirImagem}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
                {galeriaOrdenada.length > 0 && (
                    <button
                        type="button"
                        onClick={salvarOrdem}
                        disabled={salvandoOrdem}
                        className="w-full cursor-pointer rounded-lg bg-[#E3E3E3] px-4 py-3 font-medium text-black transition-colors hover:bg-[#CCCCCC] disabled:cursor-not-allowed disabled:bg-accent disabled:opacity-50"
                    >
                        {salvandoOrdem
                            ? "Salvando..."
                            : "Salvar ordem"}
                    </button>
                )}
            </div>
        </main>
    );
}