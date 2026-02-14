"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
// Dynamic import for Web3Providers to avoid SSR mismatch issues with Wagmi
import dynamic from 'next/dynamic';

const Web3Providers = dynamic(
    () => import('@/components/Web3Providers').then((mod) => mod.Web3Providers),
    { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <Web3Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </Web3Providers>
    );
}
