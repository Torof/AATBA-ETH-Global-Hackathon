import { useContract, useContractRead } from "@thirdweb-dev/react"
import { simpleUserAccountAbi } from "../../../constants"

const useSubProfileFactory = () => {
    const getSubProfile = (index: number, address: string) => {
        const { contract } = useContract(address, simpleUserAccountAbi)
        const { data, isLoading } = useContractRead(contract, "getSubProfile", [index])

        return { data, isLoading }
    }
    
    const getSubProfileFactoryAddress = (index: number, address: string) => {
        const { contract } = useContract(address, simpleUserAccountAbi)
        const { data, isLoading } = useContractRead(contract, "subProfileFactoryAddress", [])

        return { data, isLoading }
    }

    return [getSubProfile, getSubProfileFactoryAddress]
}

export default useSubProfileFactory
