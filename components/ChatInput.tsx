"use client";

import { useState } from "react";

const MAX_LENGTH = 200;

export default function ChatInput() {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!content.trim()) return;

        if (content.length > MAX_LENGTH) {
            setError(`Message trop long (${content.length}/${MAX_LENGTH} caractères)`);
            return;
        }

        setError("");

        const request = await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });

        if (request.ok) {
            setContent("");
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                    <input
                        type="text"
                        placeholder="Votre message..."
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            if (error) setError("");
                        }}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm bg-transparent"
                    />
                    <span className={`text-xs font-medium ${content.length > MAX_LENGTH ? "text-red-500" : "text-gray-400"}`}>
                        {content.length}/{MAX_LENGTH}
                    </span>
                    <button
                        type="submit"
                        disabled={!content.trim() || content.length > MAX_LENGTH}
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