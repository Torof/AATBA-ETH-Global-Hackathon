import { Contract } from "ethers"
import { SubProfileBody, SubProfileFooter, SubProfileHeader } from ".."
import { SubProfile, SubProfileContract } from "../../../../typings"

type Props = {
    profile: SubProfile
    cn?: string
    userAddress: string
    contract: SubProfileContract
}

const SubProfile = ({ profile, cn, userAddress, contract }: Props) => {
    return (
        <div key={profile.id} className={`${cn} relative w-60 gap-4 rounded-3xl`}>
            <SubProfileHeader profile={profile} contract={contract} />
            <SubProfileBody userAddress={userAddress} profile={profile} cn="h-[400px]" />
        </div>
    )
}

export default SubProfile
