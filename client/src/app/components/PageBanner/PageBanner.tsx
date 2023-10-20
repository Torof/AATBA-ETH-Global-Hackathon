import Image from "next/image"
import { UserInfo } from ".."

type Props = {
    userAccountResponse?: {
        data: string
        isLoading: boolean
    }
    cn?: string
    subProfile?: string
}

const PageBanner = ({ userAccountResponse, cn, subProfile }: Props) => {
    return userAccountResponse && userAccountResponse.data ? (
        <div className={`${cn} mx-4 flex flex-col gap-5 rounded-3xl`}>
            <UserInfo user={userAccountResponse.data} />
        </div>
    ) : subProfile && subProfile !== "" ? (
        <div>
            {/* banner */}
            <div className={`${cn} relative z-10 mx-auto h-64 max-w-6xl rounded-3xl`}></div>
            <div className="absolute left-0 right-0 top-0 z-20 mx-auto h-64 w-screen max-w-6xl rounded-3xl backdrop-blur-md backdrop-brightness-90"></div>
            <Image
                className="absolute left-0 right-0 top-0 z-10 mx-auto h-64 w-screen max-w-6xl rounded-3xl object-cover backdrop-blur-lg backdrop-brightness-110"
                src={`/${subProfile}.png`}
                height={200}
                width={200}
                alt="#"
                priority
            />
            {/* profile pic */}
            <div className="absolute left-0 right-0 top-[13rem] z-30 mx-auto h-24 w-24 max-w-6xl rounded-[1.7rem]">
                <Image className="" src="/pfp.png" height={200} width={200} alt="#" priority />
            </div>
        </div>
    ) : (
        <>
            {/* banner */}
            <div className={`${cn} relative z-10 mx-auto h-96 max-w-6xl rounded-3xl`}></div>
            {/* <div className="absolute left-0 right-0 top-0 z-20 mx-auto h-64 w-screen max-w-6xl rounded-3xl backdrop-blur-md backdrop-brightness-90"></div> */}
        </>
    )
}

export default PageBanner
