import { useUserAccountFactory } from "@root/app/hooks";
import { Web3Button } from "@thirdweb-dev/react"
import { simpleUserAccountAbi } from "../../../../constants";
import { useEffect, useState } from "react";

type Props = {
    templateIndex: number;
    contractAddress: string;
}

const CreateSubProfile = ({ templateIndex }: Props) => {
    // const {setSubProfileAccountAddress, subProfileAccountAddress} = useStateContext()
    return (
        <Web3Button
            contractAbi={simpleUserAccountAbi}
            // TODO: DYNAMIC ADDRESS
            // contractAddress={process.env.NEXT_PUBLIC_SIMPLE_USER_ACCOUNT!}
            contractAddress={"0x6F1216D1BFe15c98520CA1434FC1d9D57AC95321"}
            action={(contract) => {
                contract.call("createSubProfile", [templateIndex])
            }}
            onSuccess={(result: any) => {

            }}
        >
            createSubProfile (TBA)
        </Web3Button>
    )
}

export default CreateSubProfile
