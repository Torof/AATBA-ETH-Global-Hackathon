import { useUserAccountFactory, useSubProfileFactory, useSimpleContract } from "@hooks/index"
import { Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers"
import { Fragment, useState } from "react"
import HashLoader from "react-spinners/HashLoader"
import { SubProfile as SubProfileType } from "../../../../typings"
import { CreateSubProfileTemplate, CreateUserAccount, Dropdown, SubProfile, UserInfo } from "../index"
import { subProfileFactoryAbi } from "../../../../constants";

type Props = {
    userAddress: string
}

const SUBPROFILES: SubProfileType[] = [
    // { id: 0, name: "Jobs", profilePic: "/jobs.png" },
    // { id: 1, name: "Contest", profilePic: "/contest.png" },
    // { id: 2, name: "Education", profilePic: "/education.png" },
    // { id: 3, name: "Create", profilePic: "/create.png" },
]

const UserAccount = ({ userAddress }: Props) => {
    console.log(userAddress)

    const [nameValue, setNameValue] = useState<string>("")
    const [symbolValue, setSymbolValue] = useState<string>("")
    const onNameChange = (event: any) => setNameValue(event.target.value)
    const onSymbolChange = (event: any) => setSymbolValue(event.target.value)

    const [getUserAccount] = useUserAccountFactory()
    const userAccountResponse = getUserAccount()

    // const [getSubProfileTemplateRegistryAddress] = useSubProfileFactory()
    // const templateRegistryResponse = getSubProfileTemplateRegistryAddress()

    const [getSubProfile] = useSimpleContract()
    const subProfile = getSubProfile(0)

    console.log("subProfile", subProfile)

    const connectContract = async () => {
        const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
        const contractAbi = subProfileFactoryAbi

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        console.log(contract)
    }

    return userAccountResponse?.data === undefined ? (
        // ! No User Account available
        <div className="flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <CreateUserAccount />
        </div>
    ) : userAccountResponse && userAccountResponse.isLoading && !userAccountResponse.data ? (
        // ! Still loading..
        <div className="flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <HashLoader color="#FF8F5F" />
        </div>
    ) : userAccountResponse && !userAccountResponse.isLoading && userAccountResponse.data !== "0x0000000000000000000000000000000000000000" ? (
        // ! User Account available with valid address
        <div className="container">
            <div className="mx-4 flex flex-col gap-5 rounded-3xl">
                <UserInfo user={userAccountResponse.data} />
            </div>

            {/* Show sub profiles, if any */}
            <div className="mt-12 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
                <input type="text" name="name" placeholder="name" className="pl-4 rounded-lg" value={nameValue} onChange={(e) => onNameChange(e)} />
                <input type="text" name="symbol" placeholder="symbol" className="pl-4 rounded-lg" value={symbolValue} onChange={(e) => onSymbolChange(e)} />
                <CreateSubProfileTemplate name={nameValue} symbol={symbolValue} />

                {SUBPROFILES.map((profile) => (
                    <Fragment key={profile.id}>
                        <SubProfile userAddress={userAddress} profile={profile} />
                    </Fragment>
                ))}
                {/* Are there any sub-profiles?? */}
                {/* <UserAccountItem /> */}
                {/* Show Tile with an NFT, representing an Sub-Profile */}
                {/* Create a new sub-profile */}
            </div>
            {/* create sub profile */}
        </div>
    ) : (
        // ! No User Account available
        // TODO: Rerender the page when the user account is created
        <div className="flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <CreateUserAccount />
        </div>
    )
}

export default UserAccount
