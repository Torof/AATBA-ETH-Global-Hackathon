import { useSimpleUserStore } from "@root/app/context"
import { Web3Button } from "@thirdweb-dev/react"
import { useRouter } from "next/navigation"
import { simpleUserAccountAbi } from "../../../../constants"

type Props = {
    templateIndex: number
}

const CreateSubProfile = ({ templateIndex }: Props) => {
    const { simpleUserAccount } = useSimpleUserStore()
    const { push } = useRouter()

    return (
        <Web3Button
            contractAbi={simpleUserAccountAbi}
            contractAddress={simpleUserAccount!}
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
