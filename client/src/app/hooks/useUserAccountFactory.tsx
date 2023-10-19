import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { SetStateAction, useEffect, useState } from "react"
import { userAccountFactoryAbi } from "./../../../constants"

const useUserAccountFactory = () => {
    const address = useAddress()
    const [user, setUser] = useState<string>(address!)

    const [nameValue, setNameValue] = useState<string>("")
    const [symbolValue, setSymbolValue] = useState<string>("")
    const onNameChange = (event: { target: { value: SetStateAction<string> } }) => setNameValue(event.target.value)
    const onSymbolChange = (event: { target: { value: SetStateAction<string> } }) => setSymbolValue(event.target.value)

    const updateUser = (user: string) => setUser(user)

    useEffect(() => {
        if (address) updateUser(address!)
    }, [address])

    const getUserAccount = () => {
        if (!user || user === "undefined") return

        const { contract } = useContract(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)
        const { data, isLoading } = useContractRead(contract, "getUserAccount", [user])

        return { data, isLoading }
    }

    const getUserAccountsCount = () => {
        const { contract } = useContract(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)
        const { data, isLoading } = useContractRead(contract, "userAccountsCount", [])

        return { data, isLoading }
    }

    const getSubProfileFactory = () => {
        const { contract } = useContract(process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!)
        const { data, isLoading } = useContractRead(contract, "subProfileFactory", [])

        return { data, isLoading }
    }

    return [getUserAccount]
}

export default useUserAccountFactory
