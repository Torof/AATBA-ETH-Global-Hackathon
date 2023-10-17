import { UserInfo } from ".."

type Props = {
    userAccountResponse: {
        data: string
        isLoading: boolean
    }
    cn?: string
}

const PageBanner = ({ userAccountResponse, cn }: Props) => {
    return (
        <div className={`${cn} mx-4 flex flex-col gap-5 rounded-3xl`}>
            <UserInfo user={userAccountResponse.data} />
        </div>
    )
}

export default PageBanner
