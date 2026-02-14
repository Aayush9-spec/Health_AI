"use client";

import { Calendar, Clock, MapPin, User, CheckCircle } from "lucide-react";
import { useState } from "react";

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Chen",
        specialty: "General Physician",
        location: "City Hospital, Block A",
        time: "10:00 AM - 11:00 AM",
        date: "Today, Feb 14",
        image: "bg-blue-500",
    },
    {
        id: 2,
        name: "Dr. Michael Ross",
        specialty: "Neurologist",
        location: "Neuro Clinic, Downtown",
        time: "02:00 PM - 03:00 PM",
        date: "Tomorrow, Feb 15",
        image: "bg-purple-500",
    },
];

export default function AppointmentsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Appointments</h1>
                    <p className="text-gray-400 text-sm">Manage your scheduled visits</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-sm text-sm font-medium transition-colors">
                    + New Booking
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-white/10 text-sm font-medium">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`pb-3 transition-colors ${activeTab === "upcoming"
                            ? "text-purple-400 border-b-2 border-purple-400"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`pb-3 transition-colors ${activeTab === "history"
                            ? "text-purple-400 border-b-2 border-purple-400"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    History
                </button>
            </div>

            {/* List */}
            <div className="grid gap-4">
                {activeTab === "upcoming" ? (
                    doctors.map((doc) => (
                        <div
                            key={doc.id}
                            className="p-5 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.04] transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center"
                        >
                            {/* Doctor Avatar */}
                            <div className={`w-12 h-12 rounded-full ${doc.image} flex items-center justify-center text-white font-bold text-lg`}>
                                {doc.name[0]}
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-1">
                                <h3 className="font-semibold text-lg">{doc.name}</h3>
                                <p className="text-gray-400 text-sm">{doc.specialty}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={12} /> {doc.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} /> {doc.time}
                                    </div>
                                </div>
                            </div>

                            {/* Status/Action */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium border border-green-500/20">
                                    <CheckCircle size={12} /> Confirmed
                                </div>
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors text-white">
                                    Reschedule
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center py-20">No past appointments found.</div>
                )}
            </div>
        </div>
    );
}
