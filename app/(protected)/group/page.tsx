import { auth } from "@/auth";
import { headers as nextheaders } from "next/headers";
import SocialSignOutButton from "@/components/auth/SocialSignOutButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrophyIcon, UsersIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function GroupPage() {
  const headers = await nextheaders();
  const session = await auth.api.getSession({
    headers,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <TrophyIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Predictor</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600 hidden sm:inline">
              Welcome, {session?.user?.name}
            </span>
            <SocialSignOutButton name="Sign Out" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Your Prediction Groups
            </h1>
            <p className="text-lg text-slate-600">
              Manage your groups and start predicting Premier League matches
            </p>
          </div>

          {/* Create Group Card */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Link href="/group/create">
              <Card className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors cursor-pointer">
                <CardHeader className="text-center py-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <PlusIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Create New Group</CardTitle>
                  <CardDescription>
                    Start a new prediction league with your friends
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Example Group Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <UsersIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <CardTitle className="text-lg">Football Friends</CardTitle>
                <CardDescription>
                  8 members • 15 predictions made
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Your position: #2</span>
                  <Button size="sm">View Group</Button>
                </div>
              </CardContent>
            </Card>

            {/* Another Example Group Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <UsersIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <CardTitle className="text-lg">Office League</CardTitle>
                <CardDescription>
                  12 members • 23 predictions made
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Your position: #5</span>
                  <Button size="sm">View Group</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions - Desktop View */}
          <div className="hidden lg:block bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/group/create">
                <Button className="w-full justify-start">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create New Group
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <UsersIcon className="mr-2 h-4 w-4" />
                Join Existing Group
              </Button>
            </div>
          </div>

          {/* Floating Quick Actions - Mobile & Tablet */}
          <div className="lg:hidden fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50 flex flex-col gap-3 animate-in slide-in-from-right-8 fade-in duration-500">
            <Link href="/group/create">
              <Button 
                size="lg" 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-0 bg-blue-600 hover:bg-blue-700 hover:scale-110 active:scale-95"
                title="Create New Group"
                aria-label="Create New Group"
              >
                <PlusIcon className="h-6 w-6 sm:h-7 sm:w-7" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-0 bg-white/95 backdrop-blur-sm border-2 border-slate-300 hover:border-blue-400 hover:scale-110 active:scale-95"
              title="Join Existing Group"
              aria-label="Join Existing Group"
            >
              <UsersIcon className="h-6 w-6 sm:h-7 sm:w-7 text-slate-600" />
            </Button>
          </div>

          {/* Debug Session Info - Remove in production */}
          <details className="mt-8">
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
