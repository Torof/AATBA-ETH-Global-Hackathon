import useUserAccountFactory from "@hooks/useUserAccountFactory"

import HashLoader from "react-spinners/HashLoader"
import { SubProfile as SubProfileType } from "../../../../typings"
import { CreateUserAccount, SubProfile, SubProfileFooter, SubProfileHeader, UserInfo } from "../index"

type Props = {
    userAddress: string
}

const SUBPROFILES: SubProfileType[] = [
    { id: 0, name: "Jobs", profilePic: "/jobs.png" },
    { id: 1, name: "Contest", profilePic: "/contest.png" },
    { id: 2, name: "Education", profilePic: "/education.png" },
    { id: 3, name: "Create", profilePic: "/create.png" },
]

const UserAccount = ({ userAddress }: Props) => {
    const [getUserAccount] = useUserAccountFactory()
    const userAccountResponse = getUserAccount()

    return userAccountResponse && userAccountResponse.isLoading ? (
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
            <div className="mt-12 flex flex-wrap justify-evenly gap-4 p-4">
                {SUBPROFILES.map((profile) => (
                    <div key={profile.id} className="relative flex h-[500px] flex-col items-center justify-center gap-4 rounded-3xl">
                        <SubProfileHeader profile={profile} />
                        <SubProfile profile={profile} cn="h-[400px]" />
                        <SubProfileFooter />
                    </div>
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
        <div className="flex h-screen max-h-[32rem] w-screen max-w-5xl items-center justify-center">
            <CreateUserAccount />
        </div>
    )
}

export default UserAccount
