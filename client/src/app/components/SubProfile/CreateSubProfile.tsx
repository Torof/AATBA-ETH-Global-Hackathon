import { Web3Button } from "@thirdweb-dev/react";

type Props = {
    to: string
    subProfileTemplateAddress: string;
}

const CreateSubProfile = ({ to, subProfileTemplateAddress }: Props) => {
    return (
        <Web3Button
            contractAddress="0xe0BafCA03141126bcf402BDaf7020Ac9939E1297"
            action={(contract) => {
                contract.call("createSubProfileForUser", [to, subProfileTemplateAddress])
            }}
        >
            Create Sub Profile
        </Web3Button>
    )
}

export default CreateSubProfile