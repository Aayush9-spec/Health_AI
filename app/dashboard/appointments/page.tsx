"use client";

import { Calendar, Clock, MapPin, Video, CheckCircle, X, Plus, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Chen",
        specialty: "General Physician",
        location: "Online Meeting",
        time: "10:00 AM - 11:00 AM",
        date: "Today, Feb 15",
        image: "bg-blue-500",
        type: "online",
        meetLink: "https://meet.google.com/med-ai-consult",
    },
    {
        id: 2,
        name: "Dr. Michael Ross",
        specialty: "Neurologist",
        location: "Neuro Clinic, Downtown",
        time: "02:00 PM - 03:00 PM",
        date: "Tomorrow, Feb 16",
        image: "bg-purple-500",
        type: "offline",
        meetLink: null,
    },
];

const availableDoctors = [
    { id: 10, name: "Dr. Emily Park", specialty: "Cardiologist" },
    { id: 11, name: "Dr. James Liu", specialty: "Dermatologist" },
    { id: 12, name: "Dr. Sarah Chen", specialty: "General Physician" },
];

export default function AppointmentsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [showBooking, setShowBooking] = useState(false);
    const [rescheduleId, setRescheduleId] = useState<number | null>(null);
    const [rescheduleDate, setRescheduleDate] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");

    const handleJoinMeet = (meetLink: string | null) => {
        if (meetLink) {
            window.open(meetLink, "_blank", "noopener,noreferrer");
        }
    };

    const handleReschedule = (id: number) => {
        setRescheduleId(id);
    };

    const confirmReschedule = () => {
        // In production: update Supabase appointment row
        setRescheduleId(null);
        setRescheduleDate("");
    };

    const handleBook = () => {
        if (!selectedDoctor || !bookingDate || !bookingTime) return;
        // In production: insert into Supabase appointments table
        setBookingSuccess(true);
        setTimeout(() => {
            setShowBooking(false);
            setBookingSuccess(false);
            setSelectedDoctor(null);
            setBookingDate("");
            setBookingTime("");
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Appointments</h1>
                    <p className="text-gray-400 text-sm">Manage your scheduled visits</p>
                </div>
                <button
                    onClick={() => setShowBooking(true)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 self-start sm:self-auto"
                >
                    <Plus size={16} /> New Booking
                </button>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {showBooking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setShowBooking(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 w-full max-w-md"
                        >
                            {bookingSuccess ? (
                                <div className="flex flex-col items-center py-8">
                                    <CheckCircle size={48} className="text-green-400 mb-4" />
                                    <h3 className="text-lg font-bold mb-1">Appointment Booked!</h3>
                                    <p className="text-gray-400 text-sm">You'll receive a confirmation email shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold">Book Appointment</h3>
                                        <button onClick={() => setShowBooking(false)} className="text-gray-500 hover:text-white">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Select Doctor</label>
                                            <div className="space-y-2">
                                                {availableDoctors.map((doc) => (
                                                    <button
                                                        key={doc.id}
                                                        onClick={() => setSelectedDoctor(doc.id)}
                                                        className={`w-full p-3 rounded-lg text-left transition-colors border text-sm ${selectedDoctor === doc.id
                                                                ? "bg-purple-600/10 border-purple-500/30 text-purple-400"
                                                                : "bg-white/5 border-transparent hover:bg-white/10"
                                                            }`}
                                                    >
                                                        <div className="font-medium">{doc.name}</div>
                                                        <div className="text-xs text-gray-500">{doc.specialty}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Date</label>
                                            <input
                                                type="date"
                                                value={bookingDate}
                                                onChange={(e) => setBookingDate(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 [color-scheme:dark]"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Preferred Time</label>
                                            <input
                                                type="time"
                                                value={bookingTime}
                                                onChange={(e) => setBookingTime(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 [color-scheme:dark]"
                                            />
                                        </div>

                                        <button
                                            onClick={handleBook}
                                            disabled={!selectedDoctor || !bookingDate || !bookingTime}
                                            className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{doc.name}</h3>
                                    {doc.type === "online" && (
                                        <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/20 uppercase font-medium tracking-wide">
                                            Video Call
                                        </span>
                                    )}
                                </div>

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
                                {doc.type === "online" ? (
                                    <button
                                        onClick={() => handleJoinMeet(doc.meetLink)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                                    >
                                        <Video size={16} /> Join Google Meet
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-xs font-medium border border-green-500/20">
                                        <CheckCircle size={12} /> Appointment Confirmed
                                    </div>
                                )}

                                {rescheduleId === doc.id ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="date"
                                            value={rescheduleDate}
                                            onChange={(e) => setRescheduleDate(e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white [color-scheme:dark]"
                                        />
                                        <button
                                            onClick={confirmReschedule}
                                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                                        >
                                            OK
                                        </button>
                                        <button
                                            onClick={() => setRescheduleId(null)}
                                            className="text-gray-500 hover:text-white"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleReschedule(doc.id)}
                                        className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors text-gray-400"
                                    >
                                        Reschedule
                                    </button>
                                )}
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
