import { Web3Button } from "@thirdweb-dev/react"

type Props = {}

const CreateUserAccount = (props: Props) => {
    return (
        <Web3Button
            contractAddress="0x98E2DDA0521c526Be9b0a6a08F5f6c0014C44904"
            action={(contract) => {
                contract.call("createUserAccount", [])
            }}
        >
            createUserAccount
        </Web3Button>
    )
}

export default CreateUserAccount
