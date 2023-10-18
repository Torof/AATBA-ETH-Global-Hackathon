import { useSimpleContract, useUserAccountFactory } from "@hooks/index"
import { useEffect, useState } from "react"
import HashLoader from "react-spinners/HashLoader"
import { SubProfile as SubProfileType } from "../../../../typings"
import { CreateUserAccount, PageBanner, SubProfiles, Title } from "../index"

type Props = {
    userAddress: string
}

const UserAccount = ({ userAddress }: Props) => {
    const [subProfiles, setSubProfiles] = useState<SubProfileType[]>([
        { id: 0, name: "Work", profilePic: "/work.png", contract: [] },
        { id: 1, name: "Hackathon", profilePic: "/hackathon.png", contract: [] },
        { id: 2, name: "Education", profilePic: "/education.png", contract: [] },
        { id: 3, name: "Create", profilePic: "/create.png", contract: [] },
    ])

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

    return userAccountResponse && userAccountResponse.isLoading ? (
        // * Still loading..
        <section className="mt-44 flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <HashLoader color="#FF8F5F" />
        </section>
    ) : userAccountResponse?.data === undefined ? (
        // * No User Account available
        <section className="mt-44 flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <CreateUserAccount />
        </section>
    ) : userAccountResponse && !userAccountResponse.isLoading && userAccountResponse.data !== "0x0000000000000000000000000000000000000000" ? (
        // * User Account available with valid address
        // Show sub profiles, if any
        <section className="container mt-44 w-screen max-w-6xl">
            <PageBanner userAccountResponse={userAccountResponse} />
            <Title title="My Profiles" cn="text-4xl font-semibold tracking-wide mt-12 pl-4" />
            <SubProfiles userAddress={userAddress} subProfiles={subProfiles} />
        </section>
    ) : (
        // * No User Account available
        <section className="mt-44 flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <CreateUserAccount />
        </section>
    )
}

export default UserAccount
