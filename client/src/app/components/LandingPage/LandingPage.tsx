import Image from "next/image"
import { SocialIcon } from "react-social-icons"
import { PageBanner } from ".."

type Props = {}

const LandingPage = (props: Props) => {
    const team = [
        { id: 0, name: "Hojay", li: "https://www.linkedin.com/in/hojay/", x: "https://twitter.com/hojayxyz", pfp: "1.png" },
        {
            id: 1,
            name: "Kalpita",
            li: "https://www.linkedin.com/in/kalpita-mandal-220974153/",
            x: "https://twitter.com/KalpitaMandal",
            git: "https://github.com/KalpitaMandal",
            pfp: "2.png",
        },
        { id: 2, name: "Torof", git: "https://github.com/Torof", pfp: "3.png" },
        {
            id: 3,
            name: "Ray",
            li: "https://www.linkedin.com/in/rvelse/",
            x: "https://twitter.com/ray_pingwing",
            git: "https://github.com/r-bytes",
            pfp: "4.png",
        },
        {
            id: 4,
            name: "Camilo León",
            li: "https://www.linkedin.com/in/camilo-leon/",
            x: "https://twitter.com/cryptocuentos",
            be: "https://www.behance.net/welcome2dsimulation",
            pfp: "5.png",
        },
    ]
    return (
        <div>
            <PageBanner cn="bg-gradient-to-r from-[#DAFBE3] to-[#E3E2FD] p-4 shadow drop-shadow-lg dark:from-[#7faa89] dark:to-[#848491] w-screen max-w-sm md:max-w-xl sm:max-w-md lg:max-w-7xl" />
            <Image
                height={700}
                width={700}
                alt="logo aatba"
                src={"/landing/1.png"}
                className="absolute z-30 hidden w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <h1 className="absolute top-44 z-30 mx-auto ml-40 max-w-md bg-gradient-to-r from-fuchsia-300 to-teal-300 bg-clip-text text-3xl font-bold text-transparent shadow-slate-800 drop-shadow-2xl sm:ml-52 md:ml-64 md:text-5xl lg:ml-16 lg:max-w-2xl lg:text-7xl">
                Proof of your life Achievements
            </h1>
            <h3 className="absolute top-36 z-30 ml-96 font-bold lg:left-1/2 lg:text-lg lg:tracking-wider">Verified</h3>
            <h3 className="absolute top-80 z-30 ml-24 text-base font-bold sm:ml-52 md:ml-64 lg:ml-16 lg:max-w-2xl lg:text-lg lg:tracking-wider">
                Education, Experience, Awards, and MORE!
            </h3>
            <div className="mx-auto flex max-w-md flex-col gap-4 py-20 text-center md:max-w-lg lg:w-full lg:max-w-5xl mt-12">
                <h2 className="text-5xl font-black tracking-wider">Trustless & Verifiable profiles</h2>
                <h4 className="tracking wide font-medium">With Security and Privacy Fully On-Chain</h4>
            </div>
            <div className="mb-12 flex w-full flex-col gap-8 px-16 lg:flex-row">
                <div className="relative mx-auto h-[38rem] rounded-3xl bg-[#A7D790] px-8 lg:w-1/2">
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
                <div className="relative mx-auto h-[38rem] rounded-3xl bg-[#F8B6B6] px-8 lg:w-1/2">
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
                className="z-30 mx-auto w-auto object-contain px-4 md:right-0 md:top-0 lg:block"
            />
            <h2 className="my-12 text-center text-5xl font-black tracking-wider">
                How <span className="bg-gradient-to-br from-violet-600 to-teal-300 bg-clip-text text-transparent"> AATBA </span> Works?
            </h2>
            <Image
                height={1200}
                width={1200}
                alt="logo aatba"
                src={"/landing/7.png"}
                className="z-30 mx-auto w-auto object-contain md:right-0 md:top-0 lg:block"
            />
            <div className="mx-auto my-12 flex max-w-md justify-center gap-4 lg:max-w-5xl">
                <Image
                    height={1200}
                    width={1200}
                    alt="logo aatba"
                    src={"/landing/eth.png"}
                    className="z-30 hidden w-auto object-contain md:right-0 md:top-0 lg:block"
                />
                <h2 className="my-8 text-center text-5xl font-black tracking-wider">Powered by Ethereum</h2>
                <Image
                    height={1200}
                    width={1200}
                    alt="logo aatba"
                    src={"/landing/eth.png"}
                    className="z-30 hidden w-auto object-contain md:right-0 md:top-0 lg:block"
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
            <h2 className="my-12 mt-12 text-center text-5xl font-black tracking-wider">
                The <span className="bg-gradient-to-br from-violet-600 to-teal-300 bg-clip-text text-transparent"> A </span> Team
            </h2>
            {/* profiles */}
            <div className="mx-auto mb-32 flex max-w-sm flex-wrap items-center justify-center gap-4 sm:max-w-md md:max-w-5xl">
                {team.map((t) => (
                    <div key={t.id} className="flex flex-col items-center justify-center">
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
