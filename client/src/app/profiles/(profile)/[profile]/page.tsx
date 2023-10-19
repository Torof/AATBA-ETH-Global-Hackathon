"use client"

import { MintNFTButton, PageBanner, SubProfileCard, SymbolAddress, Title } from "@root/app/components"
import { useSimpleContract, useUserAccountFactory } from "@root/app/hooks"
import { useAddress } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"
import { SubProfile } from "../../../../../typings"
import { useContextStore } from "@root/app/context/StateContext/StateContext"

type Props = {
    params: { profile: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { profile }, searchParams }: Props) => {
    const [subProfiles, setSubProfiles] = useState<SubProfile[]>([
        { id: 0, name: "Work", profilePic: "/jobs.png", contract: [], subProfileAddress: "" },
        { id: 1, name: "Hackathon", profilePic: "/contest.png", contract: [], subProfileAddress: "" },
        { id: 2, name: "Education", profilePic: "/education.png", contract: [], subProfileAddress: "" },
        { id: 3, name: "Create", profilePic: "/create.png", contract: [], subProfileAddress: "" },
    ])
    const { simpleUserAccount, setSimpleUserAccount } = useContextStore()

    const [workAddress, setWorkAddress] = useState<string>("")
    const [hackathonAddress, setHackathonAddress] = useState<string>("")
    const [educationAddress, setEducationAddress] = useState<string>("")

    // get data from smart contract
    const [getSubProfile] = useSimpleContract()
    const work = getSubProfile(0)
    const hackathon = getSubProfile(1)
    const education = getSubProfile(2)

    // append the subProfile contract to the initial state
    // Todo: move to globale state
    useEffect(() => {
        if ((work.data && !work.isLoading) || (hackathon.data && !hackathon.isLoading) || (education.data && !education.isLoading)) {
            const updatedArray: any = subProfiles.map((profile) => {
                setWorkAddress(work?.data?.subProfileAddress)
                if (profile.name === "Work") {
                    return {
                        ...profile,
                        contract: work?.data,
                        subProfileAddress: work?.data?.subProfileAddress,
                    }
                }
                if (profile.name === "Hackathon") {
                    setHackathonAddress(hackathon?.data?.subProfileAddress)
                    return {
                        ...profile,
                        contract: hackathon?.data,
                        subProfileAddress: hackathon?.data?.subProfileAddress,
                    }
                }
                if (profile.name === "Education") {
                    setEducationAddress(education?.data?.subProfileAddress)
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
    }, [work.data || !work.isLoading, hackathon.data || !hackathon.isLoading, education.data || !education.isLoading])

    return (
        <>
            <PageBanner subProfile={profile} />
            <div className="flex flex-col items-center justify-center">
                <div className="mt-24 flex w-screen max-w-6xl items-center justify-between">
                    <Title title={profile} cn="text-4xl" />
                    <div className="flex flex-col items-end">
                        <div>Achieved by:</div>
                        {workAddress ? (
                            <SymbolAddress user={workAddress} cn={"text-muted-foreground"} />
                        ) : hackathonAddress ? (
                            <SymbolAddress user={hackathonAddress} cn={"text-muted-foreground"} />
                        ) : (
                            <SymbolAddress user={educationAddress} cn={"text-muted-foreground"} />
                        )}
                    </div>
                </div>
                <div className="flex h-96 w-full max-w-6xl items-center justify-center">
                    {/* <Card /> */}
                    {/* <SubProfileCard contract={`${profile}.data`} userAddress={useAddress} profile={subProfile} /> */}
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
