import { Fragment } from "react"
import { SubProfileCard } from ".."
import { SubProfile } from "../../../../typings"
import { useContextStore } from "@root/app/context/StateContext/StateContext"

type Props = {
    subProfiles: SubProfile[]
    userAddress: string
}

const SubProfiles = ({ subProfiles, userAddress }: Props) => {
    console.log("[from subProfiles component]", subProfiles, userAddress)
    const { setSimpleUserAccount, simpleUserAccount } = useContextStore()
    console.log("[from subProfiles component] STATE", simpleUserAccount)
    
    return (
        <div className="mt-12 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
            <div className="flex flex-wrap gap-2">
                {subProfiles.map((profile) =>
                    profile.name === "Create" || (profile.contract && profile.contract > []) ? (
                        <Fragment key={profile.id}>
                            <SubProfileCard userAddress={userAddress} profile={profile} contract={profile.contract} />
                        </Fragment>
                    ) : null,
                )}
            </div>
        </div>
    )
}

export default SubProfiles
