"use client"
import { useAddress } from "@thirdweb-dev/react"
import { useTheme } from "next-themes"
import { Dashboard, LandingPage } from "./components"

export default function Home() {
    // get MM address
    const userAddress = useAddress()
    const { theme } = useTheme()

    return (
        <main className="p-12= flex min-h-screen flex-col items-center justify-between bg-[#FEF5FF] dark:bg-background">
            <>
                {/* Login to wallet */}
                {!userAddress ? (
                    <>
                        <LandingPage />
                    </>
                ) : (
                    // <section className="mt-44 flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
                    //     <ConnectWallet
                    //         btnTitle="Connect Wallet"
                    //         displayBalanceToken={"false"}
                    //         theme={theme === "light" ? "light" : "dark"}
                    //         dropdownPosition={{
                    //             side: "bottom",
                    //             align: "center",
                    //         }}
                    //     />
                    // </section>
                    <>
                        <Dashboard userAddress={userAddress} />
                    </>
                )}
            </>
        </main>
    )
}
