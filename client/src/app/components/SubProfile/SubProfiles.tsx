import { useEvents } from "@root/app/hooks"
import { Fragment } from "react"
import { SubProfileCard } from ".."
import { SubProfile } from "../../../../typings"

type Props = {
    subProfiles: SubProfile[]
    userAddress: string
}

const SubProfiles = ({ subProfiles, userAddress }: Props) => {
    const [getUserAccountCreatedEvents, getReceivedERC721Events, getAllEvents, getBadgeAddedEvents] = useEvents()
    // look for events in the smart contract
    const events = getUserAccountCreatedEvents(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)

    return events ? (
        <div className="mt-12 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
            <div className="flex flex-wrap gap-2">
                {subProfiles.map((profile) =>
                    profile.name === "Create" || (profile.contract && profile.contract > []) ? (
                        <Fragment key={profile.id}>
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
