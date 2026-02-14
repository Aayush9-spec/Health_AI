"use client";

import { Activity, Users, Calendar, DollarSign, ArrowUpRight, Clock, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
    { label: "Today's Appointments", value: "8", change: "+2", icon: <Calendar />, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Total Patients", value: "1,248", change: "+12%", icon: <Users />, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Pending Reports", value: "5", change: "-2", icon: <Activity />, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Revenue (ETH)", value: "4.2", change: "+8%", icon: <DollarSign />, color: "text-green-400", bg: "bg-green-500/10" },
];

const urgentTasks = [
    { id: 1, text: "Review blood reports for Patient #8821", time: "10 mins ago", priority: "High" },
    { id: 2, text: "Approve prescription refill request", time: "1 hour ago", priority: "Medium" },
    { id: 3, text: "Follow up with Michael Ross", time: "2 hours ago", priority: "Low" },
];

export default function DoctorDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Good Morning, Dr. Chen</h1>
                <p className="text-gray-400">Here's your daily practice overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={stat.label}
                        className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Urgent Tasks */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Urgent Actions</h2>
                        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                    </div>
                    <div className="space-y-4">
                        {urgentTasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'
                                        }`} />
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-200">{task.text}</h4>
                                        <span className="text-xs text-gray-500">{task.time}</span>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Appointment Card */}
                <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Clock size={18} className="text-blue-400" /> Up Next
                    </h2>

                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold">
                                MP
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Michael P.</h3>
                                <p className="text-blue-300 text-sm">Follow-up: Viral Fever</p>
                            </div>
                        </div>

                        <div className="flex gap-3 text-sm">
                            <div className="px-3 py-1.5 bg-black/30 rounded-lg text-gray-300 border border-white/5">
                                10:30 AM
                            </div>
                            <div className="px-3 py-1.5 bg-black/30 rounded-lg text-gray-300 border border-white/5">
                                Online Call
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10" />

                        <div className="flex gap-3">
                            <button className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors">
                                Join Call
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-sm font-medium transition-colors">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
