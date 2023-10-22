"use client"

// import { Sepolia } from "@thirdweb-dev/chains"
import { ChainId, ThirdwebProvider, magicLink, metamaskWallet, walletConnect } from "@thirdweb-dev/react"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import { Footer, Header } from "./components"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <ThirdwebProvider
                        clientId={process.env.NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
                        activeChain={ChainId.Mumbai}
                        supportedWallets={[
                            metamaskWallet({ recommended: true }),
                            walletConnect(),

                            magicLink({
                                apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY!,
                                oauthOptions: {
                                    providers: ["github", "linkedin", "google", "discord", "twitter"],
                                },
                            }),
                        ]}
                    >
                        <header className="fixed z-50 mx-auto mb-20 flex w-screen flex-col items-center justify-between space-y-4 backdrop-blur-lg  dark:backdrop-brightness-50 md:flex-row md:py-8">
                            <Header />
                        </header>
                        {/* <div className="w-full h-44"></div> */}
                        {children}
                        <footer className="z-10 flex w-screen items-center justify-center bg-black p-12">
                            <Footer />
                        </footer>
                    </ThirdwebProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
