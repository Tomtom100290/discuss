"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const { error } = await authClient.signUp.email({ name, email, password });
        if (error) {
            setError("Une erreur est survenue, veuillez réessayer.");
        } else {
            setSuccess(true);
            setTimeout(() => router.push("/login"), 2000);
        }
        setLoading(false);
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
                    <p className="text-sm text-gray-400">Créez votre compte</p>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Nom</label>
                        <input
                            type="text"
                            placeholder="Votre nom"
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

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

                    {success && (
                        <p className="text-green-500 text-xs text-center">
                            Compte créé ! Redirection en cours...
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center"
                    >
                        {loading ? <PacmanLoader size={8} color="#fff" /> : "S'inscrire"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400">
                    Déjà un compte ?{" "}
                    <a href="/login" className="text-blue-500 hover:underline font-medium">
                        Se connecter
                    </a>
                </p>
            </div>
        </div>
    );
}