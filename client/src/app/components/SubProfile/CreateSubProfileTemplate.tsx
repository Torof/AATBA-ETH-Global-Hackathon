import { Web3Button } from "@thirdweb-dev/react"
import { subProfileFactoryAbi, subProfileFactoryAddress } from "../../../../constants"

type Props = {
    name: string
    symbol: string
}

const CreateSubProfileTemplate = ({ name, symbol }: Props) => {
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
