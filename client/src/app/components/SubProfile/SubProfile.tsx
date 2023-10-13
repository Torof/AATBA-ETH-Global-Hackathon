import Image from "next/image"
import Link from "next/link"
import { SubProfile } from "../../../../typings"

type Props = {
    profile: SubProfile;
    cn?: string;
}

const SubProfile = ({ profile, cn }: Props) => {
    // const navigateTo = useRouter().push

    return (
        <div className={`${cn} group w-80 rounded-[1.7rem] border`}>
            <Link href={profile.id !== 3 ? `/profiles/${profile.id}` : `/newprofile/${profile.id}`}>
                <Image
                    className="absolute top-0 z-0 h-full w-full rounded-[1.7rem] object-cover filter transition duration-300 ease-in-out hover:cursor-pointer group-hover:grayscale"
                    src={profile.profilePic}
                    height={500}
                    width={500}
                    alt="#"
                />
            </Link>
        </div>
    )
}

export default SubProfile
