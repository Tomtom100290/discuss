"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import CardMessage from "./CardMessage";
import Message from "@/types/Message";

export default function ChatMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        async function fetchMessages() {
            const request = await fetch("/api/messages");
            if (!request.ok) {
                console.log(request.status);
                return;
            }
            const data = await request.json();
            setMessages(data);
        }
        fetchMessages();
    }, []);

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Aucun message pour le moment.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-3">
            {messages.map((m) => (
                <CardMessage m={m} userId={session?.user.id} key={m._id} />
            ))}
        </div>
    );
}