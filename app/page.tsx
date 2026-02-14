"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, ArrowRight, Shield, Zap, Cpu, Globe, Lock, Search } from "lucide-react";
import { useEffect, useState } from "react";

const gridItems = [
  {
    title: "Neural Engine",
    desc: "Advanced symptom analysis network",
    icon: <Cpu size={24} />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Secure Ledger",
    desc: "Zero-knowledge proof verification",
    icon: <Shield size={24} />,
    colSpan: "col-span-1",
  },
  {
    title: "Global Mesh",
    desc: "Interconnected medical facilities",
    icon: <Globe size={24} />,
    colSpan: "col-span-1",
  },
  {
    title: "Instant Triage",
    desc: "Real-time patient routing",
    icon: <Zap size={24} />,
    colSpan: "col-span-1 md:col-span-2",
  },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">

      {/* Background Grid - Static */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-sm font-bold">
              M
            </div>
            <span className="font-bold text-xl tracking-tight">MedAI</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-400">
            {["Diagnostics", "Protocol", "Nodes"].map((item) => (
              <Link
                key={item}
                href="#"
                className="px-6 py-2 hover:bg-white/5 rounded-full transition-colors hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>

          <button className="bg-white text-black px-6 py-2.5 text-sm font-semibold rounded-sm hover:bg-gray-200 transition-colors">
            <Link href="/dashboard">Launch App</Link>
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-[1400px] mx-auto">

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 items-end">
          <div className="col-span-1 md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-white/20 rounded-full text-xs font-mono text-purple-400 uppercase tracking-wider"
            >
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
              System Online v2.0
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] mb-8"
            >
              The Medical <br />
              <span className="text-gray-500">Intelligence Layer</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/dashboard" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-sm font-medium transition-all flex items-center gap-2">
                Start Analysis <ArrowRight size={18} />
              </Link>
              <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white rounded-sm font-medium transition-all">
                View Documentation
              </button>
            </motion.div>
          </div>

          <div className="col-span-1 md:col-span-4 text-right hidden md:block">
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs ml-auto">
              Decentralized protocol for symptom analysis and patient routing.
              Powered by zero-knowledge proofs and neural networks.
            </p>
          </div>
        </div>

        {/* Animated Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full mb-24"></div>

        {/* Feature Grid (Bento Box) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-lg">
          {gridItems.map((item, i) => (
            <motion.div
              key={i}
              className={`bg-[#050505] p-10 group relative overflow-hidden ${item.colSpan}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Hover Glow Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`
                }}
              />

              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-500/10 group-hover:text-purple-300 transition-colors">
                {item.icon}
              </div>

              <h3 className="text-2xl font-medium mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-sm group-hover:text-gray-400 transition-colors">
                {item.desc}
              </p>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="text-white/20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-t border-b border-white/10">
          {[
            { label: "Active Nodes", value: "8,249" },
            { label: "Transactions", value: "2M+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Latency", value: "<12ms" },
          ].map((stat, i) => (
            <div key={i} className="py-12 px-6 text-center hover:bg-white/5 transition-colors">
              <div className="text-3xl font-medium mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
            © 2026 MedAI Protocol. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</Link>
            <Link href="https://github.com/Aayush9-spec/Health_AI" className="text-gray-500 hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Discord</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
