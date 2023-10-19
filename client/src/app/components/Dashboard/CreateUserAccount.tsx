import { Web3Button } from "@thirdweb-dev/react"
import { userAccountFactoryAbi, userAccountFactoryAddress } from "../../../../constants"

type Props = {}

const CreateUserAccount = (props: Props) => {
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
