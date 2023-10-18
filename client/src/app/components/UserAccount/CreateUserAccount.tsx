import { useContextStore } from "@root/app/context/StateContext/StateContext"
import { Web3Button, useContract, useContractEvents } from "@thirdweb-dev/react"
import { useEffect } from "react"
import { userAccountFactoryAbi } from "../../../../constants"

type Props = {}

const CreateUserAccount = (props: Props) => {
    const { setSimpleUserAccount, simpleUserAccount } = useContextStore()

    return (
        <Web3Button
            contractAbi={userAccountFactoryAbi}
            contractAddress={process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!}
            action={(contract: any) => {
                contract.call("createUserAccount", [])
            }}
            onSuccess={(result: any) => {
                // alert("Success!")
            }}
            // onSubmit={() => console.log("Transaction submitted")}
            onError={(error) => alert("Something went wrong!")}
        >
            createUserAccount
        </Web3Button>
    )
}

export default CreateUserAccount
