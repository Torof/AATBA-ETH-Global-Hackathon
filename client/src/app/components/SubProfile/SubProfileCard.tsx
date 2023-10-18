import { useEffect } from "react"
import { SubProfileCardBody, SubProfileCardHeader } from ".."
import { SubProfile } from "../../../../typings"
import { useContextStore } from "@root/app/context/StateContext/StateContext"

type Props = {
    profile: SubProfile
    cn?: string
    userAddress: string
    contract: any
    simpleUser: string
}

const SubProfileCard = ({ profile, cn, userAddress, contract, simpleUser }: Props) => {
    const { setSimpleUserAccount, simpleUserAccount } = useContextStore()
    
    useEffect(() => {
        setSimpleUserAccount(simpleUser)
    }, [simpleUser])
    
    console.log("=====> state", simpleUserAccount, simpleUser)
    return (
        <div key={profile.id} className={`${cn} relative w-60 gap-4 rounded-3xl`}>
            <SubProfileCardHeader profile={profile} contract={contract} />
            <SubProfileCardBody userAddress={userAddress} profile={profile} cn="h-[400px]" />
        </div>
    )
}

export default SubProfileCard
