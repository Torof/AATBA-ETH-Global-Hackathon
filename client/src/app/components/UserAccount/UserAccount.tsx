import { useSimpleContract, useUserAccountFactory } from "@hooks/index"
import { Fragment, useEffect, useState } from "react"
import HashLoader from "react-spinners/HashLoader"
import { SubProfile as SubProfileType } from "../../../../typings"
import { CreateUserAccount, SubProfile, Title, UserInfo } from "../index"

type Props = {
    userAddress: string
}

const UserAccount = ({ userAddress }: Props) => {
    const [subProfiles, setSubProfiles] = useState<SubProfileType[]>([
        { id: 0, name: "Work", profilePic: "/jobs.png", contract: [] },
        { id: 1, name: "Hackathon", profilePic: "/contest.png", contract: [] },
        { id: 2, name: "Education", profilePic: "/education.png", contract: [] },
        { id: 3, name: "Create", profilePic: "/create.png", contract: [] },
    ])

    const [getUserAccount] = useUserAccountFactory()
    const userAccountResponse = getUserAccount()

    const [getSubProfile] = useSimpleContract()
    const work = getSubProfile(0)
    const hackathon = getSubProfile(1)
    const education = getSubProfile(2)
    // append the subProfile contract to the initial state
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
            console.log(updatedArray)
            setSubProfiles(updatedArray)
        }
    }, [work.data, hackathon.data, education.data])

    return userAccountResponse?.data === undefined ? (
        // ! No User Account available
        <div className="flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <CreateUserAccount />
        </div>
    ) : userAccountResponse && userAccountResponse.isLoading && !userAccountResponse.data ? (
        // ! Still loading..
        <div className="flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <HashLoader color="#FF8F5F" />
        </div>
    ) : userAccountResponse && !userAccountResponse.isLoading && userAccountResponse.data !== "0x0000000000000000000000000000000000000000" ? (
        // ! User Account available with valid address
        <div className="container">
            <div className="mx-4 flex flex-col gap-5 rounded-3xl">
                <UserInfo user={userAccountResponse.data} />
            </div>

            {/* Show sub profiles, if any */}
            <div className="mt-12 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
                <Title title="My Profiles" cn="text-4xl font-semibold tracking-wide" />
                <div className="flex flex-wrap gap-2">
                    {subProfiles.map((profile) =>
                        profile.name === "Create" || (profile.contract && profile.contract > []) ? (
                            <Fragment key={profile.id}>
                                <SubProfile userAddress={userAddress} profile={profile} contract={profile.contract} />
                            </Fragment>
                        ) : null,
                    )}
                </div>
                {/* Are there any sub-profiles?? */}
                {/* <UserAccountItem /> */}
                {/* Show Tile with an NFT, representing an Sub-Profile */}
                {/* Create a new sub-profile */}
            </div>
            {/* create sub profile */}
        </div>
    ) : (
        // ! No User Account available
        // TODO: Rerender the page when the user account is created
        <div className="flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <CreateUserAccount />
        </div>
    )
}

export default UserAccount
