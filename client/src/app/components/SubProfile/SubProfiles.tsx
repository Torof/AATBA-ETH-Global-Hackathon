import { Fragment, useEffect } from "react"
import { SubProfileCard } from ".."
import { SubProfile } from "../../../../typings"
import { useContextStore } from "@root/app/context/StateContext/StateContext"
import { useContract, useContractEvents } from "@thirdweb-dev/react"

type Props = {
    subProfiles: SubProfile[]
    userAddress: string
}

const getEvents = () => {
    const { contract } = useContract(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)
    const { data } = useContractEvents(contract, "UserAccountCreated", {
        subscribe: true, // Subscribe to new events
    })

    if (!data) {
        return
    }

    return { data }
}

const SubProfiles = ({ subProfiles, userAddress }: Props) => {
    // console.log("[from subProfiles component]", subProfiles)
    const { setSimpleUserAccount, simpleUserAccount } = useContextStore()
    // console.log("[from subProfiles component] STATE", simpleUserAccount)

    const events = getEvents()
    let account: string;
    const updateSimpleUser = (user: string) => {
        setSimpleUserAccount(user)
    }

    useEffect(() => {
        if (events?.data && events?.data.length) {
            console.log("=====> ????", events)
            // Todo: filter out SimpleAccount for specific wallet
            // const currentEventSimpleUser = events.data
            const currentEventSimpleUser = events.data[0].data.account
            account = currentEventSimpleUser
            console.log("first", account);
            

            // setSimpleUserAccount(currentEventSimpleUser)
        }

    }, [events, events?.data])

    useEffect(() => {
        console.log("rdsfgdsfgdfgdsv", account);
        
       setSimpleUserAccount(account)

    }, [account!])
    
    
    return (
        <div className="mt-12 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
            <div className="flex flex-wrap gap-2">
                {subProfiles.map((profile) =>
                    profile.name === "Create" || (profile.contract && profile.contract > []) ? (
                        <Fragment key={profile.id}>
                            <SubProfileCard userAddress={userAddress} profile={profile} contract={profile.contract} simpleUser={account!} />
                        </Fragment>
                    ) : null,
                )}
            </div>
        </div>
    )
}

export default SubProfiles
