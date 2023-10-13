import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react"
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
        const { contract } = useContract("0xe0BafCA03141126bcf402BDaf7020Ac9939E1297")
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
        const { contract } = useContract("0xe0BafCA03141126bcf402BDaf7020Ac9939E1297")
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

    return []
}

export default useSubProfileFactory
