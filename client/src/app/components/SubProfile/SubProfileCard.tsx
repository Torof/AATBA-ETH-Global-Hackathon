import { SubProfileCardBody, SubProfileCardHeader } from ".."
import { SubProfile } from "../../../../typings"

type Props = {
    profile: SubProfile
    cn?: string
    userAddress: string
    contract: any
}

const SubProfileCard = ({ profile, cn, userAddress, contract }: Props) => {
    return (
        <div key={profile.id} className={`${cn} relative w-60 gap-4 rounded-3xl`}>
            <SubProfileCardHeader profile={profile} contract={contract} />
            <SubProfileCardBody userAddress={userAddress} profile={profile} cn="h-[400px]" />
        </div>
    )
}

export default SubProfileCard
