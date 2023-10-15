import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"

interface UserAccountProps {
    account?: string
}

const useSubProfileFactory = () => {
    const address = useAddress()
    const [userAddress, setUserAddress] = useState<string>(address!)
    const [subProfileTemplateAddress, setSubProfileTemplateAddress] = useState<string>()

    const updateUser = (user: string) => setUserAddress(user)

    useEffect(() => {
        if (address) updateUser(address!)
        return
    }, [address])

    const createSubProfileForUser = () => {
        const { contract } = useContract(process.env.NEXT_PUBLIC_SUB_PROFILE_FACTORY_ADDRESS)
        const { mutateAsync: createSubProfileForUser, isLoading } = useContractWrite(contract, "createSubProfileForUser")

        const call = async () => {
            try {
                const data = await createSubProfileForUser({ args: [userAddress, subProfileTemplateAddress] })
                console.info("contract call successs", data)
            } catch (err) {
                console.error("contract call failure", err)
            }
        }
        console.log(call)
    }

    // TODO: make dynamic
    const generateSubProfileTemplate = () => {
        const { contract } = useContract(process.env.NEXT_PUBLIC_SUB_PROFILE_FACTORY_ADDRESS)
        const { mutateAsync: generateSubProfileTemplate, isLoading } = useContractWrite(contract, "generateSubProfileTemplate")

        const name = "Work"
        const symbol = "WRK"

        const call = async () => {
            try {
                const data = await generateSubProfileTemplate({ args: [name, symbol] })
                console.info("contract call successs", data)
            } catch (err) {
                console.error("contract call failure", err)
            }
        }
        console.log(call);
        
    }



        const getSubProfileTemplateRegistryAddress = () => {
            const { contract } = useContract(process.env.NEXT_PUBLIC_SUB_PROFILE_FACTORY_ADDRESS) // SubProfileFactory address
            const { data, isLoading } = useContractRead(contract, "subProfileTemplateRegistryAddress", [])

            return { data, isLoading }
        }

        const getSubProfileTemplateTokenId = () => {
            // from tokenIds[] retrieve the tokenId at index of the subProfileTemplate you need
            // use this tokenId in conjonction with the index
            // as arguments for tbaAccount(uint256 index, uint256 tokenId)
        }

        const getTBAAccount = () => {
            const index = 0
            const tokenId = "tokenId"

            const { contract } = useContract(process.env.NEXT_PUBLIC_SUB_PROFILE_FACTORY_ADDRESS)
            const { data, isLoading } = useContractRead(contract, "tbaAccount", [index, tokenId])

            return { data, isLoading }
        }
    return []
}

export default useSubProfileFactory
