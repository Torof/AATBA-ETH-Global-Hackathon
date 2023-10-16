import { useContract, useContractRead } from "@thirdweb-dev/react"

const useSubProfileFactory = () => {
    const getSubProfile = (index: number) => {
        const { contract } = useContract(process.env.NEXT_PUBLIC_SIMPLE_USER_ACCOUNT!)
        const { data, isLoading } = useContractRead(contract, "getSubProfile", [index])

        return { data, isLoading }
    }

    return [getSubProfile]
}

export default useSubProfileFactory
