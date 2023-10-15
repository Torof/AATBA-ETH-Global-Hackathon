import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

interface UserAccountProps {
    account?: string
}

const useSubProfileFactory = () => {
    const address = useAddress()
    const [userAddress, setUserAddress] = useState<string>(address!)

    const updateUser = (user: string) => setUserAddress(user)

    useEffect(() => {
        if (address) updateUser(address!)
        return
    }, [address])

    const getSubProfile = (index: number) => {
        const { contract } = useContract("0x710b79d14F9E98286fA781BdCa8eC839a5A4c437")
        const { data, isLoading } = useContractRead(contract, "getSubProfile", [index])

        return { data, isLoading}
    }


    return [getSubProfile]
}

export default useSubProfileFactory
