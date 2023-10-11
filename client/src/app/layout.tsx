"use client";

import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThirdwebProvider
                    clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
                    activeChain={Sepolia}
                >
                    {children}
                </ThirdwebProvider>
            </body>
        </html>
    );
}
