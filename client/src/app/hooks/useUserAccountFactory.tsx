import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"

interface UserAccountProps {
    account?: string
}

const useUserAccountFactory = () => {
    const address = useAddress()
    const [user, setUser] = useState<string>(address!)

    const updateUser = (user: string) => setUser(user)

    useEffect(() => {
        if (address) updateUser(address!)
    }, [address])

    const getUserAccount = () => {
        if (!user || user === "undefined") return

        const { contract } = useContract("0x98E2DDA0521c526Be9b0a6a08F5f6c0014C44904")
        const { data, isLoading } = useContractRead(contract, "getUserAccount", [user])

        console.log(data, isLoading)
        return { data, isLoading }
    }

    const getUserAccountsCount = () => {
        const { contract } = useContract("0x98E2DDA0521c526Be9b0a6a08F5f6c0014C44904")
        const { data, isLoading } = useContractRead(contract, "userAccountsCount", [])

        console.log(data, isLoading)
        return { data, isLoading }
    }

    const getSubProfileFactory = () => {
        const { contract } = useContract("0x98E2DDA0521c526Be9b0a6a08F5f6c0014C44904")
        const { data, isLoading } = useContractRead(contract, "subProfileFactory", [])

        console.log(data, isLoading)
        return { data, isLoading }
    }

    return [getUserAccount]
}

export default useUserAccountFactory
