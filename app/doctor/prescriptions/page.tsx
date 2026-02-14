"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Send, FileText, User, Search, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const patients = [
    { id: 1, name: "Michael P.", age: 34, gender: "M", lastVisit: "Feb 10" },
    { id: 2, name: "Sarah J.", age: 28, gender: "F", lastVisit: "Feb 12" },
    { id: 3, name: "David L.", age: 45, gender: "M", lastVisit: "Jan 28" },
];

export default function PrescriptionsPage() {
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
    const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);
    const [diagnosis, setDiagnosis] = useState("");
    const [notes, setNotes] = useState("");
    const [isSent, setIsSent] = useState(false);

    const addMedicine = () => {
        setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
    };

    const removeMedicine = (index: number) => {
        const newMedicines = [...medicines];
        newMedicines.splice(index, 1);
        setMedicines(newMedicines);
    };

    const updateMedicine = (index: number, field: string, value: string) => {
        const newMedicines = [...medicines];
        (newMedicines[index] as any)[field] = value;
        setMedicines(newMedicines);
    };

    const handleSend = () => {
        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            // Reset form or show success message permanently
            // For demo, we just toggle back after a delay
        }, 3000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Write Prescription</h1>
                    <p className="text-gray-400 text-sm">Create and digitally sign prescriptions for patients</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                        <Save size={16} /> Save Draft
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Patient Selection */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <User size={18} className="text-blue-400" /> Select Patient
                        </h3>
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search patient..."
                                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500/50"
                            />
                        </div>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                            {patients.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedPatient(p.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors border ${selectedPatient === p.id
                                            ? "bg-blue-600/10 border-blue-500/30"
                                            : "bg-white/5 border-transparent hover:bg-white/10"
                                        }`}
                                >
                                    <div>
                                        <div className={`font-medium ${selectedPatient === p.id ? "text-blue-400" : "text-gray-200"}`}>{p.name}</div>
                                        <div className="text-xs text-gray-500">{p.age} {p.gender} • Last: {p.lastVisit}</div>
                                    </div>
                                    {selectedPatient === p.id && <CheckCircle size={16} className="text-blue-500" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Prescription Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 relative">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">New Prescription</h2>
                                    <p className="text-sm text-gray-400">ID: #RX-2026-8821</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-300">Date</div>
                                <div className="text-sm text-gray-500">Feb 14, 2026</div>
                            </div>
                        </div>

                        {/* Diagnosis */}
                        <div className="mb-6 space-y-2">
                            <label className="text-sm font-medium text-gray-300">Diagnosis / Chief Complaint</label>
                            <textarea
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500/50 min-h-[80px]"
                                placeholder="e.g. Acute Viral Bronchitis with mild fever..."
                            />
                        </div>

                        {/* Medicines */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-gray-300">Medications</label>
                                <button onClick={addMedicine} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                    <Plus size={14} /> Add Medicine
                                </button>
                            </div>

                            <div className="space-y-3">
                                <AnimatePresence>
                                    {medicines.map((med, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="grid grid-cols-12 gap-3 items-center"
                                        >
                                            <div className="col-span-1 text-center text-gray-500 text-xs font-mono">{index + 1}</div>
                                            <div className="col-span-5">
                                                <input
                                                    type="text"
                                                    placeholder="Medicine Name"
                                                    value={med.name}
                                                    onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:border-blue-500/50 outline-none"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    type="text"
                                                    placeholder="1-0-1"
                                                    value={med.dosage}
                                                    onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:border-blue-500/50 outline-none"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <input
                                                    type="text"
                                                    placeholder="5 Days"
                                                    value={med.duration}
                                                    onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:border-blue-500/50 outline-none"
                                                />
                                            </div>
                                            <div className="col-span-1 text-right">
                                                <button onClick={() => removeMedicine(index)} className="text-gray-500 hover:text-red-400 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="mb-8 space-y-2">
                            <label className="text-sm font-medium text-gray-300">Advice / Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500/50 min-h-[80px]"
                                placeholder="e.g. Drink plenty of water, avoid cold foods..."
                            />
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-end pt-6 border-t border-white/5">
                            {isSent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="px-6 py-3 bg-green-500/20 text-green-400 rounded-xl flex items-center gap-2 font-medium border border-green-500/50"
                                >
                                    <CheckCircle size={20} /> Prescription Sent
                                </motion.div>
                            ) : (
                                <button
                                    onClick={handleSend}
                                    disabled={!selectedPatient}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg shadow-blue-900/20"
                                >
                                    <Send size={18} /> Sign & Send Prescription
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
