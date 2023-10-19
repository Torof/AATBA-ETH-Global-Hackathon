import { useContract, useContractEvents, useContractRead } from "@thirdweb-dev/react"

const useSubProfileTBA = () => {
    const getSubProfileBadges = (contractAddress: string) => {
        const { contract } = useContract(contractAddress)
        const { data } = useContractRead(contract, "subProfileBadges")

        if (!data) {
            return
        }

        return { data }
    }

    return [getSubProfileBadges]
}

export default useSubProfileTBA
