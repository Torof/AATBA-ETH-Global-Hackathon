import { Web3Button, useChainId } from "@thirdweb-dev/react"
import { userAccountFactoryAbi } from "../../../../constants"

type Props = {}

const CreateUserAccount = (props: Props) => {
    // set address according to current chain id
    const chainId = useChainId()
    const userAccountFactoryAddress =
        chainId === 1337 ? process.env.NEXT_PUBLIC_HH_USER_ACCOUNT_FACTORY_ADDRESS! : process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!
    return (
        <Web3Button
            contractAbi={userAccountFactoryAbi}
            contractAddress={userAccountFactoryAddress}
            action={(contract: any) => {
                contract.call("createUserAccount", [])
            }}
            onSuccess={(result: any) => {}}
            onError={(error) => alert("Something went wrong!")}
        >
            createUserAccount
        </Web3Button>
    )
}

export default CreateUserAccount
