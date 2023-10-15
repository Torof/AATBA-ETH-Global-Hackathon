import { Web3Button } from "@thirdweb-dev/react";

type Props = {
    userAddress: string
    subProfileTemplateAddress: string;
}

const CreateSubProfile = ({ userAddress, subProfileTemplateAddress }: Props) => {
    const simpleUserAccountAddress = userAddress

    return (
        <Web3Button
            contractAddress={simpleUserAccountAddress}
            action={(contract) => {
                contract.call("createSubProfile", [userAddress, subProfileTemplateAddress])
            }}
        >
            Create Sub Profile
        </Web3Button>
    )
}

export default CreateSubProfile