"use client";

import { Calendar, Clock, Video, MapPin, Check, X, User, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const appointments = [
    {
        id: 1,
        patient: "Michael P.",
        age: 34,
        reason: "Follow-up: Viral Fever",
        time: "10:30 AM",
        date: "Today",
        type: "online",
        status: "pending",
    },
    {
        id: 2,
        patient: "Sarah J.",
        age: 28,
        reason: "New: Persistent headache",
        time: "11:15 AM",
        date: "Today",
        type: "offline",
        status: "confirmed",
    },
    {
        id: 3,
        patient: "David L.",
        age: 45,
        reason: "Routine Checkup",
        time: "02:00 PM",
        date: "Today",
        type: "online",
        status: "pending",
    },
    {
        id: 4,
        patient: "Emma W.",
        age: 31,
        reason: "Lab Results Review",
        time: "09:00 AM",
        date: "Tomorrow",
        type: "offline",
        status: "confirmed",
    },
];

type AppointmentStatus = "pending" | "confirmed" | "rejected";

export default function DoctorAppointmentsPage() {
    const [filter, setFilter] = useState<"all" | "today" | "upcoming">("all");
    const [statuses, setStatuses] = useState<Record<number, AppointmentStatus>>(
        Object.fromEntries(appointments.map((a) => [a.id, a.status as AppointmentStatus]))
    );

    const handleAccept = (id: number) => {
        setStatuses((prev) => ({ ...prev, [id]: "confirmed" }));
    };

    const handleReject = (id: number) => {
        setStatuses((prev) => ({ ...prev, [id]: "rejected" }));
    };

    const filtered = appointments.filter((a) => {
        if (filter === "today") return a.date === "Today";
        if (filter === "upcoming") return a.date !== "Today";
        return true;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Appointment Queue</h1>
                    <p className="text-gray-400 text-sm">Manage incoming and confirmed appointments</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">
                        {appointments.filter((a) => statuses[a.id] === "pending").length} pending
                    </span>
                    <span className="text-gray-700">•</span>
                    <span className="text-green-400">
                        {appointments.filter((a) => statuses[a.id] === "confirmed").length} confirmed
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(["all", "today", "upcoming"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f
                                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Appointment Cards */}
            <div className="space-y-4">
                <AnimatePresence>
                    {filtered.map((appt, i) => {
                        const status = statuses[appt.id];
                        return (
                            <motion.div
                                key={appt.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: i * 0.05 }}
                                className={`p-5 bg-white/[0.02] border rounded-xl transition-all ${status === "rejected"
                                        ? "border-red-500/20 opacity-50"
                                        : status === "confirmed"
                                            ? "border-green-500/20"
                                            : "border-white/10"
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    {/* Patient Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold">
                                            {appt.patient
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold">{appt.patient}</h3>
                                                <span className="text-xs text-gray-500">{appt.age}y</span>
                                                {appt.type === "online" && (
                                                    <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 uppercase font-medium">
                                                        Video
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-400">{appt.reason}</p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={10} /> {appt.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={10} /> {appt.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3">
                                        {status === "pending" ? (
                                            <>
                                                <button
                                                    onClick={() => handleAccept(appt.id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <Check size={14} /> Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(appt.id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg text-sm font-medium transition-colors border border-white/10"
                                                >
                                                    <X size={14} /> Decline
                                                </button>
                                            </>
                                        ) : status === "confirmed" ? (
                                            <div className="flex items-center gap-3">
                                                {appt.type === "online" && (
                                                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                                                        <Video size={14} /> Start Call
                                                    </button>
                                                )}
                                                <span className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                                                    <Check size={12} /> Confirmed
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-red-400 text-xs font-medium bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
                                                Declined
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
