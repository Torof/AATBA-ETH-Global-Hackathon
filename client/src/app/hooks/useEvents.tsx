import { useContract, useContractEvents } from "@thirdweb-dev/react"
// import { useStateContext } from "../context/StateContext/StateContext"

const useEvents = () => {
    // @ts-ignore
    // const { setSimpleUserAccount, simpleUserAccount } = useStateContext()
    const getEvents = () => {
        const { contract } = useContract(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)
        const { data, isLoading, error } = useContractEvents(contract)
        console.log(data, isLoading, error)

        if (data && !isLoading) {
            // @ts-ignore
            setSimpleUserAccount(data.name)
        }
        return { data, isLoading, error }
    }
    return [getEvents]
}

export default useEvents