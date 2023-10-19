import { Web3Button } from "@thirdweb-dev/react"
import { testNFTAbi1, testNFTAddress1, testNFTAbi2, testNFTAddress2 } from "../../../../constants"

type Props = {
    to: string
}

const MintNFTButton = ({ to }: Props) => {
    return (
        <Web3Button
            contractAbi={testNFTAbi1}
            contractAddress={testNFTAddress1}
            action={(contract: any) => {
                contract.call("mint", [to])
            }}
            onSuccess={(result: any) => {}}
            onError={(error) => alert("Something went wrong!")}
        >
            Mint SBT NFT
        </Web3Button>
    )
}

export default MintNFTButton
