"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function handleSignOut() {
        await authClient.signOut();
        router.push("/login");
    }

    return (
        <button
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-xl hover:bg-red-50"
        >
            Se déconnecter
        </button>
    );
}