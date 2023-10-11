"use client";
import Image from "next/image";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-3xl font"> My Profile </h1>
                <ConnectWallet
                    dropdownPosition={{
                        side: "bottom",
                        align: "center",
                    }}
                />
            </div>
        </main>
    );
}
