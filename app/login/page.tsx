"use client";

import { Activity, Lock, Mail, Loader2, Github } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            router.push("/dashboard");
            router.refresh();
        } catch (err: any) {
            if (err.message.includes("Invalid login credentials") || err.message.includes("Email not confirmed")) {
                // Fallback for demo without keys
                if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                    router.push("/dashboard"); // Allow bypass if no keys configured yet
                    return;
                }
            }
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        setLoading(true);
        setError(null);

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
            setError("Missing Supabase Keys. Check STARTUP_ROADMAP.md");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            setError("Check your email for the confirmation link!");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-md bg-white/[0.02] border border-white/10 p-8 rounded-2xl relative z-10 backdrop-blur-xl">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-3">
                        <Activity className="text-purple-500" size={32} />
                        <span className="font-bold text-2xl text-white">MedAI</span>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-center mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-center text-sm mb-8">Secure access to your health intelligence</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                                placeholder="doctor@medai.protocol"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 flex flex-col gap-4">
                    <button
                        type="button"
                        onClick={handleSignup}
                        className="text-sm text-gray-400 hover:text-white transition-colors text-center"
                    >
                        Create new account
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#050505] px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Github size={18} /> GitHub
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-600">
                <Link href="/" className="hover:text-gray-400 transition-colors">Back to Home</Link>
            </div>
        </div>
    );
}
