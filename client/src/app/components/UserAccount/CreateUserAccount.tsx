import { Web3Button } from "@thirdweb-dev/react"
import { userAccountFactoryAbi } from "../../../../constants"

type Props = {}

const CreateUserAccount = (props: Props) => {
    return (
        <Web3Button
            contractAbi={userAccountFactoryAbi}
            contractAddress={process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!}
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
