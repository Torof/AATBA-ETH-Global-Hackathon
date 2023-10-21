import { useAddress, useChainId, useContract, useContractRead } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"
import { subProfileFactoryAbi } from "../../../constants"

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

    // set address according to current chain id
    const chainId = useChainId()
    const subProfileFactoryAddress =
        chainId === 1337 ? process.env.NEXT_PUBLIC_HH_SUB_PROFILE_FACTORY_ADDRESS : process.env.NEXT_PUBLIC_SUB_PROFILE_FACTORY_ADDRESS

    const getSubProfileTemplateRegistryAddress = () => {
        const { contract } = useContract(subProfileFactoryAddress, subProfileFactoryAbi) // SubProfileFactory address
        const { data, isLoading } = useContractRead(contract, "subProfileTemplateRegistryAddress", [])

        return { data, isLoading }
    }

    const getTBAAccount = () => {
        const index = 0
        const tokenId = "tokenId"

        const { contract } = useContract(subProfileFactoryAddress, subProfileFactoryAbi)
        const { data, isLoading } = useContractRead(contract, "tbaAccount", [index, tokenId])

        return { data, isLoading }
    }

    return [getSubProfileTemplateRegistryAddress, getTBAAccount]
}

export default useSubProfileFactory
