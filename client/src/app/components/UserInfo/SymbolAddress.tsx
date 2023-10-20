import { useAddress } from "@thirdweb-dev/react"
import { FaEthereum } from "react-icons/fa"

type Props = {
    user?: string
    cn?: string
}

const SymbolAddress = ({ user, cn }: Props) => {
    const address = useAddress()
    return user ? (
        <div className="flex items-center justify-center gap-2 rounded-3xl">
            <span className="rounded-full bg-[#FF8F5F] p-2">
                {/* <FaEthereum className="bg-[#FF8F5F]" /> */}
            </span>
            <h3 className="text-sm font-medium tracking-wider text-[#FF8F5F]">
                {user.substring(0, 5)}"..."{user.substring(user.length - 4)}
            </h3>
        </div>
    ) : (
        <div className="flex items-center justify-center gap-2 rounded-3xl">
            <span className="rounded-full bg-[#FF8F5F] p-2">
                <FaEthereum className="bg-[#FF8F5F]" />
            </span>
            <h3 className="text-sm font-medium tracking-wider text-muted-foreground">
                {address?.substring(0, 5)}"..."{address?.substring(address?.length - 4)}
            </h3>
        </div>
    )
}

export default SymbolAddress
