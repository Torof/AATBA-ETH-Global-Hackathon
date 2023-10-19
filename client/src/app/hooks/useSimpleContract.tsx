import { useContract, useContractRead } from "@thirdweb-dev/react"
import { useSimpleUserStore } from "../context"

const useSubProfileFactory = () => {
    const { simpleUserAccount } = useSimpleUserStore()
    const getSubProfile = (index: number) => {
        const { contract } = useContract(simpleUserAccount)
        const { data, isLoading } = useContractRead(contract, "getSubProfile", [index])

        return { data, isLoading }
    }

    return [getSubProfile]
}

export default useSubProfileFactory
