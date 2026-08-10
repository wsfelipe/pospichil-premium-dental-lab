import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/login")({
    component: Login,
});

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        if (!email.trim() || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        setLoading(true);
        setErro("");

        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: senha,
        });

        if (error) {
            console.error(error);
            setErro("E-mail ou senha incorretos.");
            setLoading(false);
            return;
        }

        await navigate({
            to: "/admin",
        });
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        Administração
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold">
                        Entrar
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Acesse o painel de administração.
                    </p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5 rounded-2xl border border-hairline p-6"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium"
                        >
                            E-mail
                        </label>

                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full rounded-lg border border-hairline bg-transparent px-4 py-3 outline-none transition-colors focus:border-accent"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="senha"
                            className="mb-2 block text-sm font-medium"
                        >
                            Senha
                        </label>

                        <input
                            id="senha"
                            type="password"
                            autoComplete="current-password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-hairline bg-transparent px-4 py-3 outline-none transition-colors focus:border-accent"
                        />
                    </div>

                    {erro && (
                        <p className="text-sm text-red-400">
                            {erro}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !email.trim() || !senha}
                        className="w-full cursor-pointer rounded-lg bg-[#E3E3E3] px-4 py-3 font-medium text-black transition-colors hover:bg-[#CCCCCC] disabled:cursor-not-allowed disabled:bg-accent disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </main>
    );
}