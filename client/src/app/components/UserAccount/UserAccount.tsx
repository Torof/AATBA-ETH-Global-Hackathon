import { GrMagic } from "react-icons/gr"
import { IoMdSchool } from "react-icons/io"
import { MdEmojiEvents, MdOutlineWork } from "react-icons/md"
import { SubProfile as SubProfileType } from "../../../../typings"
import { SubProfile, Title, UserInfo, Dropdown } from "../index"

type Props = {
    address: string
}

const SUBPROFILES: SubProfileType[] = [
    { id: 0, name: "Jobs", profilePic: "/jobs.png" },
    { id: 1, name: "Contest", profilePic: "/contest.png" },
    { id: 2, name: "Education", profilePic: "/education.png" },
    { id: 3, name: "Create", profilePic: "/create.png" },
]

const UserAccount = ({ address }: Props) => {
    console.log(address)
    // address ? <span></span>

    return (
        <div className="container">
            <div className="mx-4 flex flex-col gap-5 rounded-3xl border">
                <UserInfo />
            </div>
            <div className="mt-12 flex flex-wrap justify-evenly gap-4 p-4">
                {SUBPROFILES.map((profile) => (
                    <div
                        key={profile.id}
                        className="relative flex h-[500px] flex-col items-center justify-center gap-4 rounded-3xl border border-purple-800"
                    >
                        <div className="absolute top-0 z-10 h-[65px] w-full rounded-t-3xl border backdrop-blur-md flex justify-between items-center">
                            {profile.id === 0 ? (
                                <MdOutlineWork className="ml-4" />
                            ) : profile.id === 1 ? (
                                <MdEmojiEvents className="ml-4" />
                            ) : profile.id === 2 ? (
                                <IoMdSchool className="ml-4" />
                            ) : (
                                <GrMagic className="ml-4" />
                            )}
                            <Title title={profile.name} cn="absolute top-3 left-12 text-black/60" />
                            <div className="mr-4">
                            <Dropdown />

                            </div>
                        </div>
                        <SubProfile profile={profile} cn="h-[400px]" />
                        <div className="absolute bottom-0 h-24 w-full rounded-b-[1.7rem] bg-[#FFEDED]"></div>
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
