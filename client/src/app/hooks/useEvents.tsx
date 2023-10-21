import { useContract, useContractEvents } from "@thirdweb-dev/react"

const useEvents = () => {
    const getUserAccountCreatedEvents = (contractAddress: string, abi: any[]) => {
        const { contract } = useContract(contractAddress, abi)
        const { data, isLoading } = useContractEvents(contract, "UserAccountCreated", {
            subscribe: true, // Subscribe to new events
        })

        if (!data) {
            return
        }

        return { data, isLoading }
    }

    const getReceivedERC721Events = (contractAddress: string, abi: any[]) => {
        const { contract } = useContract(contractAddress, abi)
        const { data } = useContractEvents(contract, "ReceivedERC721", {
            subscribe: true, // Subscribe to new events
        })

        if (!data) {
            return
        }

        return { data }
    }

    const getAllEvents = (contractAddress: string, abi: any[]) => {
        const { contract } = useContract(contractAddress, abi)
        const { data } = useContractEvents(contract)

        if (!data) {
            return
        }

        return { data }
    }

    const getBadgeAddedEvents = (contractAddress: string, abi: any[]) => {
        const { contract } = useContract(contractAddress, abi)
        const { data } = useContractEvents(contract, "BadgeAdded", {
            subscribe: true, // Subscribe to new events
        })

        if (!data) {
            return
        }

        return { data }
    }
    return [getUserAccountCreatedEvents, getReceivedERC721Events, getAllEvents, getBadgeAddedEvents]
}

export default useEvents
