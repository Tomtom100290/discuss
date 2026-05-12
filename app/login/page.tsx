"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const { error } = await authClient.signIn.email({ email, password });
        if (error) {
            setError("Email ou mot de passe incorrect.");
            setLoading(false);
        } else {
            router.push("/chat");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 flex flex-col gap-6">

                {/* Logo */}
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-blue-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md">
                        D
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Discuss</h1>
                    <p className="text-sm text-gray-400">Connectez-vous à votre compte</p>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="vous@exemple.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center"
                    >
                        {loading ? <PacmanLoader size={8} color="#fff" /> : "Se connecter"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400">
                    Pas encore de compte ?{" "}
                    <a href="/register" className="text-blue-500 hover:underline font-medium">
                        S'inscrire
                    </a>
                </p>
            </div>
        </div>
    );
}