"use client"

import { PageBanner, SymbolAddress, Title } from "@root/app/components"
import { useEducationStore, useHackathonStore, useSimpleUserStore, useWorkStore } from "@root/app/context"
import { useEvents, useSimpleContract, useSubProfileTBA } from "@root/app/hooks"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SubProfile } from "../../../../../typings"

type Props = {
    params: { profile: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { profile }, searchParams }: Props) => {
    // const address = useAddress()
    // const [getUserAccount] = useUserAccountFactory()
    // const userAccountResponse = getUserAccount()

    // initial array
    const [subProfiles, setSubProfiles] = useState<SubProfile[]>([
        { id: 0, name: "Work", profilePic: "/work.png", contract: [], subProfileAddress: "" },
        { id: 1, name: "Hackathon", profilePic: "/hackathon.png", contract: [], subProfileAddress: "" },
        { id: 2, name: "Education", profilePic: "/education.png", contract: [], subProfileAddress: "" },
        { id: 3, name: "Create", profilePic: "/create.png", contract: [], subProfileAddress: "" },
    ])

    // global state
    const { simpleUserAccount, setSimpleUserAccount } = useSimpleUserStore()
    const { workSubProfileAddress, setWorkSubProfileAddress } = useWorkStore()
    const { hackathonSubProfileAddress, setHackathonSubProfileAddress } = useHackathonStore()
    const { educationSubProfileAddress, setEducationSubProfileAddress } = useEducationStore()

    let work: any
    let hackathon: any
    let education: any
    // Get data from SimpleAccount contract
    const [getSubProfile] = useSimpleContract()
    profile === "Work" ? (work = getSubProfile(0)) : profile === "Hackathon" ? (hackathon = getSubProfile(1)) : (education = getSubProfile(2))
    // const work = getSubProfile(0)
    // const hackathon = getSubProfile(1)
    // const education = getSubProfile(2)
    // console.log(work, hackathon, education);

    const [getSubProfileBadges] = useSubProfileTBA()
    const badges1 = getSubProfileBadges(workSubProfileAddress)
    const badges2 = getSubProfileBadges(hackathonSubProfileAddress)
    const badges3 = getSubProfileBadges(educationSubProfileAddress)

    console.log("00000", badges1)
    console.log("11111", badges2)
    console.log("22222", badges3)

    // look for events in the smart contract
    const [getUserAccountCreatedEvents, getReceivedERC721Events, getAllEvents, getBadgeAddedEvents] = useEvents()
    const events1 = getAllEvents(workSubProfileAddress)
    const events2 = getAllEvents(hackathonSubProfileAddress)
    const events3 = getAllEvents(educationSubProfileAddress)
    const sbt1 = getAllEvents("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9")

    events1 && console.log("=====> Event workSubProfileAddress: ", events1)
    events1 && console.log("=====> Event workSubProfileAddress: ", events2)
    events1 && console.log("=====> Event workSubProfileAddress: ", events3)
    // console.log("=====> Event hackathonSubProfileAddress: ", events2)
    sbt1 && console.log("=====> Event sbt1: ", sbt1?.data)

    // append the subProfile contract to the initial state
    // Todo: move to globale state
    useEffect(() => {
        if ((work?.data && !work?.isLoading) || (hackathon?.data && !hackathon?.isLoading) || (education?.data && !education?.isLoading)) {
            const updatedArray: any = subProfiles.map((profile) => {
                setWorkSubProfileAddress(work?.data?.subProfileAddress)
                if (profile.name === "Work") {
                    return {
                        ...profile,
                        contract: work?.data,
                        subProfileAddress: work?.data?.subProfileAddress,
                    }
                }
                if (profile.name === "Hackathon") {
                    setHackathonSubProfileAddress(hackathon?.data?.subProfileAddress)
                    return {
                        ...profile,
                        contract: hackathon?.data,
                        subProfileAddress: hackathon?.data?.subProfileAddress,
                    }
                }
                if (profile.name === "Education") {
                    setEducationSubProfileAddress(education?.data?.subProfileAddress)
                    return {
                        ...profile,
                        contract: education?.data,
                        subProfileAddress: education?.data?.subProfileAddress,
                    }
                } else if (profile.name === "Create") {
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
            <PageBanner subProfile={profile} />
            <div className="flex flex-col items-center justify-center">
                <div className="mb-12 mt-24 flex w-screen max-w-6xl items-center justify-between">
                    <Title title={profile} cn="text-4xl" />
                    <div className="flex flex-col items-end">
                        <div>Achieved by:</div>
                        {workSubProfileAddress && profile === "Work" ? (
                            <SymbolAddress user={workSubProfileAddress} cn={"text-muted-foreground"} />
                        ) : hackathonSubProfileAddress && profile === "Hackathon" ? (
                            <SymbolAddress user={hackathonSubProfileAddress} cn={"text-muted-foreground"} />
                        ) : educationSubProfileAddress && profile === "Education" ? (
                            <SymbolAddress user={educationSubProfileAddress} cn={"text-muted-foreground"} />
                        ) : null}
                    </div>
                </div>

                <div className="mx-auto mb-44 flex w-full max-w-6xl flex-col items-center justify-center gap-4 md:flex-row">
                    {/* <Sidebar /> */}
                    <div className="flex w-1/3 flex-col border border-purple-600">
                        <div> Card </div>
                        <div> Text </div>
                        <div> Chain Info </div>
                    </div>
                    {/* achievements */}
                    <div className="achievements flex w-2/3 flex-col rounded-3xl border border-pink-300 p-4">
                        <div className="p-12">
                            <div className="min-w-44 relative rounded-2xl pb-10">
                                <div
                                    className="absolute -inset-px z-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-400"
                                    aria-hidden="true"
                                ></div>
                                <div className="absolute inset-0 z-0 rounded-2xl bg-[#FEF5FF] dark:bg-zinc-900" aria-hidden="true"></div>
                                <div className="absolute z-10 w-full px-2 text-center text-3xl font-normal text-zinc-900 dark:text-zinc-100">Achievements</div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto" />
                        </div>
                    </div>
                </div>

                {/* Achievement */}
                {/* <SubProfileCard contract={`${profile}.data`} userAddress={userAddress} profile={subProfile} simpleUser={simpleUserAccount} /> */}
                {/* <ChainInfo /> */}
            </div>
        </>
    )
}

export default page
