import { useContract, useContractEvents } from "@thirdweb-dev/react"
// import { useStateContext } from "../context/StateContext/StateContext"

const useEvents = () => {
    // const { setSimpleUserAccount, simpleUserAccount } = useStateContext()
    const getEvents = () => {
        const { contract } = useContract(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)
        const { data } = useContractEvents(contract, "UserAccountCreated", {
            subscribe: true, // Subscribe to new events
        })

        if (!data) {
            return
        }

        return { data }
    }
    return [getEvents]
}

export default useEvents