import { useContract, useContractRead } from "@thirdweb-dev/react"
import { useSimpleUserStore } from "../context"

const useSubProfileFactory = () => {
    const getSubProfile = (index: number, address: string) => {
        
        const { contract } = useContract(address)
        const { data, isLoading } = useContractRead(contract, "getSubProfile", [index])

        return { data, isLoading }
    }

    return [getSubProfile]
}

export default useSubProfileFactory
