"use client"

import { PageBanner, SubProfileCard, SymbolAddress, Title } from "@root/app/components"
import { useSimpleContract, useUserAccountFactory } from "@root/app/hooks"
import { useAddress } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"
import { SubProfile } from "../../../../../typings"

type Props = {
    params: { profile: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { profile }, searchParams }: Props) => {
    console.log(profile)
    const [subProfiles, setSubProfiles] = useState<SubProfile[]>([
        { id: 0, name: "Work", profilePic: "/jobs.png", contract: [] },
        { id: 1, name: "Hackathon", profilePic: "/contest.png", contract: [] },
        { id: 2, name: "Education", profilePic: "/education.png", contract: [] },
        { id: 3, name: "Create", profilePic: "/create.png", contract: [] },
    ])
    const address = useAddress()

    const [getUserAccount] = useUserAccountFactory()
    const userAccountResponse = getUserAccount()

    // get data from smart contract
    const [getSubProfile] = useSimpleContract()
    const work = getSubProfile(0)
    const hackathon = getSubProfile(1)
    const education = getSubProfile(2)

    // append the subProfile contract to the initial state
    // Todo: move to globale state
    useEffect(() => {
        if ((work.data && !work.isLoading) || (hackathon.data && !hackathon.isLoading) || (education.data && !education.isLoading)) {
            const updatedArray = subProfiles.map((profile) => {
                if (profile.name === "Work") {
                    return {
                        ...profile,
                        contract: work.data,
                    }
                }
                if (profile.name === "Hackathon") {
                    return {
                        ...profile,
                        contract: hackathon.data,
                    }
                }
                if (profile.name === "Education") {
                    return {
                        ...profile,
                        contract: education.data,
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
    }, [work.data || !work.isLoading, hackathon.data || !hackathon.isLoading, education.data || !education.isLoading])

    return (
        <>
            <PageBanner subProfile={profile} />
            <div className="flex flex-col items-center justify-center">
                <div className="mt-24 flex w-screen max-w-6xl items-center justify-between border border-blue-500">
                    <Title title={profile} cn="text-4xl" />
                    <div className="flex flex-col items-end">
                        <div>Achieved by:</div>
                        <SymbolAddress cn={"text-muted-foreground"} />
                    </div>
                </div>
                <div className="w-full h-96 max-w-6xl border border-purple-700">
                    {/* <Card /> */}
                    {/* <SubProfileCard contract={`${profile}.data`} userAddress={useAddress} profile={subProfile} /> */}
                    {/* <Text />> */}
                    {/* <ChainInfo /> */}

                    {/* <Achievements  /> */}
                </div>
            </div>
        </>
    )
}

export default page
