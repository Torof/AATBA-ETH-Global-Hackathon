import { Web3Button } from "@thirdweb-dev/react"
import { useRouter } from "next/navigation"
import { simpleUserAccountAbi } from "../../../../constants"
import { useSimpleUserStore } from "@root/app/context"

type Props = {
    templateIndex: number
    contractAddress: string
}

const CreateSubProfile = ({ templateIndex }: Props) => {
    const { simpleUserAccount, setSimpleUserAccount } = useSimpleUserStore()
    const { push } = useRouter()
    return (
        <Web3Button
            contractAbi={simpleUserAccountAbi}
            // TODO: DYNAMIC ADDRESS
            contractAddress={simpleUserAccount!}
            // contractAddress={"0x6F1216D1BFe15c98520CA1434FC1d9D57AC95321"}
            action={(contract) => {
                contract.call("createSubProfile", [templateIndex])
            }}
            onSuccess={(result: any) => {
                push("/")
            }}
        >
            createSubProfile (TBA)
        </Web3Button>
    )
}

export default CreateSubProfile
