import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ChatPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    return (
        <div className="flex h-screen bg-gray-50">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col items-center py-6 px-4 gap-6 shadow-sm">

                {/* Logo */}
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-blue-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md">
                        D
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">Discuss</h1>
                </div>

                <hr className="w-full border-gray-100" />

                {/* Utilisateur connecté */}
                <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                        {session?.user.name?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                    <p className="text-sm font-semibold text-gray-700 text-center">
                        {session?.user.name ?? "Inconnu"}
                    </p>
                    <p className="text-xs text-gray-400 text-center truncate w-full">
                        {session?.user.email ?? ""}
                    </p>
                </div>

                <div className="flex-1" />

                {/* Bouton déconnexion en bas */}
                <LogoutButton />
            </aside>

            {/* Zone de chat */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <ChatMessages />
                <ChatInput />
            </main>
        </div>
    );
}