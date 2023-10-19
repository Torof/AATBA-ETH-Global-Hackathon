import { Dropdown, Title } from "@components/index"
import { GrMagic } from "react-icons/gr"
import { IoMdSchool } from "react-icons/io"
import { MdEmojiEvents, MdOutlineWork } from "react-icons/md"
import { SubProfile, SubProfileContract } from "../../../../typings"

type Props = {
    profile: SubProfile
    contract: SubProfileContract
}

const SubProfileCardHeader = ({ profile, contract }: Props) => {
    return (
        <div className="absolute top-0 z-10 flex h-[65px] w-full items-center justify-between rounded-t-3xl bg-white bg-opacity-60 backdrop-blur-md">
            {profile.id === 0 ? (
                <MdOutlineWork className="ml-4 text-muted-foreground dark:text-secondary/70" />
            ) : profile.id === 1 ? (
                <MdEmojiEvents className="ml-4 text-muted-foreground dark:text-secondary/70" />
            ) : profile.id === 2 ? (
                <IoMdSchool className="ml-4 text-muted-foreground dark:text-secondary/70" />
            ) : (
                <GrMagic className="ml-4 text-muted-foreground dark:text-secondary/70" />
            )}
            <Title
                title={contract && contract.name ? contract.name : "Create"}
                cn="absolute top-[4.5] left-10 text-muted-foreground dark:text-secondary/70 tracking-widest"
            />
            <div className="mr-4">
                <Dropdown items={["etherscan", "IPFS"]} shareBtn={true} />
            </div>
        </div>
    )
}

export default SubProfileCardHeader
