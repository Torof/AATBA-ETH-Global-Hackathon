import { useContract, useContractEvents, useContractRead } from "@thirdweb-dev/react"
import { subProfileTBAAbi } from "../../../constants"

const useSubProfileTBA = () => {
    const getSubProfileBadges = (contractAddress: string) => {
        const { contract } = useContract(contractAddress, subProfileTBAAbi)
        const { data } = useContractRead(contract, "getSubProfileBadges")

        if (!data) {
            return
        }

        return { data }
    }

    return [getSubProfileBadges]
}

export default useSubProfileTBA
