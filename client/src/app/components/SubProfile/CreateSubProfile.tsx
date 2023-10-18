import { useUserAccountFactory } from "@root/app/hooks";
import { Web3Button } from "@thirdweb-dev/react"
import { simpleUserAccountAbi } from "../../../../constants";
import { useEffect, useState } from "react";
import { useContextStore } from "@root/app/context/StateContext/StateContext";

type Props = {
    templateIndex: number;
    contractAddress: string;
}

const CreateSubProfile = ({ templateIndex }: Props) => {
    const { simpleUserAccount, setSimpleUserAccount } = useContextStore()
    console.log(simpleUserAccount)
    
    return (
        <Web3Button
            contractAbi={simpleUserAccountAbi}
            // TODO: DYNAMIC ADDRESS
            contractAddress={simpleUserAccount!}
            // contractAddress={"0x6F1216D1BFe15c98520CA1434FC1d9D57AC95321"}
            action={(contract) => {
                contract.call("createSubProfile", [templateIndex])
            }}
            onSuccess={(result: any) => {}}
        >
            createSubProfile (TBA)
        </Web3Button>
    )
}

export default CreateSubProfile
