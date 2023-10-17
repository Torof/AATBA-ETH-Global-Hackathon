import { Fragment } from "react"
import { SubProfile } from ".."

type Props = {
    subProfiles: SubProfile[]
    userAddress: string
}

const SubProfiles = ({ subProfiles, userAddress }: Props) => {
    return (
        <div className="mt-12 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
            <div className="flex flex-wrap gap-2">
                {subProfiles.map((profile) =>
                    profile.name === "Create" || (profile.contract && profile.contract > []) ? (
                        <Fragment key={profile.id}>
                            <SubProfile userAddress={userAddress} profile={profile} contract={profile.contract} />
                        </Fragment>
                    ) : null,
                )}
            </div>
        </div>
    )
}

export default SubProfiles
