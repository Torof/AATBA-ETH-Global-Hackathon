import { Title, UserInfo, SubProfile } from "../index"
import { SubProfile as SubProfileType } from "../../../../typings"


type Props = {
    address: string
}

const SUBPROFILES: SubProfileType[] = [
    { id: 0, name: "Work", profilePic: "/punk1.png" },
    { id: 1, name: "Contest", profilePic: "/punk2.webp" },
    { id: 2, name: "Education", profilePic: "/punk3.png" },
]

const UserAccount = ({ address }: Props) => {
    console.log(address)
    // address ? <span></span>

    return (
        <div>
            <div className="flex flex-col gap-5 rounded-3xl border mx-4">
                <UserInfo />
            </div>
            <div className="flex flex-wrap justify-evenly gap-4 p-4 mt-12">
                {SUBPROFILES.map((profile) => (
                    <div key={profile.id} className="flex flex-col justify-center items-center gap-4">
                        <Title title={profile.name} />
                        <SubProfile profile={profile} />
                    </div>
                ))}
                {/* Are there any sub-profiles?? */}
                {/* <UserAccountItem /> */}
                {/* Show Tile with an NFT, representing an Sub-Profile */}
                {/* Create a new sub-profile */}
            </div>
        </div>
    )
}

export default UserAccount
