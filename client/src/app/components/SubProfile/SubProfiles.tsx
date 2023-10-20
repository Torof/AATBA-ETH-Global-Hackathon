import { useSimpleUserStore } from "@root/app/context"
import { useEvents, useSimpleContract, useSubProfileTBA } from "@root/app/hooks"
import { Fragment, useEffect } from "react"
import { SubProfileCard } from ".."
import { SubProfile } from "../../../../typings"
import SubProfileBadges from "./SubProfileBadges"

type Props = {
    subProfiles: SubProfile[]
    userAddress: string
    user: string
}

const SubProfiles = ({ subProfiles, userAddress, user }: Props) => {
    const [getUserAccountCreatedEvents, getReceivedERC721Events, getAllEvents, getBadgeAddedEvents] = useEvents()
    // look for events in the smart contract
    const events = getUserAccountCreatedEvents(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)

    const { simpleUserAccount, setSimpleUserAccount } = useSimpleUserStore()

    const [getSubProfile] = useSimpleContract()
    const [getSubProfileBadges] = useSubProfileTBA()

    useEffect(() => {
        //   setSimpleUserAccount(user);
        console.log(user)
        setSimpleUserAccount(user)
    }, [user])

    return events ? (
        <div className="mt-12 flex w-screen max-w-6xl flex-wrap gap-6 px-4">
            <div className="flex flex-wrap gap-8">
                {subProfiles.map((profile) =>
                    profile.name === "Create" || (profile.contract && profile.contract > []) ? (
                        <Fragment key={profile.id}>
                            <SubProfileBadges />
                            <SubProfileCard
                                userAddress={userAddress}
                                profile={profile}
                                contract={profile.contract}
                                simpleUser={events.data[0].data.account}
                            />
                        </Fragment>
                    ) : null,
                )}
            </div>
        </div>
    ) : null
}

export default SubProfiles
