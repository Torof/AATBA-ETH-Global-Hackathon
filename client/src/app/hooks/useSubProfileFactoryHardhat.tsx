import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import { Contract, ethers } from "ethers"
import { useEffect, useState } from "react"
import { subProfileFactoryAbi} from "../../../constants/index"
import { subProfileFactoryAddress } from "../../../constants/subProfileFactory"

interface UserAccountProps {
    account?: string
}

const useSubProfileFactory = () => {
    const address = useAddress()
    const [userAddress, setUserAddress] = useState<string>(address!)
    const [subProfileTemplateAddress, setSubProfileTemplateAddress] = useState<string>()
    const [contractData, setContractData] = useState<Contract>();
    

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

    let contract: Contract;
    const connectContract = async () => {
        const contractAddress = subProfileFactoryAddress
        const contractAbi = subProfileFactoryAbi

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        contract = new ethers.Contract(contractAddress, contractAbi, signer)
        console.log(contract)
    }
    
    const getUserAccount = async () => {
        const res = await contract.getUserAccount()
        setContractData(res)
        console.log("state", contractData)
    }

    const setDataFromContract = async () => {
        const txResponse = await contract.subProfileTemplateRegistryAddress()
        const txReceipt = await txResponse.wait()
        console.log(txReceipt)
    }


    return [getSubProfileTemplateRegistryAddress]
}

export default useSubProfileFactory
