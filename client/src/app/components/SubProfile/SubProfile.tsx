import Image from "next/image"
import Link from "next/link"
import { SubProfile } from "../../../../typings"

type Props = {
    profile: SubProfile
}

const SubProfile = ({ profile }: Props) => {
    // const navigateTo = useRouter().push

    return (
        <div className="group h-80 w-80 rounded-[1.7rem] border">
            <Link href={`/profiles/${profile.id}`}>
                <Image
                    className="h-full w-full rounded-[1.7rem] object-cover filter transition duration-300 ease-in-out hover:cursor-pointer group-hover:grayscale"
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
