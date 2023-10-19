import { useContextStore } from "@root/app/context/StateContext/StateContext"
import { Web3Button } from "@thirdweb-dev/react"
import { testNFTAbi } from "../../../../constants"

type Props = {
    to: string
}

const MintNFTButton = ({ to }: Props) => {
    const { simpleUserAccount, setSimpleUserAccount } = useContextStore()
    return (
        <Web3Button
            contractAbi={testNFTAbi}
            contractAddress={"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"}
            action={(contract: any) => {
                contract.call("mint", [to])
            }}
            onSuccess={(result: any) => {
                alert("Success!")
            }}
            onError={(error) => alert("Something went wrong!")}
        >
            Mint NFT
        </Web3Button>
    )
}

export default MintNFTButton
