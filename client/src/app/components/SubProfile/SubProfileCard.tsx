import { useEffect } from "react"
import { SubProfileCardBody, SubProfileCardHeader } from ".."
import { SubProfile } from "../../../../typings"
import { useSimpleUserStore } from "@root/app/context"

type Props = {
    profile: SubProfile
    cn?: string
    userAddress: string
    contract: any
    simpleUser: string
}

const SubProfileCard = ({ profile, cn, userAddress, contract, simpleUser }: Props) => {
    const { setSimpleUserAccount, simpleUserAccount } = useSimpleUserStore()    

    useEffect(() => {
        simpleUser ? setSimpleUserAccount(simpleUser) : null
    }, [simpleUser])

    return (
        <div key={profile.id} className={`${cn} relative w-60 gap-4 rounded-3xl border h-96`}>
            <SubProfileCardHeader profile={profile} contract={contract} />
            <SubProfileCardBody userAddress={userAddress} profile={profile} cn="h-96" />
        </div>
    )
}

export default SubProfileCard
