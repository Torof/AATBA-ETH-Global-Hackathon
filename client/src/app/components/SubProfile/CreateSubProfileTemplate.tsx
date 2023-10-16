import { Web3Button } from "@thirdweb-dev/react";
// import { subProfileFactoryAbi } from "../../../../constants";

type Props = {
    name: string
    symbol: string;
}

const CreateSubProfileTemplate = ({name, symbol}: Props) => {
    // const simpleUserAccountAddress = userAddress

    return (
        <Web3Button
            // contractAbi={subProfileFactoryAbi}
            contractAddress={process.env.NEXT_PUBLIC_SUB_PROFILE_FACTORY_ADDRESS!}
            action={(contract) => {
                contract.call("generateSubProfileTemplate", [name, symbol]);
            }}
        >
            createSubProfileTemplate
        </Web3Button>
    )
}

export default CreateSubProfileTemplate