"use client";

import { FileText, ShoppingBag, Truck, Scan, Pill, Search, MapPin, Upload } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const records = [
    {
        id: "REC-2026-001",
        type: "Prescription",
        doctor: "Dr. Sarah Chen",
        date: "Feb 14, 2026",
        diagnosis: "Viral Fever",
        items: [
            { name: "Paracetamol 650mg", dosage: "1-0-1 (3 days)", price: 0.002 },
            { name: "Vitamin C Supplements", dosage: "0-1-0 (7 days)", price: 0.005 },
        ],
        status: "Pending Order",
    },
    {
        id: "REC-2025-892",
        type: "Report",
        doctor: "Dr. Michael Ross",
        date: "Dec 20, 2025",
        diagnosis: "Regular Checkup",
        items: [],
        status: "Archived",
    }
];

export default function MedicalRecordsPage() {
    const [activeTab, setActiveTab] = useState("prescriptions");
    const [isScanning, setIsScanning] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Medical Records & Pharmacy</h1>
                    <p className="text-gray-400 text-sm">Manage prescriptions, orders, and history</p>
                </div>

                {/* Camera/Scan Feature - As per 'Image Recognition' note */}
                <button
                    onClick={() => setIsScanning(!isScanning)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors"
                >
                    <Scan size={18} className="text-purple-400" />
                    {isScanning ? "Scanning..." : "Scan Medicine"}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-white/10 text-sm font-medium">
                {["Prescriptions", "Orders", "History"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`pb-3 transition-colors capitalize ${activeTab === tab.toLowerCase()
                                ? "text-purple-400 border-b-2 border-purple-400"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid gap-6">
                {activeTab === "prescriptions" && (
                    <>
                        {/* AI Suggestion / Scan UI */}
                        {isScanning && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="bg-black/40 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-purple-500/5 animate-pulse" />
                                <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-purple-500/30 rounded-lg">
                                    <Upload size={32} className="text-purple-400 mb-4" />
                                    <p className="text-sm font-medium">Upload or Capture Medicine Image</p>
                                    <p className="text-xs text-gray-500 mt-1">Our AI will verify the composition</p>
                                </div>
                            </motion.div>
                        )}

                        {records.map((rec) => (
                            <div key={rec.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-6 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{rec.diagnosis}</h3>
                                            <p className="text-gray-400 text-sm">Prescribed by {rec.doctor}</p>
                                            <p className="text-xs text-gray-500 mt-1">{rec.date} • {rec.id}</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-medium border border-yellow-500/20">
                                        {rec.status}
                                    </div>
                                </div>

                                {/* Medicines List */}
                                {rec.items.length > 0 && (
                                    <div className="space-y-3 mb-6">
                                        {rec.items.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <Pill size={16} className="text-gray-400" />
                                                    <div>
                                                        <div className="text-sm font-medium">{item.name}</div>
                                                        <div className="text-xs text-gray-500">{item.dosage}</div>
                                                    </div>
                                                </div>
                                                <div className="font-mono text-sm text-gray-300">{item.price} ETH</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Action: Order Online */}
                                {rec.status === "Pending Order" && (
                                    <div className="flex gap-4 pt-4 border-t border-white/5">
                                        <button className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 transition-colors">
                                            <ShoppingBag size={18} /> Order Medicines
                                        </button>
                                        <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-gray-300 border border-white/10">
                                            View Diagnostics
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}

                {activeTab === "orders" && (
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                        <div className="flex gap-4 items-center mb-6">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                                <Truck size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium">Order #DLV-9921</h3>
                                <p className="text-xs text-gray-500">Arriving in 25 mins • Delivery Partner: Dunzo</p>
                            </div>
                        </div>

                        {/* Mock Map / Track */}
                        <div className="h-32 w-full bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.2),transparent_50%)]"></div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <MapPin size={16} className="text-purple-500 animate-bounce" />
                                Tracking Live
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
