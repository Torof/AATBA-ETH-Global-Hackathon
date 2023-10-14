import Image from "next/image"
import Link from "next/link"
import { SubProfile } from "../../../../typings"
import { SubProfileFooter } from "..";

type Props = {
    profile: SubProfile
    cn?: string
    userAddress: string;
}

const SubProfileBody = ({ profile, cn, userAddress }: Props) => {
    // const navigateTo = useRouter().push

    return (
        <div className={`${cn} group w-80 max-w-fit rounded-[1.7rem]`}>
            <Link href={profile.id !== 3 ? `/profiles/${profile.id}` : `/newprofile/${userAddress}`}>
                <Image
                    className="absolute top-0 z-0 h-full w-full rounded-[1.7rem] object-cover filter transition duration-300 ease-in-out hover:cursor-pointer"
                    src={profile.profilePic}
                    height={500}
                    width={500}
                    alt="#"
                />
                <div className="">
                    <SubProfileFooter cn={"hidden group-hover:block absolute group-hover:bottom-0 transition group-hover:duration-150 ease-in-out"} />
                </div>
            </Link>
        </div>
    )
}

export default SubProfileBody
