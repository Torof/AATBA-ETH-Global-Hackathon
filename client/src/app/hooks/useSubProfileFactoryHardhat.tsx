import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import { Contract, ethers } from "ethers"
import { useEffect, useState } from "react"
import { subProfileFactoryAbi, subProfileFactoryAddress } from "../../../constants"
// import { subProfileFactoryAbi} from "../../../constants/index"
// import { subProfileFactoryAddress } from "../../../constants/subProfileFactory"

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

    const getSubProfileTemplateRegistryAddress = () => {
        const { contract } = useContract(subProfileFactoryAddress) // SubProfileFactory address
        const { data, isLoading } = useContractRead(contract, "subProfileTemplateRegistryAddress", [])

        return { data, isLoading }
    }

    const getTBAAccount = () => {
        const index = 0
        const tokenId = "tokenId"

        const { contract } = useContract(subProfileFactoryAddress, subProfileFactoryAbi)
        const { data, isLoading } = useContractRead(contract, "tbaAccount", [index, tokenId])

        return { data, isLoading }
    }

    let contract: Contract;
    const connectContract = async () => {
        // const contractAddress = subProfileFactoryAddress
        // const contractAbi = subProfileFactoryAbi

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        // contract = new ethers.Contract(contractAddress, contractAbi, signer)
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
