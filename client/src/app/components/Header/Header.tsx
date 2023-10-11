import { ConnectWallet } from "@thirdweb-dev/react"
import { ThemeToggle } from ".."
import { useTheme } from "next-themes"

type Props = {}
const Header = (props: Props) => {
    const { theme, setTheme } = useTheme()
    return (
        <>
            <h1 className="text-3xl px-4"> AATBA </h1>
            <div className="flex items-center justify-between space-x-4">
                <ConnectWallet
                    theme={theme === "light" ? "light" : "dark"}
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
