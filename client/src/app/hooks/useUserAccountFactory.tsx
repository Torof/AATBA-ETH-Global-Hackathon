import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { SetStateAction, useEffect, useState } from "react"
import { userAccountFactoryAbi } from "./../../../constants"
import { useChainId } from "@thirdweb-dev/react"

const useUserAccountFactory = () => {
    const chainId = useChainId()
    
    const getUserAccount = (user: string) => {

        // set address according to current chain id
        const userAccountFactoryAddress =
            chainId === 1337 ? process.env.NEXT_PUBLIC_HH_USER_ACCOUNT_FACTORY_ADDRESS : process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS

        const { contract } = useContract(userAccountFactoryAddress, userAccountFactoryAbi)
        const { data, isLoading } = useContractRead(contract, "getUserAccount", [user])

        if (!data) {
            return
        }

        return { data, isLoading }

    }

    // const getUserAccountsCount = () => {
    //     const { contract } = useContract(userAccountFactoryAddress)
    //     const { data, isLoading } = useContractRead(contract, "userAccountsCount", [])

    //     return { data, isLoading }
    // }

    // const getSubProfileFactory = () => {
    //     const { contract } = useContract(userAccountFactoryAddress)
    //     const { data, isLoading } = useContractRead(contract, "subProfileFactory", [])

    //     return { data, isLoading }
    // }

    return [getUserAccount]
}

export default useUserAccountFactory
