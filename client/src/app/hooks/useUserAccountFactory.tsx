import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { SetStateAction, useEffect, useState } from "react"
import { userAccountFactoryAbi, userAccountFactoryAddress } from "./../../../constants"

const useUserAccountFactory = () => {
    const getUserAccount = (user: string) => {
        // if (!user || user === "undefined") return

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
