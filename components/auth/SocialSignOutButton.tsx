"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface SocialSignOutButtonProps {
  name?: string; // Name of the provider for the button, e.g., "Google"
}

export default function SocialSignOutButton({  }: SocialSignOutButtonProps) {
    const router = useRouter()
  return (
    <button
      onClick={async () => await authClient.signOut({fetchOptions:{
        onSuccess:() => {
            router.push("/")
        }
      }})}
      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Sign out
    </button>
  );
}