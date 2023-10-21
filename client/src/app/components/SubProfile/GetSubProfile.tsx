import { Web3Button, useChainId } from "@thirdweb-dev/react"
import { subProfileFactoryAbi } from "../../../../constants"

type Props = {
    name: string
    symbol: string
}

const CreateSubProfileTemplate = ({ name, symbol }: Props) => {
    // set address according to current chain id
    const chainId = useChainId()
    const subProfileFactoryAddress =
        chainId === 1337 ? process.env.NEXT_PUBLIC_HH_SUB_PROFILE_FACTORY_ADDRESS! : process.env.NEXT_PUBLIC_SUB_PROFILE_FACTORY_ADDRESS!

    return (
        <Web3Button
            contractAbi={subProfileFactoryAbi}
            contractAddress={subProfileFactoryAddress}
            action={(contract) => {
                contract.call("generateSubProfileTemplate", [name, symbol])
            }}
        >
            createSubProfileTemplate
        </Web3Button>
    )
}

export default CreateSubProfileTemplate
