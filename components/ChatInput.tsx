"use client";

import { useState } from "react";

const MAX_LENGTH = 80;
const MIN_LENGTH = 1;

// Sanitisation XSS
function sanitizeInput(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;")
        .replace(/`/g, "&#x60;");
}

// Détection de patterns malveillants
function containsMaliciousPattern(str: string): boolean {
    const patterns = [
        /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
        /javascript\s*:/gi,
        /on\w+\s*=/gi,
        /data\s*:/gi,
        /vbscript\s*:/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi,
        /eval\s*\(/gi,
        /document\s*\.\s*cookie/gi,
        /window\s*\.\s*location/gi,
        /\.exe|\.bat|\.sh|\.cmd/gi,
    ];
    return patterns.some((pattern) => pattern.test(str));
}

function validateMessage(content: string): string | null {
    if (!content.trim()) return "Le message ne peut pas être vide.";
    if (content.trim().length < MIN_LENGTH) return `Minimum ${MIN_LENGTH} caractère requis.`;
    if (content.length > MAX_LENGTH) return `Message trop long (${content.length}/${MAX_LENGTH} caractères).`;
    if (containsMaliciousPattern(content)) return "Contenu non autorisé détecté.";
    if (/(.)\1{20,}/.test(content)) return "Message invalide (caractères répétitifs).";
    if (/^\s+$/.test(content)) return "Le message ne peut pas contenir uniquement des espaces.";
    return null;
}

export default function ChatInput() {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        // Bloque la saisie au delà de MAX_LENGTH
        if (value.length > MAX_LENGTH) return;

        setContent(value);
        if (error) setError("");
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validationError = validateMessage(content);
        if (validationError) {
            setError(validationError);
            return;
        }

        const sanitized = sanitizeInput(content.trim());

        const request = await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: sanitized }),
        });

        if (request.ok) {
            setContent("");
            setError("");
        } else {
            const data = await request.json();
            setError(data?.message || "Erreur lors de l'envoi.");
        }
    }

    const isOverLimit = content.length > MAX_LENGTH;
    const isNearLimit = content.length >= MAX_LENGTH * 0.8;

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className={`flex items-center gap-2 bg-white border rounded-2xl px-4 py-2 shadow-sm transition-all focus-within:ring-2 ${isOverLimit ? "border-red-400 focus-within:ring-red-400" : "border-gray-200 focus-within:ring-blue-500 focus-within:border-transparent"}`}>
                    <input
                        type="text"
                        placeholder="Votre message..."
                        value={content}
                        onChange={handleChange}
                        maxLength={MAX_LENGTH + 1}
                        autoComplete="off"
                        spellCheck={false}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm bg-transparent"
                    />
                    <span className={`text-xs font-medium transition-colors ${isOverLimit ? "text-red-500" : isNearLimit ? "text-orange-400" : "text-gray-400"}`}>
                        {content.length}/{MAX_LENGTH}
                    </span>
                    <button
                        type="submit"
                        disabled={!content.trim() || isOverLimit}
                        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-1.5 rounded-xl transition-colors"
                    >
                        Envoyer
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 text-xs px-2">{error}</p>
                )}
            </form>
        </div>
    );
}