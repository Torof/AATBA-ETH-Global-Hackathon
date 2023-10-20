"use client"

import { PageBanner, SymbolAddress, Title } from "@root/app/components"
import { useEducationStore, useHackathonStore, useSimpleUserStore, useWorkStore } from "@root/app/context"
import { useSimpleContract, useSubProfileTBA, useUserAccountFactory } from "@root/app/hooks"
import { toTitleCase } from "@root/app/utils/helperFunctions"
import { useAddress } from "@thirdweb-dev/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SubProfile } from "../../../../../typings"

type Props = {
    params: { badge: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { badge }, searchParams }: Props) => {
    const DATE = "Sept 25 / 2023"
    const USERADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

    const user = useAddress()

    // get data from smart contract
    const [getUserAccount] = useUserAccountFactory()
    const userAccountResponse = getUserAccount(user!)

    // global state
    const { simpleUserAccount, setSimpleUserAccount } = useSimpleUserStore()
    const { workSubProfileAddress, setWorkSubProfileAddress } = useWorkStore()
    const { hackathonSubProfileAddress, setHackathonSubProfileAddress } = useHackathonStore()
    const { educationSubProfileAddress, setEducationSubProfileAddress } = useEducationStore()

    // initial array
    const [subProfiles, setSubProfiles] = useState<SubProfile[]>([
        { id: 0, name: "Work", profilePic: "/work.png", contract: [], subProfileAddress: workSubProfileAddress },
        { id: 1, name: "Hackathon", profilePic: "/hackathon.png", contract: [], subProfileAddress: hackathonSubProfileAddress },
        { id: 2, name: "Education", profilePic: "/education.png", contract: [], subProfileAddress: educationSubProfileAddress },
        { id: 3, name: "Create", profilePic: "/create.png", contract: [], subProfileAddress: "" },
    ])

    let work: any
    let hackathon: any
    let education: any

    // Get data from contracts
    const [getSubProfile] = useSimpleContract()
    const [getSubProfileBadges] = useSubProfileTBA()

    useEffect(() => {
        if (userAccountResponse && userAccountResponse.data && !userAccountResponse?.isLoading) {
            setSimpleUserAccount(userAccountResponse.data)
        }
    }, [userAccountResponse && userAccountResponse.data && !userAccountResponse.isLoading])

    // fetch address according to url
    badge === "work"
        ? (work = getSubProfile(0, simpleUserAccount))
        : badge === "hackathon"
        ? (hackathon = getSubProfile(1, simpleUserAccount))
        : (education = getSubProfile(2, simpleUserAccount))

    // append the subProfile contract to the initial state
    // Todo: move to globale state
    useEffect(() => {
        if ((work?.data && !work?.isLoading) || (hackathon?.data && !hackathon?.isLoading) || (education?.data && !education?.isLoading)) {
            const updatedArray: any = subProfiles.map((profile) => {
                if (profile.name === "work") {
                    work?.data && setWorkSubProfileAddress(work?.data?.subProfileAddress)
                    return {
                        ...profile,
                        contract: work?.data,
                        subProfileAddress: work?.data?.subProfileAddress,
                    }
                }
                if (profile.name === "hackathon") {
                    hackathon?.data && setHackathonSubProfileAddress(hackathon?.data?.subProfileAddress)
                    return {
                        ...profile,
                        contract: hackathon?.data,
                        subProfileAddress: hackathon?.data?.subProfileAddress,
                    }
                }
                if (profile.name === "education") {
                    education?.data && setEducationSubProfileAddress(education?.data?.subProfileAddress)
                    return {
                        ...profile,
                        contract: education?.data,
                        subProfileAddress: education?.data?.subProfileAddress,
                    }
                } else if (profile.name === "create") {
                    return {
                        ...profile,
                    }
                }
                return profile
            })
            console.log("subProfiles from smart contract:", updatedArray)
            // set the state
            setSubProfiles(updatedArray)
        }
    }, [work?.data || !work?.isLoading, hackathon?.data || !hackathon?.isLoading, education?.data || !education?.isLoading])

    return (
        <>
            <PageBanner subProfile={badge} />
            <div className="flex flex-col items-center justify-center">
                <div className="mb-12 mt-24 flex w-screen max-w-6xl items-center justify-between">
                    <Title title={badge} cn="text-4xl" />
                    <div className="flex flex-col items-end">
                        <div>Achieved by:</div>
                        <h3 className="text-sm text-muted-foreground">
                            {USERADDRESS.substring(0, 5)}"..."{USERADDRESS.substring(USERADDRESS.length - 4)}{" "}
                        </h3>
                        {workSubProfileAddress && badge === "work" ? (
                            <SymbolAddress user={workSubProfileAddress} cn={"text-muted-foreground"} />
                        ) : hackathonSubProfileAddress && badge === "hackathon" ? (
                            <SymbolAddress user={hackathonSubProfileAddress} cn={"text-muted-foreground"} />
                        ) : educationSubProfileAddress && badge === "education" ? (
                            <SymbolAddress user={educationSubProfileAddress} cn={"text-muted-foreground"} />
                        ) : null}
                    </div>
                </div>

                <div className="relative mx-auto mb-44 flex w-full max-w-6xl flex-col items-center justify-center gap-4 dark:text-secondary md:flex-row md:items-start md:justify-start">
                    {/* summary card */}
                    <div className="flex flex-1 flex-col rounded-3xl border bg-gradient-to-r from-[#DAFBE3] to-[#E3E2FD] p-4 shadow drop-shadow-lg dark:from-[#7faa89] dark:to-[#848491]">
                        {/* outer div */}
                        <div className="flex flex-col">
                            {/* two column */}
                            <div className="flex">
                                <div className="mt-4 w-1/4 pl-12">
                                    <Image
                                        height={200}
                                        width={200}
                                        alt="logo aatba"
                                        src={`/badges/${badge}.png`}
                                        className="h-72 w-auto object-contain"
                                    />
                                </div>
                                <div className="w-3/4 pr-12">
                                    <h2 className="py-4 text-xl">
                                        Winning track: <span className="dark:text-white/60 font-light text-muted-foreground"> Polygon </span>
                                    </h2>
                                    <h3 className="text-md mb-4 font-black tracking-wider">{toTitleCase(badge)}</h3>
                                    <p className="max-w-3xl leading-relaxed">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, debitis! Omnis voluptatibus enim rerum
                                        molestiae possimus earum officiis ullam nisi atque? Tempora, sapiente repudiandae dolores nobis optio commodi
                                        quaerat expedita consequatur, unde recusandae aperiam voluptate? Veniam exercitationem ad adipisci minus
                                        delectus velit dolorum maxime, quod unde cum neque accusamus voluptatum magni laudantium sit fuga in illum,
                                        doloremque necessitatibus voluptates? Omnis beatae ad ex voluptatibus a repellendus ratione perferendis maiores
                                        dolore impedit molestias iure quia, eum aliquid accusantium nam exercitationem quibusdam? Eos soluta, iste
                                        veniam fuga vel nostrum blanditiis officiis temporibus quo quas quaerat impedit autem! Quod quidem fugit minima
                                        enim!
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="p-12">
                                    <div className="min-w-44 relative h-24 rounded-2xl pb-10">
                                        <div className="absolute -inset-px z-0 rounded-2xl bg-gradient-to-r from-[#C3FFDC] to-[#DAFFC1] shadow drop-shadow-sm dark:from-[#9cbca9] dark:to-[#a6c094]">
                                            <div className="ml-4 mt-4 flex items-center justify-between">
                                                <div className="flex h-full items-center justify-center gap-4">
                                                    <Image
                                                        height={200}
                                                        width={200}
                                                        alt="logo aatba"
                                                        src={`/pfp.png`}
                                                        className="h-16 w-16 rounded-full object-contain"
                                                    />
                                                    <div className="flex flex-col items-start justify-center text-left">
                                                        <h3>Achieved by</h3>
                                                        <h3 className="text-sm text-muted-foreground dark:text-white/60">
                                                            {USERADDRESS.substring(0, 5)}"..."{USERADDRESS.substring(USERADDRESS.length - 4)}{" "}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col pr-4">
                                                    <h3 className="text-right text-base">Date minted</h3>
                                                    <h3 className="font-semibold"> {DATE} </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
