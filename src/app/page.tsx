import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";
import { HeroSection } from "@/components/hero-section";
import { Gavel, Scale, ShieldCheck, HeartHandshake, Clock, Users, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6" />
            <span className="font-serif text-xl font-bold tracking-tight">Lexshadi</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#problem" className="hover:text-black dark:hover:text-white transition-colors">The Problem</Link>
            <Link href="#solution" className="hover:text-black dark:hover:text-white transition-colors">The Solution</Link>
            <Link 
              href="#waitlist" 
              className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* The Problem Section */}
        <section id="problem" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
                The "Life-Law" Imbalance
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                The Indian legal profession requires sacrifice. Your personal life shouldn't be the cost.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 dark:bg-black dark:border-zinc-800">
                <div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6 dark:bg-zinc-900">
                  <Clock className="h-6 w-6 text-black dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Time Poverty</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  70+ hour work weeks and court deadlines leave zero time for traditional social discovery or dating apps.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 dark:bg-black dark:border-zinc-800">
                <div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6 dark:bg-zinc-900">
                  <Users className="h-6 w-6 text-black dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">The Relatability Gap</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Non-lawyers struggle to understand "shop talk," unpredictable schedules, and the pressure of the courtroom.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 dark:bg-black dark:border-zinc-800">
                <div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6 dark:bg-zinc-900">
                  <ShieldCheck className="h-6 w-6 text-black dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">The Trust Deficit</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Generic apps are saturated with unverified profiles. Privacy is a luxury most platforms cannot afford.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section id="solution" className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl mb-6">
                  A Vertically Integrated Ecosystem
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                        <Gavel className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Strict Curation</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Every profile vetted via Bar Council registration and degrees from verified NLUs and traditional universities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                        <HeartHandshake className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Contextual Matching</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Algorithms based on practice areas (Litigation x Corporate) and compatibility factors unique to the legal profession.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                        <Lock className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Advanced controls to hide profiles from specific firms or seniors. Your reputation is safe here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                   {/* Abstract representation of connection/balance */}
                   <div className="relative h-64 w-64">
                      <div className="absolute inset-0 border-2 border-black/10 dark:border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                      <div className="absolute inset-4 border-2 border-black/20 dark:border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                      <div className="absolute inset-8 border-2 border-black/30 dark:border-white/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Scale className="h-16 w-16 text-black dark:text-white" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="py-24 bg-zinc-900 text-white dark:bg-zinc-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                  Secure Your Place on the Bench
                </h2>
                <p className="text-lg text-zinc-400 mb-8">
                  We are currently accepting early access requests. Join the waitlist to be notified when membership opens for your jurisdiction.
                </p>
                <div className="flex flex-col gap-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span>Data Encrypted & Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span>Bar Council Verification Support</span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-black rounded-2xl p-2 text-black dark:text-white">
                 <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white py-12 dark:border-white/10 dark:bg-black">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Lexshadi. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white">Bar Council Compliance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
