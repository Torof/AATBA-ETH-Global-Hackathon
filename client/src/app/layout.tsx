"use client";

import { Sepolia } from "@thirdweb-dev/chains";
import {
    ThirdwebProvider,
    magicLink,
    metamaskWallet,
    walletConnect,
} from "@thirdweb-dev/react";
import { ThemeProvider } from "next-themes";
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
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >

                <ThirdwebProvider
                    clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
                    activeChain={Sepolia}
                    supportedWallets={[
                        metamaskWallet({ recommended: true }),
                        walletConnect(),
                        magicLink({
                            apiKey: "pk_live_A19078A9C077329E",
                            oauthOptions: {
                                providers: [
                                    "github",
                                    "linkedin",
                                    "google",
                                    "discord",
                                    "twitter",
                                ],
                            },
                        }),
                    ]}
                    >
                    {children}
                </ThirdwebProvider>
                    </ThemeProvider>
            </body>
        </html>
    );
}
