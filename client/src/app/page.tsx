"use client"
import { Footer, Header, UserAccount } from "@components/index"
import { useAddress } from "@thirdweb-dev/react"

export default function Home() {
    const address = useAddress()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <header className="z-10 flex w-full max-w-5xl flex-col items-center justify-between space-y-4 md:flex-row md:py-12">
                <Header />
            </header>
            <section>
                {!address ? (
                    <div> Please Sign In using a Wallet or Login </div>
                ) : (
                    <div className="w-screen max-w-5xl max-h-full">
                        <UserAccount address={address} />{" "}
                    </div>
                )}
            </section>
            <footer className="z-10 flex w-screen items-center justify-center p-12 mt-20">
                <Footer />
            </footer>
        </main>
    )
}
