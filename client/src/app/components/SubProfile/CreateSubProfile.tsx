import { Web3Button } from "@thirdweb-dev/react"

type Props = {
    templateIndex: number
}

const CreateSubProfile = ({ templateIndex }: Props) => {
    const index = templateIndex

    return (
        <Web3Button
            contractAddress="0x710b79d14F9E98286fA781BdCa8eC839a5A4c437"
            action={(contract) => {
                contract.call("createSubProfile", [index])
            }}
        >
            createSubProfile
        </Web3Button>
    )
}

export default CreateSubProfile
