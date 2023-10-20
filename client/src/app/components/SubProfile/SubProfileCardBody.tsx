import Image from "next/image"
import Link from "next/link"
import { SubProfileCardFooter } from ".."
import { SubProfile } from "../../../../typings"

type Props = {
    profile: SubProfile
    cn?: string
    userAddress: string
}

const SubProfileCardBody = ({ profile, cn, userAddress }: Props) => {
    // const navigateTo = useRouter().push

    return (
        <Link href={profile.id !== 3 ? `/profiles/${profile.name.toLowerCase()}` : `/newprofile/${profile.name.toLowerCase()}`}>
            <div className={`${cn} group h-96 rounded-[1.7rem]`}>
                <Image
                    className="absolute top-0 z-0 h-96 w-full rounded-[1.7rem] object-cover filter transition duration-300 ease-in-out hover:cursor-pointer shadow group-hover:drop-shadow-2xl"
                    src={profile.profilePic}
                    height={500}
                    width={500}
                    alt="#"
                />
                <div className="">
                    <SubProfileCardFooter
                        cn={"hidden group-hover:block absolute group-hover:bottom-[-5px] transition group-hover:duration-150 ease-in-out"}
                    />
                </div>
            </div>
        </Link>
    )
}

export default SubProfileCardBody
