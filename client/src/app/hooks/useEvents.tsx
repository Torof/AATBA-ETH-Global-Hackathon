import { useContract, useContractEvents } from "@thirdweb-dev/react"

const useEvents = () => {
    const getUserAccountCreatedEvents = (contractAddress: string) => {
        const { contract } = useContract(contractAddress)
        const { data } = useContractEvents(contract, "UserAccountCreated", {
            subscribe: true, // Subscribe to new events
        })

        if (!data) {
            return
        }

        return { data }
    }

    const getReceivedERC721Events = (contractAddress: string) => {
        const { contract } = useContract(contractAddress)
        const { data } = useContractEvents(contract, "ReceivedERC721", {
            subscribe: true, // Subscribe to new events
        })

        if (!data) {
            return
        }

        return { data }
    }

    const getAllEvents = (contractAddress: string) => {
        const { contract } = useContract(contractAddress)
        const { data } = useContractEvents(contract)

        if (!data) {
            return
        }

        return { data }
    }

    const getBadgeAddedEvents = (contractAddress: string) => {
        const { contract } = useContract(contractAddress)
        const { data } = useContractEvents(contract)

        if (!data) {
            return
        }

        return { data }
    }
    return [getUserAccountCreatedEvents, getReceivedERC721Events, getAllEvents, getBadgeAddedEvents]
}

export default useEvents