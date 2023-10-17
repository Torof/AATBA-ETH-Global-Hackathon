import { Web3Button } from "@thirdweb-dev/react"
import { userAccountFactoryAbi } from "../../../../constants"
import { useStateContext } from "../../context/StateContext"

type Props = {}

const CreateUserAccount = (props: Props) => {
    return (
        <Web3Button
            contractAbi={userAccountFactoryAbi}
            contractAddress={process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!}
            action={(contract: any) => {
                console.log(contract.contractWrapper.address)
                console.log(contract.contractWrapper.provider)
                console.log(contract.contractWrapper.writeContract)
                console.log(contract.contractWrapper.writeContract.address)
                contract.call("createUserAccount", [])
            }}
            onSuccess={(result: any) => {
                // console.log(result)
                alert("Success!")
            }}
            // onSubmit={() => console.log("Transaction submitted")}
            onError={(error) => alert("Something went wrong!")}
        >
            createUserAccount
        </Web3Button>
    )
}

export default CreateUserAccount
