import { Web3Button } from "@thirdweb-dev/react"
// import { simpleUserAccountAbi } from "../../../../constants";

type Props = {
    templateIndex: number;
    contractAddress: string;
}

const CreateSubProfile = ({ templateIndex, contractAddress }: Props) => {
    const index = templateIndex

    return (
        <Web3Button
            // contractAbi={simpleUserAccountAbi}
            // TODO: DYNAMIC ADDRESS
            contractAddress={process.env.NEXT_PUBLIC_SIMPLE_USER_ACCOUNT!}
            // contractAddress={contractAddress}
            action={(contract) => {
                contract.call("createSubProfile", [index])
            }}
        >
            createSubProfile (TBA)
        </Web3Button>
    )
}

export default CreateSubProfile
