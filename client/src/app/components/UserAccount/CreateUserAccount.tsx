import { Web3Button } from "@thirdweb-dev/react"

type Props = {}

const CreateUserAccount = (props: Props) => {
    return (
        <Web3Button
            contractAddress={process.env.NEXT_PUBLIC_USER_ACCOUNT_FACTORY_ADDRESS!}
            action={(contract) => {
                contract.call("createUserAccount", [])
            }}
        >
            createUserAccount
        </Web3Button>
    )
}

export default CreateUserAccount
