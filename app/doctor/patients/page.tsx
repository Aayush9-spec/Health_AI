"use client";

import { Search, User, FileText, Calendar, ChevronRight, Activity } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const patients = [
    {
        id: 1,
        name: "Michael Peterson",
        age: 34,
        gender: "Male",
        lastVisit: "Feb 10, 2026",
        condition: "Viral Fever",
        status: "Active",
        visits: 5,
    },
    {
        id: 2,
        name: "Sarah Johnson",
        age: 28,
        gender: "Female",
        lastVisit: "Feb 12, 2026",
        condition: "Migraine",
        status: "Active",
        visits: 3,
    },
    {
        id: 3,
        name: "David Lee",
        age: 45,
        gender: "Male",
        lastVisit: "Jan 28, 2026",
        condition: "Hypertension",
        status: "Follow-up",
        visits: 12,
    },
    {
        id: 4,
        name: "Emma Wilson",
        age: 31,
        gender: "Female",
        lastVisit: "Feb 14, 2026",
        condition: "Regular Checkup",
        status: "Active",
        visits: 2,
    },
    {
        id: 5,
        name: "James Carter",
        age: 52,
        gender: "Male",
        lastVisit: "Feb 01, 2026",
        condition: "Diabetes Type 2",
        status: "Critical",
        visits: 18,
    },
];

export default function PatientsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

    const filtered = patients.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selected = patients.find((p) => p.id === selectedPatient);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Patients</h1>
                    <p className="text-gray-400 text-sm">{patients.length} registered patients</p>
                </div>
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or condition..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500/50"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Patient List */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs text-gray-500 font-medium uppercase tracking-wider">
                        <div className="col-span-5">Patient</div>
                        <div className="col-span-3">Condition</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Visits</div>
                    </div>
                    <div className="divide-y divide-white/5">
                        {filtered.map((patient, i) => (
                            <motion.button
                                key={patient.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedPatient(patient.id)}
                                className={`w-full grid grid-cols-12 gap-4 p-4 text-left hover:bg-white/[0.03] transition-colors ${selectedPatient === patient.id ? "bg-blue-600/5 border-l-2 border-l-blue-500" : ""
                                    }`}
                            >
                                <div className="col-span-5 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        {patient.name.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-medium text-sm truncate">{patient.name}</div>
                                        <div className="text-xs text-gray-500">{patient.age}y • {patient.gender}</div>
                                    </div>
                                </div>
                                <div className="col-span-3 flex items-center text-sm text-gray-400">{patient.condition}</div>
                                <div className="col-span-2 flex items-center">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${patient.status === "Critical"
                                            ? "bg-red-500/10 text-red-400"
                                            : patient.status === "Follow-up"
                                                ? "bg-yellow-500/10 text-yellow-400"
                                                : "bg-green-500/10 text-green-400"
                                        }`}>
                                        {patient.status}
                                    </span>
                                </div>
                                <div className="col-span-2 flex items-center text-sm text-gray-500">{patient.visits}</div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Patient Detail Panel */}
                <div className="lg:col-span-1">
                    {selected ? (
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/[0.02] border border-white/10 rounded-xl p-6 sticky top-6"
                        >
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-xl font-bold mb-3">
                                    {selected.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <h3 className="font-semibold text-lg">{selected.name}</h3>
                                <p className="text-sm text-gray-400">{selected.age}y • {selected.gender}</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Condition</span>
                                    <span className="font-medium">{selected.condition}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Last Visit</span>
                                    <span className="font-medium">{selected.lastVisit}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Total Visits</span>
                                    <span className="font-medium">{selected.visits}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Status</span>
                                    <span className={`font-medium ${selected.status === "Critical" ? "text-red-400" :
                                            selected.status === "Follow-up" ? "text-yellow-400" : "text-green-400"
                                        }`}>{selected.status}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Link
                                    href="/doctor/prescriptions"
                                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <FileText size={14} /> Write Prescription
                                </Link>
                                <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-gray-300 transition-colors flex items-center justify-center gap-2">
                                    <Calendar size={14} /> Schedule Follow-up
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                            <User size={32} className="text-gray-600 mb-3" />
                            <p className="text-gray-500 text-sm">Select a patient to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
