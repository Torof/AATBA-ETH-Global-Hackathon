import Image from "next/image"
import { SocialIcon } from "react-social-icons"
import { PageBanner } from ".."

type Props = {}

const LandingPage = (props: Props) => {
    const team = [
        { id: 0, name: "Hojay Lee", li: "https://www.linkedin.com/in/hojay/", x: "https://twitter.com/hojayxyz", pfp: "1.png" },
        {
            id: 1,
            name: "Kalpita Mandal",
            li: "https://www.linkedin.com/in/kalpita-mandal-220974153/",
            x: "https://twitter.com/KalpitaMandal",
            git: "https://github.com/KalpitaMandal",
            pfp: "2.png",
        },
        { id: 2, name: "Scott Devines", git: "https://github.com/Torof", pfp: "3.png" },
        {
            id: 3,
            name: "Ray Sol",
            li: "https://www.linkedin.com/in/kalpita-mandal-220974153/",
            x: "https://twitter.com/ray_pingwing",
            git: "https://github.com/r-bytes",
            pfp: "4.png",
        },
        { id: 4, name: "Camilo León", li: "", x: "", be: "", pfp: "5.png" },
    ]
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
            <div className="flex w-full flex-col gap-4 py-20 text-center">
                <h2 className="text-5xl font-black tracking-wider">Trustless & Verifiable profiles</h2>
                <h4 className="tracking wide font-medium">With Security and Privacy Fully On-Chain</h4>
            </div>
            <div className="mb-12 flex w-full gap-8 px-16">
                <div className="relative h-[38rem] w-1/2 rounded-3xl bg-[#A7D790] px-8">
                    <div className="max-w-md">
                        <h2 className="py-6 text-5xl font-black tracking-wider">Account Abstraction</h2>
                        <p className="mb-4">Smart profiles need smart accounts!</p>

                        <p>Don't panic on losing yours, access to social recovery thanks to smart contracts.</p>
                    </div>
                    <Image
                        height={400}
                        width={400}
                        alt="logo aatba"
                        src={"/landing/2.png"}
                        className="absolute bottom-0 left-0 z-30 mx-auto w-auto object-contain"
                    />
                </div>
                <div className="relative h-[38rem] w-1/2 rounded-3xl bg-[#F8B6B6] px-8">
                    <div className="max-w-md">
                        <h2 className="py-6 text-5xl font-black tracking-wider">Token Bound Account</h2>
                        <p className="mb-4">One account to rule them all!</p>
                        <p>Don't worry on creating multiple accounts anymore, your life will be easy to manage in one single dApp.</p>
                    </div>
                    <Image
                        height={400}
                        width={400}
                        alt="logo aatba"
                        src={"/landing/3.png"}
                        className="absolute bottom-0 left-0 z-30 mx-auto w-auto rounded-3xl object-contain"
                    />
                </div>
            </div>
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/4.png"}
                className="z-30 mx-auto w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <h2 className="my-8 text-center text-5xl font-black tracking-wider">
                How <span className="bg-gradient-to-br from-violet-600 to-teal-300 bg-clip-text text-transparent"> AATBA </span> Works?
            </h2>
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/7.png"}
                className="z-30 mx-auto w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <div className="mx-auto flex max-w-5xl justify-center gap-4">
                <Image
                    height={1200}
                    width={1200}
                    alt="logo aatba"
                    src={"/landing/eth.png"}
                    className=" z-30 w-auto object-contain md:right-0 md:top-0 lg:block"
                />
                <h2 className="my-8 text-center text-5xl font-black tracking-wider">Powered by Ethereum</h2>
                <Image
                    height={1200}
                    width={1200}
                    alt="logo aatba"
                    src={"/landing/eth.png"}
                    className=" z-30 w-auto object-contain md:right-0 md:top-0 lg:block"
                />
            </div>
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/5.png"}
                className="z-30 mx-auto w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/6.png"}
                className="z-30 mx-auto w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <h2 className="mt-12 my-8 text-center text-5xl font-black tracking-wider">
                The <span className="bg-gradient-to-br from-violet-600 to-teal-300 bg-clip-text text-transparent"> A </span> Team
            </h2>
            {/* profiles */}
            <div className="mx-auto mb-24 mt-16 flex w-full max-w-6xl flex-wrap justify-center gap-6">
                {team.map((t) => (
                    <div key={t.id}>
                        <div className="mb-4 flex h-60 w-48 flex-col justify-between rounded-3xl bg-[#404040]">
                            {/* pfp */}
                            <Image
                                height={400}
                                width={400}
                                alt="logo aatba"
                                src={`/landing/pfp/${t.pfp}`}
                                className="z-30 mx-auto mt-4 w-auto object-contain"
                            />
                            {/* footer */}
                            <div className="h-12 rounded-b-3xl bg-[#F8B6B6] p-3 text-center font-bold tracking-wide"> {t.name} </div>
                        </div>
                        <div className="flex gap-2">
                            {t.x && <SocialIcon url={t.x} bgColor="gray" />}
                            {t.li && <SocialIcon url={t.li} bgColor="gray" />}
                            {t.git && <SocialIcon url={t.git} bgColor="gray" />}
                            {t.be && <SocialIcon url={t.be} bgColor="gray" />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LandingPage
