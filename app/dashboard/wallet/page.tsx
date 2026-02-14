"use client";

import { Wallet, ArrowUpRight, ArrowDownLeft, History, CreditCard, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const transactions = [
    {
        id: "tx-1",
        type: "outgoing",
        title: "Dr. Sarah Chen - Consultation",
        date: "Feb 14, 2026 • 10:30 AM",
        amount: "- 0.045 ETH",
        status: "Confirmed",
    },
    {
        id: "tx-2",
        type: "outgoing",
        title: "MedShop - Prescription #8821",
        date: "Feb 12, 2026 • 04:15 PM",
        amount: "- 0.012 ETH",
        status: "Confirmed",
    },
    {
        id: "tx-3",
        type: "incoming",
        title: "Insurance Claim #9920",
        date: "Feb 10, 2026 • 09:00 AM",
        amount: "+ 0.500 ETH",
        status: "Completed",
    },
];

export default function WalletPage() {
    const [copied, setCopied] = useState(false);
    const walletAddress = "0x71C...9A23";

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Web3 Wallet</h1>
                    <p className="text-gray-400 text-sm">Manage your medical payments & insurance</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Mainnet Connected
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-purple-900/50 to-[#0A0A0A] border border-purple-500/20 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total Balance</p>
                                <h2 className="text-4xl font-bold text-white">4.285 ETH</h2>
                                <p className="text-gray-500 text-xs mt-1">≈ $12,450.00 USD</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <Wallet className="text-purple-400" size={24} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/50 rounded-lg text-sm font-mono text-gray-300 transition-colors border border-white/5"
                            >
                                {walletAddress}
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
                >
                    <h3 className="font-semibold text-gray-200 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-purple-600/20 hover:border-purple-600/30 border border-white/5 rounded-xl transition-all group">
                            <div className="p-2 bg-white/5 rounded-full group-hover:bg-purple-600 text-white transition-colors">
                                <ArrowUpRight size={20} />
                            </div>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-white">Send</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-purple-600/20 hover:border-purple-600/30 border border-white/5 rounded-xl transition-all group">
                            <div className="p-2 bg-white/5 rounded-full group-hover:bg-purple-600 text-white transition-colors">
                                <ArrowDownLeft size={20} />
                            </div>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-white">Receive</span>
                        </button>
                        <button className="col-span-2 flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-colors text-sm font-medium text-gray-300">
                            <CreditCard size={16} /> Buy Crypto
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Transactions */}
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <History size={18} className="text-gray-400" /> Recent Transactions
                </h3>
                <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
                    {transactions.map((tx, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            key={tx.id}
                            className="p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "outgoing" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"
                                    }`}>
                                    {tx.type === "outgoing" ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-200">{tx.title}</div>
                                    <div className="text-xs text-gray-500">{tx.date}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`font-mono font-medium ${tx.type === "outgoing" ? "text-white" : "text-green-400"
                                    }`}>
                                    {tx.amount}
                                </div>
                                <div className="text-xs text-gray-500">{tx.status}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
