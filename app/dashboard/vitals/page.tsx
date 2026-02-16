"use client";

import { useState, useEffect } from "react";
import { HeartPulse, Thermometer, Droplets, Wind, Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";

// ─── Simulated Vital Data Generator ──────────────────────────────────
function useSimulatedVital(base: number, variance: number, interval: number = 2000) {
    const [value, setValue] = useState(base);
    const [history, setHistory] = useState<number[]>(() =>
        Array.from({ length: 20 }, () => base + (Math.random() - 0.5) * variance)
    );
    const [trend, setTrend] = useState<"up" | "down" | "stable">("stable");

    useEffect(() => {
        const timer = setInterval(() => {
            const newVal = +(base + (Math.random() - 0.5) * variance).toFixed(1);
            setValue(newVal);
            setHistory((prev) => {
                const updated = [...prev.slice(1), newVal];
                const avg3 = updated.slice(-3).reduce((a, b) => a + b, 0) / 3;
                const avg6 = updated.slice(-6, -3).reduce((a, b) => a + b, 0) / 3;
                setTrend(avg3 > avg6 + 0.5 ? "up" : avg3 < avg6 - 0.5 ? "down" : "stable");
                return updated;
            });
        }, interval);
        return () => clearInterval(timer);
    }, [base, variance, interval]);

    return { value, history, trend };
}

// ─── Mini Sparkline ──────────────────────────────────────────────────
function Sparkline({ data, color, height = 48 }: { data: number[]; color: string; height?: number }) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 200;

    const points = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((v - min) / range) * (height - 4) - 2;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
            <defs>
                <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Area fill */}
            <polygon
                points={`0,${height} ${points} ${width},${height}`}
                fill={`url(#grad-${color})`}
            />
            {/* Line */}
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Current value dot */}
            {data.length > 0 && (() => {
                const lastX = width;
                const lastY = height - ((data[data.length - 1] - min) / range) * (height - 4) - 2;
                return (
                    <circle cx={lastX} cy={lastY} r="3" fill={color}>
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                );
            })()}
        </svg>
    );
}

// ─── Trend Icon ─────────────────────────────────────────────────────
function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
    if (trend === "up") return <TrendingUp size={14} className="text-green-400" />;
    if (trend === "down") return <TrendingDown size={14} className="text-red-400" />;
    return <Minus size={14} className="text-gray-400" />;
}

// ─── Main Page ──────────────────────────────────────────────────────
export default function VitalsPage() {
    const heartRate = useSimulatedVital(72, 12, 1500);
    const systolic = useSimulatedVital(120, 10, 3000);
    const diastolic = useSimulatedVital(80, 8, 3000);
    const spo2 = useSimulatedVital(97, 3, 4000);
    const temperature = useSimulatedVital(98.6, 1.2, 5000);

    const vitals = [
        {
            title: "Heart Rate",
            value: Math.round(heartRate.value),
            unit: "BPM",
            icon: <HeartPulse size={22} />,
            color: "#f43f5e",
            iconBg: "bg-rose-500/10",
            iconText: "text-rose-400",
            border: "border-rose-500/20",
            gradient: "from-rose-500/15 to-rose-600/5",
            history: heartRate.history,
            trend: heartRate.trend,
            normal: "60–100 BPM",
            status: heartRate.value >= 60 && heartRate.value <= 100 ? "normal" : "alert",
        },
        {
            title: "Blood Pressure",
            value: `${Math.round(systolic.value)}/${Math.round(diastolic.value)}`,
            unit: "mmHg",
            icon: <Activity size={22} />,
            color: "#8b5cf6",
            iconBg: "bg-purple-500/10",
            iconText: "text-purple-400",
            border: "border-purple-500/20",
            gradient: "from-purple-500/15 to-purple-600/5",
            history: systolic.history,
            trend: systolic.trend,
            normal: "90/60–120/80 mmHg",
            status: systolic.value <= 130 && diastolic.value <= 85 ? "normal" : "alert",
        },
        {
            title: "SpO₂",
            value: Math.round(spo2.value),
            unit: "%",
            icon: <Droplets size={22} />,
            color: "#06b6d4",
            iconBg: "bg-cyan-500/10",
            iconText: "text-cyan-400",
            border: "border-cyan-500/20",
            gradient: "from-cyan-500/15 to-cyan-600/5",
            history: spo2.history,
            trend: spo2.trend,
            normal: "95–100%",
            status: spo2.value >= 95 ? "normal" : "alert",
        },
        {
            title: "Temperature",
            value: temperature.value.toFixed(1),
            unit: "°F",
            icon: <Thermometer size={22} />,
            color: "#f59e0b",
            iconBg: "bg-amber-500/10",
            iconText: "text-amber-400",
            border: "border-amber-500/20",
            gradient: "from-amber-500/15 to-amber-600/5",
            history: temperature.history,
            trend: temperature.trend,
            normal: "97.8–99.1 °F",
            status: temperature.value >= 97.5 && temperature.value <= 99.5 ? "normal" : "alert",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Real-Time Vitals</h1>
                    <p className="text-gray-400 text-sm">Live monitoring • Simulated data for demo</p>
                </div>
                <div className="flex gap-3 self-start sm:self-auto">
                    <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Sensors Active
                    </div>
                    <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs flex items-center gap-2">
                        <Wind size={12} />
                        Streaming
                    </div>
                </div>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {vitals.map((vital) => (
                    <div
                        key={vital.title}
                        className={`relative p-6 rounded-2xl border ${vital.border} bg-gradient-to-br ${vital.gradient} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/20`}
                    >
                        {/* Header row */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-11 h-11 rounded-xl ${vital.iconBg} flex items-center justify-center ${vital.iconText}`}>
                                    {vital.icon}
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-300">{vital.title}</h3>
                                    <p className="text-xs text-gray-500">Normal: {vital.normal}</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${vital.status === "normal"
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse"
                                }`}>
                                <TrendIcon trend={vital.trend} />
                                {vital.status === "normal" ? "Normal" : "Alert"}
                            </div>
                        </div>

                        {/* Value */}
                        <div className="flex items-baseline gap-2 mb-5">
                            <span className="text-4xl font-bold tracking-tight" style={{ color: vital.color }}>
                                {vital.value}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">{vital.unit}</span>
                        </div>

                        {/* Sparkline */}
                        <div className="mt-2">
                            <Sparkline data={vital.history} color={vital.color} height={56} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Bar */}
            <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Overall Health Score</h3>
                            <p className="text-xs text-gray-500">Based on current vitals analysis</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">92</div>
                            <div className="text-xs text-gray-500">Score</div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-300">4</div>
                            <div className="text-xs text-gray-500">Vitals</div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <div className="text-sm font-semibold text-green-400">All Normal</div>
                            <div className="text-xs text-gray-500">Status</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
