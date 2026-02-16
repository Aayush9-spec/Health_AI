"use client";

import { User, Bell, Lock, Shield, Smartphone, Globe, ToggleLeft, ToggleRight, LogOut, Save } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const [medicalShare, setMedicalShare] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [faceId, setFaceId] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        // Simulate save — in production, write to Supabase profiles table
        await new Promise((r) => setTimeout(r, 800));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold mb-1">Settings</h1>
                <p className="text-gray-400 text-sm">Manage your account, privacy, and preferences</p>
            </div>

            {/* Profile Section */}
            <form onSubmit={handleSaveProfile} className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <User size={20} className="text-purple-400" /> Profile Information
                    </h2>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <Save size={14} />
                        {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            defaultValue=""
                            placeholder="Enter your full name"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Medical ID</label>
                        <input
                            type="text"
                            value="Auto-generated on signup"
                            readOnly
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue=""
                            placeholder="your@email.com"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            defaultValue=""
                            placeholder="+91 12345 67890"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50"
                        />
                    </div>
                </div>
            </form>

            {/* Privacy & Security */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-green-400" /> Privacy & Security
                </h2>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Share Medical History</div>
                            <div className="text-sm text-gray-400">Allow verified doctors to access your past records</div>
                        </div>
                        <button onClick={() => setMedicalShare(!medicalShare)} className="text-purple-500 hover:text-purple-400 transition-colors">
                            {medicalShare ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600" />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Biometric Login</div>
                            <div className="text-sm text-gray-400">Use FaceID/TouchID for app access</div>
                        </div>
                        <button onClick={() => setFaceId(!faceId)} className="text-purple-500 hover:text-purple-400 transition-colors">
                            {faceId ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600" />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">2-Factor Authentication</div>
                            <div className="text-sm text-gray-400">Extra layer of security for wallet transactions</div>
                        </div>
                        <button className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10">
                            Setup
                        </button>
                    </div>
                </div>
            </div>

            {/* App Preferences */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Smartphone size={20} className="text-blue-400" /> App Preferences
                </h2>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Push Notifications</div>
                            <div className="text-sm text-gray-400">Receive alerts for appointments & medicine delivery</div>
                        </div>
                        <button onClick={() => setNotifications(!notifications)} className="text-purple-500 hover:text-purple-400 transition-colors">
                            {notifications ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-600" />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Language</div>
                            <div className="text-sm text-gray-400">App display language</div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                            <Globe size={14} /> English (US)
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/10">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors font-medium"
                >
                    <LogOut size={18} /> Sign Out
                </button>
            </div>
        </div>
    );
}
