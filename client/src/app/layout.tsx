"use client"

import { Sepolia } from "@thirdweb-dev/chains"
import { ThirdwebProvider, magicLink, metamaskWallet, walletConnect } from "@thirdweb-dev/react"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import { Footer, Header } from "./components"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ThirdwebProvider
                        clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
                        activeChain={Sepolia}
                        supportedWallets={[
                            metamaskWallet({ recommended: true }),
                            walletConnect(),
                            magicLink({
                                apiKey: "pk_live_A19078A9C077329E",
                                oauthOptions: {
                                    providers: ["github", "linkedin", "google", "discord", "twitter"],
                                },
                            }),
                        ]}
                    >
                        <header className="z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-between space-y-4 md:flex-row md:py-8 mb-20">
                            <Header />
                        </header>
                        {children}
                        <footer className="z-10 mt-20 flex w-screen items-center justify-center p-12">
                            <Footer />
                        </footer>
                    </ThirdwebProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
