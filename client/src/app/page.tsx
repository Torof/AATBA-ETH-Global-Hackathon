"use client"
import { Footer, Header, UserAccount } from "@components/index"
import { useAddress } from "@thirdweb-dev/react"

export default function Home() {
    const address = useAddress()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <section>
                {!address ? (
                    <div> Please Sign In using a Wallet or Login </div>
                ) : (
                    <div className="w-screen max-w-5xl max-h-full">
                        <UserAccount address={address} />{" "}
                    </div>
                )}
            </section>
        </main>
    )
}
