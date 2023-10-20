"use client"

import { GetBatchButton, MintNFTButton, PageBanner, SymbolAddress, Title } from "@root/app/components"
import { useEducationStore, useHackathonStore, useSimpleUserStore, useWorkStore } from "@root/app/context"
import { useEvents, useSimpleContract, useSubProfileTBA, useUserAccountFactory } from "@root/app/hooks"
import { useAddress } from "@thirdweb-dev/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SubProfile } from "../../../../../typings"
import SubProfileBadges from "@root/app/components/SubProfile/SubProfileBadges"

type Props = {
    params: { profile: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { profile }, searchParams }: Props) => {
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


    // Get data from SimpleAccount contract
    const [getSubProfile] = useSimpleContract()
    const [getSubProfileBadges] = useSubProfileTBA()
    

    useEffect(() => {
        if (userAccountResponse && userAccountResponse.data && !userAccountResponse?.isLoading) {
            setSimpleUserAccount(userAccountResponse.data)
        }
    }, [userAccountResponse && userAccountResponse.data && !userAccountResponse.isLoading])

    // fetch address according to url
    profile === "Work"
        ? (work = getSubProfile(0, simpleUserAccount))
        : profile === "Hackathon"
        ? (hackathon = getSubProfile(1, simpleUserAccount))
        : (education = getSubProfile(2, simpleUserAccount))


    // console.log("00000", badges1)
    // console.log("11111", badges2)
    // console.log("22222", badges3)

    // // look for events in the smart contract
    const [getUserAccountCreatedEvents, getReceivedERC721Events, getAllEvents, getBadgeAddedEvents] = useEvents()
    // const events1 = getAllEvents(workSubProfileAddress)
    // const events2 = getAllEvents(hackathonSubProfileAddress)
    // const events3 = getAllEvents(educationSubProfileAddress)
    const sbt1 = getAllEvents("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9")

    // events1 && console.log("=====> Event workSubProfileAddress: ", events1)
    // events1 && console.log("=====> Event workSubProfileAddress: ", events2)
    // events1 && console.log("=====> Event workSubProfileAddress: ", events3)
    // console.log("=====> Event hackathonSubProfileAddress: ", events2)
    sbt1 && console.log("=====> Event sbt1: ", sbt1?.data)

    // append the subProfile contract to the initial state
    // Todo: move to globale state
    useEffect(() => {
        if ((work?.data && !work?.isLoading) || (hackathon?.data && !hackathon?.isLoading) || (education?.data && !education?.isLoading)) {
            const updatedArray: any = subProfiles.map((profile) => {
                if (profile.name === "Work") {
                    work?.data && setWorkSubProfileAddress(work?.data?.subProfileAddress)
                    return {
                        ...profile,
                        contract: work?.data,
                        subProfileAddress: work?.data?.subProfileAddress,
                    }
                }
                if (profile.name === "Hackathon") {
                    hackathon?.data && setHackathonSubProfileAddress(hackathon?.data?.subProfileAddress)
                    return {
                        ...profile,
                        contract: hackathon?.data,
                        subProfileAddress: hackathon?.data?.subProfileAddress,
                    }
                }
                if (profile.name === "Education") {
                    education?.data && setEducationSubProfileAddress(education?.data?.subProfileAddress)
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

    
    // if(workSubProfileAddress && !userAccountResponse?.isLoading) {
    //     console.log(getSubProfileBadges(workSubProfileAddress));
        
    // } else if(hackathonSubProfileAddress) {
    //     console.log(getSubProfileBadges(hackathonSubProfileAddress))
        
    // } else if(educationSubProfileAddress){
    //     console.log(getSubProfileBadges(educationSubProfileAddress))

    // }


    
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

                <div className="mb-44 flex w-full max-w-6xl items-center justify-center border border-red-700">
                    {workSubProfileAddress && profile === "Work" ? (
                        <div className="flex flex-col gap-8">
                            <h3> SubProfile address: {workSubProfileAddress} </h3>
                            <MintNFTButton to={workSubProfileAddress} />
                            {/* <MintNFTButton nft={2} to={workAddress} /> */}
                            <GetBatchButton subProfileAddress={workSubProfileAddress} />
                        </div>
                    ) : hackathonSubProfileAddress && profile === "Hackathon" ? (
                        <div className="flex flex-col gap-8">
                            <h3> SubProfile address: {hackathonSubProfileAddress} </h3>
                            <MintNFTButton to={hackathonSubProfileAddress} />
                            {/* <MintNFTButton nft={2} to={hackathonAddress} /> */}
                            <GetBatchButton subProfileAddress={hackathonSubProfileAddress} />
                        </div>
                    ) : educationSubProfileAddress && profile === "Education" ? (
                        <div className="flex flex-col gap-8">
                            <h3> SubProfile address: {educationSubProfileAddress} </h3>
                            <MintNFTButton to={educationSubProfileAddress} />
                            {/* <MintNFTButton nft={2} to={educationSubProfileAddress} /> */}
                            <GetBatchButton subProfileAddress={educationSubProfileAddress} />
                        </div>
                    ) : null}

            

                </div>
                <div className="mx-auto mb-44 flex w-full max-w-6xl flex-col items-center justify-center gap-4 md:flex-row">
                    {/* <Sidebar /> */}
                    <div className="flex w-1/4 flex-col">
                        {profile === "Work" ? (
                            <div className="flex flex-col gap-8">
                                <Image height={200} width={200} alt="logo aatba" src={"/work.png"} className="h-96 w-auto rounded-3xl" />
                            </div>
                        ) : profile === "Hackathon" ? (
                            <div className="flex flex-col gap-8">
                                <Image height={200} width={200} alt="logo aatba" src={"/hackathon.png"} className="h-96 w-auto rounded-3xl" />
                            </div>
                        ) : profile === "Education" ? (
                            <div className="flex flex-col gap-8">
                                <Image height={200} width={200} alt="logo aatba" src={"/education.png"} className="h-96 w-auto rounded-3xl" />
                            </div>
                        ) : null}
                        <div>
                            <p className="mt-4 leading-relaxed">
                                You like to keep on keeping it on, challenging yourself, testing your skills. This profile shows how skilled you are,
                                let the people know you’re the GOAT.
                            </p>
                        </div>
                        <div className="mt-16 rounded-3xl border border-pink-300 p-4">
                            <h3> On Chain Info</h3>
                            <div className="flex justify-between">
                                <span> Contract Address</span>
                                <span>0x .... </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Chain:</span>
                                <span>Ethereum</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Date Minted</span>
                                <span>Sept 25, 2023</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Token Standard</span>
                                <span> ERC-4337 </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Token Id</span>
                                <span>#68714</span>
                            </div>
                        </div>
                    </div>
                    {/* achievements */}
                    <div className="achievements flex flex-1 flex-col rounded-3xl border border-pink-300 p-4">
                        <div className="p-12">
                            <div className="min-w-44 relative rounded-2xl pb-10">
                                <div
                                    className="absolute -inset-px z-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-400"
                                    aria-hidden="true"
                                ></div>
                                <div className="absolute inset-0 z-0 rounded-2xl bg-[#FEF5FF] dark:bg-zinc-900" aria-hidden="true"></div>
                                <div className="absolute z-10 w-full px-2 text-center text-3xl font-normal text-zinc-900 dark:text-zinc-100">
                                    Achievements
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto object-contain" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto object-contain" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto object-contain" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto object-contain" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto object-contain" />
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/ETHGB.png"} className="h-72 w-auto object-contain" />
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
