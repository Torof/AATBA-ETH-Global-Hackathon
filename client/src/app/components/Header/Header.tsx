import { ConnectWallet } from "@thirdweb-dev/react"
import { ThemeToggle } from ".."

type Props = {}
const Header = (props: Props) => {
    return (
        <>
            <h1 className="text-3xl"> AATBA </h1>

            <div className="flex items-center justify-between space-x-4">
                <ConnectWallet
                    dropdownPosition={{
                        side: "bottom",
                        align: "center",
                    }}
                />
                <ThemeToggle />
            </div>
        </>
    )
}
export default Header
