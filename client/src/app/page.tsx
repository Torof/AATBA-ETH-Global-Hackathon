"use client"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import { useTheme } from "next-themes"
import { UserAccount } from "./components"

export default function Home() {
    // get MM address
    const userAddress = useAddress()
    const { theme } = useTheme()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-[#FEF5FF] p-12 dark:bg-background">
            <>
                {/* Login to wallet */}
                {!userAddress ? (
                    <section className="flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
                        <ConnectWallet
                            btnTitle="Connect Wallet"
                            displayBalanceToken={"false"}
                            theme={theme === "light" ? "light" : "dark"}
                            dropdownPosition={{
                                side: "bottom",
                                align: "center",
                            }}
                        />
                    </section>
                ) : (
                    <>
                        <UserAccount userAddress={userAddress} />
                    </>
                )}
            </>
        </main>
    )
}
