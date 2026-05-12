"use client";

import Message from "@/types/Message";
import { FaTrash } from "react-icons/fa";

export default function CardMessage({
    m,
    userId,
}: {
    m: Message;
    userId: string | undefined;
}) {
    const isOwn = m.userId === userId;

    async function deleteMessage(_id: string, userId: string | undefined) {
        const request = await fetch("/api/messages", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id, userId }),
        });
        if (!request.ok) {
            const data = await request.json();
            console.log(data);
        }
    }

    function handleClick() {
        deleteMessage(m._id, userId);
    }

    return (
        <div className={`flex flex-col gap-1 max-w-xs ${isOwn ? "items-end ml-auto" : "items-start mr-auto"}`}>
            {!isOwn && (
                <p className="text-xs font-semibold text-gray-500 px-1">{m.userName}</p>
            )}
            <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${isOwn ? "bg-blue-500 text-white rounded-br-sm" : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"}`}>
                <p>{m.content}</p>
            </div>
            <div className={`flex items-center gap-2 px-1 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                <p className="text-xs text-gray-400">
                    {new Date(m.createdAt).toLocaleTimeString("fr-FR")}
                </p>
                {isOwn && (
                    <button
                        onClick={handleClick}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                        <FaTrash size={10} />
                    </button>
                )}
            </div>
        </div>
    );
}