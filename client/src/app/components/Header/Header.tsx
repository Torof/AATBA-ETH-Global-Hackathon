import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import { useTheme } from "next-themes"
import { ThemeToggle } from ".."

type Props = {}
const Header = (props: Props) => {
    const connected = useAddress()

    const { theme } = useTheme()
    return (
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
            {/* logo */}
            <div className="">
                <h1 className="ml-1 pl-4 text-5xl font-bold tracking-widest">
                    {" "}
                    <span>AA</span>
                    <span className="text-muted-foreground">TBA</span>
                </h1>
                <div className="flex items-center justify-center">
                    <h6 className="flex-1 pl-5 text-center text-[0.5rem] tracking-[1.25rem] text-muted-foreground"> 4337 </h6>
                    <h6 className="flex-1 pl-2 text-left text-[0.5rem] tracking-[1.25rem] text-muted-foreground"> 6551 </h6>
                </div>
            </div>
            <div className="flex items-center justify-between space-x-4 pr-2">
                {connected ? (
                    <ConnectWallet
                        btnTitle="Login"
                        displayBalanceToken={"false"}
                        theme={theme === "light" ? "light" : "dark"}
                        dropdownPosition={{
                            side: "bottom",
                            align: "center",
                        }}
                    />
                ) : null}
                <ThemeToggle />
            </div>
        </div>
    )
}
export default Header
