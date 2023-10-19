import { useContextStore } from "@root/app/context/StateContext/StateContext"
import { useEffect } from "react"
import { SubProfileCardBody, SubProfileCardHeader } from ".."
import { SubProfile } from "../../../../typings"

type Props = {
    profile: SubProfile
    cn?: string
    userAddress: string
    contract: any
    simpleUser: string
}

const SubProfileCard = ({ profile, cn, userAddress, contract, simpleUser }: Props) => {
    const { setSimpleUserAccount, simpleUserAccount } = useContextStore()
    console.log("SIMPLE USER", simpleUser);
    

    useEffect(() => {
        simpleUser ? setSimpleUserAccount(simpleUser) : null
    }, [simpleUser])

    return (
        <div key={profile.id} className={`${cn} relative w-60 gap-4 rounded-3xl`}>
            <SubProfileCardHeader profile={profile} contract={contract} />
            <SubProfileCardBody userAddress={userAddress} profile={profile} cn="h-[400px]" />
        </div>
    )
}

export default SubProfileCard
