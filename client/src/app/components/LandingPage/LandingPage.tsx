import Image from "next/image"
import { PageBanner } from ".."

type Props = {}

const LandingPage = (props: Props) => {
    return (
        <div>
            <PageBanner cn="bg-gradient-to-r from-[#DAFBE3] to-[#E3E2FD] p-4 shadow drop-shadow-lg dark:from-[#7faa89] dark:to-[#848491] w-screen max-w-5xl" />
            <Image
                height={700}
                width={700}
                alt="logo aatba"
                src={"/landing/1.png"}
                className="absolute z-30 hidden w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <h1 className="absolute top-44 z-30 ml-16 max-w-2xl bg-gradient-to-r from-fuchsia-300 to-teal-300 bg-clip-text text-7xl font-bold text-transparent shadow-slate-800 drop-shadow-2xl">
                Proof of your life Achievements
            </h1>
            <h3 className="absolute left-1/2 top-36 z-30 text-lg font-bold tracking-wider">Verified</h3>
            <h3 className="absolute top-80 z-30 ml-16 text-lg font-bold tracking-wider">Education, Experience, Awards, and MORE!</h3>

            <div className="flex flex-col w-full py-20 text-center gap-4">
                <h2 className="text-5xl font-black tracking-wider">Trustless & Verifiable profiles</h2>
                <h4 className="tracking wide font-medium">With Security and Privacy Fully On-Chain</h4>
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/4.png"}
                className="mx-auto z-30 w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/7.png"}
                className="mx-auto z-30 w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/5.png"}
                className="mx-auto z-30 w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/5.png"}
                className="mx-auto z-30 w-auto object-contain md:right-0 md:top-0 lg:block"
            />
        </div>
    )
}

export default LandingPage
