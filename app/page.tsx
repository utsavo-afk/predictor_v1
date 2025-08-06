import { auth } from "@/auth";
import SocialSignOutButton from "@/components/auth/SocialSignOutButton";
import SocialSignInButton from "@/components/auth/SocialSingInButton";
import { headers as nextheaders } from "next/headers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  TrophyIcon, 
  UsersIcon, 
  TargetIcon, 
  ArrowRightIcon
} from "lucide-react";

export default async function Home() {
  const headers = await nextheaders();
  const authCtx = await auth.api.getSession({
    headers,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrophyIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Predictor</h1>
          </div>
          <div className="flex-shrink-0">
            {authCtx ? (
              <SocialSignOutButton name="Sign Out" />
            ) : (
              <SocialSignInButton 
                provider="google" 
                text="Sign in" 
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm whitespace-nowrap"
              />
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 sm:mb-6 text-xs sm:text-sm">
            🏆 Premier League Predictions
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Predict. Compete. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Conquer
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Join the ultimate Premier League prediction league with your friends. 
            Create groups, predict match outcomes, and climb the leaderboard to become 
            the ultimate football prophet.
          </p>
          
          {!authCtx && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <SocialSignInButton 
                provider="google" 
                text="Get Started with Google" 
                size="lg"
                className="w-full sm:w-auto sm:min-w-[250px]"
              />
              <Button variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-[200px]">
                <span className="hidden sm:inline">Learn More</span>
                <span className="sm:hidden">Learn More</span>
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {authCtx && (
            <div className="max-w-xs sm:max-w-2xl mx-auto px-4 sm:px-0">
              <Card className="mb-6 sm:mb-8">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-green-600 text-lg sm:text-xl">Welcome back!</CardTitle>
                  <CardDescription className="text-sm sm:text-base">You&apos;re signed in and ready to start predicting</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Link href="/group">
                      <Button size="lg" className="w-full sm:w-auto">Go to Groups</Button>
                    </Link>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">Join a Group</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* User Session Debug Info - Remove in production */}
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700">
                  Session Debug Info
                </summary>
                <pre className="bg-slate-100 p-4 rounded-md text-xs overflow-auto mt-2">
                  {JSON.stringify(authCtx, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Why Choose Predictor?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-sm sm:max-w-2xl mx-auto px-4 sm:px-0">
              Experience the thrill of Premier League predictions with features designed 
              for competitive fun among friends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center border-2 hover:border-blue-200 transition-colors p-4 sm:p-6">
              <CardHeader className="pb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Create Groups</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Start your own prediction league and invite friends to join the competition
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 hover:border-purple-200 transition-colors p-4 sm:p-6">
              <CardHeader className="pb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <TargetIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Smart Predictions</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Predict match outcomes with our intuitive interface and track your accuracy
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 hover:border-green-200 transition-colors p-4 sm:p-6 md:col-span-1">
              <CardHeader className="pb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Live Leaderboards</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Compete with friends and see who&apos;s the ultimate Premier League predictor
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Sign Up & Create</h3>
              <p className="text-sm sm:text-base text-slate-600 px-2 sm:px-0">
                Sign in with Google and create your prediction group or join an existing one
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Make Predictions</h3>
              <p className="text-sm sm:text-base text-slate-600 px-2 sm:px-0">
                Predict the outcomes of upcoming Premier League matches before they start
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Compete & Win</h3>
              <p className="text-sm sm:text-base text-slate-600 px-2 sm:px-0">
                Earn points for correct predictions and climb the leaderboard to victory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!authCtx && (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Start Predicting?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-xs sm:max-w-2xl mx-auto px-4 sm:px-0">
              Join thousands of football fans already competing in prediction leagues
            </p>
            <SocialSignInButton 
              provider="google" 
              text="Sign Up with Google" 
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[250px] max-w-sm mx-auto"
            />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg sm:text-xl font-bold">Predictor</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-slate-400 text-center">
              <span>© 2025 Predictor. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span>Premier League Prediction Game</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
