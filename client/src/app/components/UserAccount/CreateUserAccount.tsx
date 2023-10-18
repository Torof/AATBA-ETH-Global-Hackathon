import { useContextStore } from "@root/app/context/StateContext/StateContext"
import { Web3Button, useContract, useContractEvents } from "@thirdweb-dev/react"
import { useEffect } from "react"
import { userAccountFactoryAbi } from "../../../../constants"

type Props = {}

const getEvents = () => {
    const { contract } = useContract(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)
    const { data } = useContractEvents(contract)

    console.log(data)
    return { data }
}

const CreateUserAccount = (props: Props) => {
    const { setSimpleUserAccount, simpleUserAccount } = useContextStore()
    const events = getEvents()

    useEffect(() => {
        console.log("USE EFFECT");
        
        if (events.data && events.data.length) {
            // Todo: filter out SimpleAccount for specific wallet
            // const currentEventSimpleUser = events.data
            const currentEventSimpleUser = events.data[0].data.account

            // console.log("currentEventSimpleUser", currentEventSimpleUser)
            

            setSimpleUserAccount(currentEventSimpleUser)

        }
    }, [events.data])

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
