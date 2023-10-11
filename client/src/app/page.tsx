"use client";
import { Footer, Header } from "@components/index";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
    const address = useAddress();

    return (
    
        <main className="flex min-h-screen flex-col items-center justify-between p-12 border">
            <header className="z-10 max-w-5xl mx-auto w-full items-center justify-between font-mono text-sm lg:flex border">
                <Header />
            </header>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                {address ? "Create Profile" : null}
            </div>
            <footer className="z-10 w-screen flex justify-center items-center border p-12">
                <Footer />
            </footer>
        </main>
    );
}
