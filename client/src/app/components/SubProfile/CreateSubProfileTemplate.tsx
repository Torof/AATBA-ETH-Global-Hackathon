import { Web3Button } from "@thirdweb-dev/react";

type Props = {
    name: string
    symbol: string;
}

const CreateSubProfileTemplate = ({name, symbol}: Props) => {
    // const simpleUserAccountAddress = userAddress

    return (
        <Web3Button
            contractAddress={process.env.NEXT_PUBLIC_SUB_PROFILE_FACTORY_ADDRESS!}
            action={(contract) => {
                contract.call("generateSubProfileTemplate", [name, symbol]);
            }}
        >
            Create Sub Profile Template
        </Web3Button>
    )
}

export default CreateSubProfileTemplate