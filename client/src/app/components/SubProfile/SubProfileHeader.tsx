import { Dropdown, Title } from "@components/index"
import { GrMagic } from "react-icons/gr"
import { IoMdSchool } from "react-icons/io"
import { MdEmojiEvents, MdOutlineWork } from "react-icons/md"

type Props = {
    profile: {
        id: number;
        name: string;
    }
}

const SubProfileHeader = ({ profile }: Props) => {
    return (
        <div className="absolute top-0 z-10 flex h-[65px] w-full items-center justify-between rounded-t-3xl backdrop-blur-md">
            {profile.id === 0 ? (
                <MdOutlineWork className="ml-4" />
            ) : profile.id === 1 ? (
                <MdEmojiEvents className="ml-4" />
            ) : profile.id === 2 ? (
                <IoMdSchool className="ml-4" />
            ) : (
                <GrMagic className="ml-4" />
            )}
            <Title title={profile.name} cn="absolute top-[4.5] left-10 text-black/70" />
            <div className="mr-4">
                <Dropdown />
            </div>
        </div>
    )
}

export default SubProfileHeader
