"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, ArrowRight, Shield, Zap, Cpu, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white selection:bg-purple-500/30 overflow-hidden">

      {/* Background Gradients & Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Activity className="text-purple-500" size={24} />
            <span className="font-bold text-xl tracking-wide">MedAI</span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Diagnostics</Link>
            <Link href="#" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:block">
              Portal Access
            </Link>
            <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2.5 text-sm font-medium rounded-md transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              Initialize
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300"
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          Decentralized Health Intelligence v2.0
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
        >
          Future of AI <br />
          <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            Healthcare
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
        >
          Neural-powered symptom analysis, blockchain-secured medical protocols,
          and seamless ecosystem orchestration. The protocol for human longevity.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:from-[#7c3aed] hover:to-[#4f46e5] text-white font-semibold transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-105">
            Enter Portal <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-6xl w-full text-left">
          {[
            {
              icon: <Cpu className="text-purple-400" size={24} />,
              title: "AI Diagnostics",
              desc: "Neural-engine symptom analysis with hyper-accurate cross-referencing.",
            },
            {
              icon: <Shield className="text-blue-400" size={24} />,
              title: "Secure Ledger",
              desc: "End-to-end encrypted medical protocols secured by zero-knowledge proofs.",
            },
            {
              icon: <Zap className="text-pink-400" size={24} />,
              title: "Instant Routing",
              desc: "Real-time clinical orchestration connecting you to specialists instantly.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#0A0A0A] mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">

          <div className="flex items-center gap-2">
            <Activity className="text-purple-500" size={20} />
            <span className="font-semibold text-white">MedAI Protocol</span>
          </div>

          <div className="text-center md:text-left">
            © 2026 Decentralized Medical Intelligence Infrastructure.
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy.md</Link>
            <Link href="#" className="hover:text-white transition-colors">Terminal</Link>
            <Link href="#" className="hover:text-white transition-colors">Nodes</Link>
            <Link href="https://github.com/Aayush9-spec/Health_AI" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
              <Github size={16} />
              <span>Source</span>
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
