import { auth } from "@/auth";
import { headers as nextheaders } from "next/headers";
import SocialSignOutButton from "@/components/auth/SocialSignOutButton";
import { TrophyIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { CreateGroupForm } from "@/components/groups";
import { redirect } from "next/navigation";

export default async function CreateGroupPage() {
  const headers = await nextheaders();
  const session = await auth.api.getSession({
    headers,
  });

  // Guard: Ensure session exists (should be guaranteed by protected layout)
  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/group" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
            </Link>
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <TrophyIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Predictor</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600 hidden sm:inline">
              Welcome, {session.user.name}
            </span>
            <SocialSignOutButton name="Sign Out" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrophyIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Create New Group
            </h1>
            <p className="text-lg text-slate-600">
              Set up your prediction league with custom rules and settings
            </p>
          </div>

          {/* Create Group Form */}
          <CreateGroupForm userSession={session} />

          {/* Debug Session Info - Remove in production */}
          <details>
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 mb-2">
              Session Debug Info
            </summary>
            <pre className="bg-slate-100 p-4 rounded-md text-xs overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </details>
        </div>
      </main>
    </div>
  );
}
