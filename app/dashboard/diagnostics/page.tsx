"use client";

import { Activity, Heart, Thermometer, Droplets, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const vitals = [
    {
        label: "Heart Rate",
        value: 72,
        unit: "bpm",
        icon: <Heart size={20} />,
        color: "text-red-400",
        bg: "bg-red-500/10",
        trend: "stable",
        history: [68, 71, 74, 72, 70, 73, 72],
    },
    {
        label: "Blood Pressure",
        value: "120/80",
        unit: "mmHg",
        icon: <Activity size={20} />,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        trend: "stable",
        history: [118, 121, 119, 120, 122, 120, 120],
    },
    {
        label: "Temperature",
        value: 98.6,
        unit: "°F",
        icon: <Thermometer size={20} />,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        trend: "stable",
        history: [98.4, 98.5, 98.7, 98.6, 98.5, 98.6, 98.6],
    },
    {
        label: "SpO2",
        value: 98,
        unit: "%",
        icon: <Droplets size={20} />,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        trend: "up",
        history: [96, 97, 97, 98, 97, 98, 98],
    },
];

const recentLogs = [
    { date: "Feb 14", event: "Blood Test — CBC Panel", status: "Normal", color: "text-green-400" },
    { date: "Feb 12", event: "AI Symptom Check — Headache", status: "Resolved", color: "text-green-400" },
    { date: "Feb 10", event: "Consultation — Dr. Sarah Chen", status: "Completed", color: "text-blue-400" },
    { date: "Feb 05", event: "Prescription Refill — Paracetamol", status: "Delivered", color: "text-purple-400" },
];

function MiniChart({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
        <div className="flex items-end gap-1 h-10">
            {data.map((val, i) => (
                <div
                    key={i}
                    className={`w-2 rounded-t-sm ${color.replace("text-", "bg-")} opacity-60`}
                    style={{ height: `${((val - min) / range) * 100}%`, minHeight: "4px" }}
                />
            ))}
        </div>
    );
}

export default function DiagnosticsPage() {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const update = () => setCurrentTime(new Date().toLocaleTimeString());
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Diagnostics</h1>
                    <p className="text-gray-400 text-sm">Real-time health metrics & activity log</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-medium self-start sm:self-auto">
                    <Clock size={12} />
                    Live • {currentTime}
                </div>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {vitals.map((vital, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={vital.label}
                        className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] transition-colors group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-xl ${vital.bg} ${vital.color}`}>
                                {vital.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium ${vital.trend === "up" ? "text-green-400" : vital.trend === "down" ? "text-red-400" : "text-gray-500"
                                }`}>
                                {vital.trend === "up" ? <TrendingUp size={12} /> : vital.trend === "down" ? <TrendingDown size={12} /> : null}
                                {vital.trend === "stable" ? "Stable" : vital.trend === "up" ? "Rising" : "Falling"}
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold">{vital.value}</span>
                            <span className="text-sm text-gray-500">{vital.unit}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{vital.label}</p>

                        <MiniChart data={vital.history} color={vital.color} />
                    </motion.div>
                ))}
            </div>

            {/* Health Score */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-1 p-8 bg-gradient-to-br from-purple-900/30 to-[#0A0A0A] border border-purple-500/20 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                    <h3 className="text-lg font-semibold mb-6 relative z-10">Overall Health Score</h3>
                    <div className="flex items-center justify-center relative z-10">
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="3"
                                    strokeDasharray="87, 100"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="gradient">
                                        <stop offset="0%" stopColor="#9333ea" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">87</span>
                                <span className="text-xs text-gray-500">/ 100</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4 relative z-10">Excellent condition</p>
                </motion.div>

                {/* Activity Log */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold mb-6">Recent Health Activity</h3>
                    <div className="space-y-4">
                        {recentLogs.map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="text-xs text-gray-500 font-mono w-14">{log.date}</div>
                                    <div className="text-sm font-medium text-gray-200">{log.event}</div>
                                </div>
                                <span className={`text-xs font-medium ${log.color}`}>{log.status}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
