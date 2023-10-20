import { useSimpleContract, useUserAccountFactory } from "@hooks/index"
import { useEducationStore, useHackathonStore, useSimpleUserStore, useWorkStore } from "@root/app/context"
import { useEffect, useState } from "react"
import HashLoader from "react-spinners/HashLoader"
import { SubProfile as SubProfileType } from "../../../../typings"
import { CreateUserAccount, PageBanner, SubProfiles, Title } from "../index"
import { useAddress } from "@thirdweb-dev/react"

type Props = {
    userAddress: string
}

const Dashboard = ({ userAddress }: Props) => {
    const [subProfiles, setSubProfiles] = useState<SubProfileType[]>([
        { id: 0, name: "Work", profilePic: "/work.png", contract: [], subProfileAddress: "" },
        { id: 1, name: "Hackathon", profilePic: "/hackathon.png", contract: [], subProfileAddress: "" },
        { id: 2, name: "Education", profilePic: "/education.png", contract: [], subProfileAddress: "" },
        { id: 3, name: "Create", profilePic: "/create.png", contract: [], subProfileAddress: "" },
    ])

    const { simpleUserAccount, setSimpleUserAccount } = useSimpleUserStore()
    const { workSubProfileAddress, setWorkSubProfileAddress } = useWorkStore()
    const { hackathonSubProfileAddress, setHackathonSubProfileAddress } = useHackathonStore()
    const { educationSubProfileAddress, setEducationSubProfileAddress } = useEducationStore()

    const user = useAddress()
    
    // get data from smart contract
    const [getUserAccount] = useUserAccountFactory()
    const userAccountResponse = getUserAccount(user!)

    useEffect(() => {
      setSimpleUserAccount(userAccountResponse?.data);

    }, [userAccountResponse?.data]);

    const [getSubProfile] = useSimpleContract()
    const work = getSubProfile(0, simpleUserAccount)
    const hackathon = getSubProfile(1, simpleUserAccount)
    const education = getSubProfile(2, simpleUserAccount)

    // append the subProfile contract to the initial state
    // Todo: move to globale state
    useEffect(() => {
        if ((work?.data && !work.isLoading) || (hackathon?.data && !hackathon.isLoading) || (education?.data && !education.isLoading)) {
            const updatedArray: any = subProfiles.map((profile) => {
                if (profile.name === "Work") {
                    setWorkSubProfileAddress(work?.data?.subProfileAddress)
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
        <section className="container my-44 w-screen max-w-6xl">
            <PageBanner userAccountResponse={userAccountResponse} />
            <Title title="My Profiles" cn="text-4xl font-semibold tracking-wide mt-12 pl-4" />
            <SubProfiles userAddress={userAddress} subProfiles={subProfiles} user={userAccountResponse.data} />
        </section>
    ) : (
        // * No User Account available
        <section className="mt-44 flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <CreateUserAccount />
        </section>
    )
}

export default Dashboard
