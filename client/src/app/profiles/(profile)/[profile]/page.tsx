"use client"

import { GetBatchButton, MintNFTButton, PageBanner, SymbolAddress, Title } from "@root/app/components"
import { useEducationStore, useHackathonStore, useSimpleUserStore, useWorkStore } from "@root/app/context"
import { useEvents, useSimpleContract, useSubProfileTBA } from "@root/app/hooks"
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
        { id: 0, name: "Work", profilePic: "/jobs.png", contract: [], subProfileAddress: "" },
        { id: 1, name: "Hackathon", profilePic: "/contest.png", contract: [], subProfileAddress: "" },
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
    


    console.log("00000", badges1);
    console.log("11111", badges2);
    console.log("22222", badges3);

    

    

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
                <div className="mt-24 flex w-screen max-w-6xl items-center justify-between">
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
                <div className="flex h-96 w-full max-w-6xl items-center justify-center">
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
                    {/* <Card /> */}
                    {/* <SubProfileCard contract={`${profile}.data`} userAddress={userAddress} profile={subProfile} simpleUser={simpleUserAccount} /> */}
                    {/* <Text />> */}
                    {/* <ChainInfo /> */}
                    {/* <MintNFTButton to={} /> */}

                    {/* <Achievements  /> */}
                </div>
            </div>
        </>
    )
}

export default page
