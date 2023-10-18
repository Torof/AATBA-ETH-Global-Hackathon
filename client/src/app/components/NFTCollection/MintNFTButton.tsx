import { Web3Button } from "@thirdweb-dev/react";
import React from "react";
import { testNFTAbi } from "../../../../constants";

type Props = {};

const MintNFTButton = (props: Props) => {
    return (
        <Web3Button
            contractAbi={testNFTAbi}
            contractAddress={process.env.NEXT_PUBLIC_SBT_ADDRESS_1!}
            action={(contract: any) => {
                console.log(contract.contractWrapper.address)
                console.log(contract.contractWrapper.provider)
                console.log(contract.contractWrapper.writeContract)
                console.log(contract.contractWrapper.writeContract.address)
                contract.call("mint", ["0xf6b0f36872E814878Ad5f57AfE1E17e97A591FFA"])
            }}
            onSuccess={(result: any) => {
                // console.log(result)
                alert("Success!")
            }}
            // onSubmit={() => console.log("Transaction submitted")}
            onError={(error) => alert("Something went wrong!")}
        >
            Mint NFT
        </Web3Button>
    )
}

export default MintNFTButton
