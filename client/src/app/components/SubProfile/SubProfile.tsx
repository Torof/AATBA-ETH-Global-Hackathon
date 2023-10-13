import { SubProfileBody, SubProfileFooter, SubProfileHeader } from ".."
import { SubProfile } from "../../../../typings"

type Props = {
    profile: SubProfile
    cn?: string
    userAddress: string
}

const SubProfile = ({ profile, cn, userAddress }: Props) => {
    return (
        <div key={profile.id} className="relative w-60 gap-4 rounded-3xl">
            <SubProfileHeader profile={profile} />
            <SubProfileBody userAddress={userAddress} profile={profile} cn="h-[400px]" />
        </div>
    )
}

export default SubProfile
