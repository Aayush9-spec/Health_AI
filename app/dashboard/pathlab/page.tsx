"use client";

import { motion } from "framer-motion";
import { FlaskConical, ArrowRight, Clock, MapPin, Home as HomeIcon } from "lucide-react";
import Link from "next/link";

export default function PathlabPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg w-full text-center"
            >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/5 border border-teal-500/20 flex items-center justify-center">
                    <FlaskConical size={36} className="text-teal-400" />
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Pathlab Services
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    Book lab tests from certified pathlabs with home sample collection.
                    Get digital reports delivered directly to your dashboard.
                </p>

                {/* Coming Soon Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-500 dark:text-teal-400 text-sm font-mono mb-8">
                    <Clock size={14} />
                    Coming Soon
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {[
                        { title: "Home Collection", desc: "Sample pickup at your doorstep" },
                        { title: "Certified Labs", desc: "NABL accredited partners only" },
                        { title: "Digital Reports", desc: "Results in your dashboard" },
                        { title: "50+ Tests", desc: "Full-body checkups & more" },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-left"
                        >
                            <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Back to Dashboard */}
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg font-medium transition-all shadow-lg shadow-teal-900/20"
                >
                    <HomeIcon size={16} /> Back to Dashboard
                </Link>
            </motion.div>
        </div>
    );
}
