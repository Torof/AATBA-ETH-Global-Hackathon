import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import { useTheme } from "next-themes"
import { ThemeToggle } from ".."

type Props = {}
const Header = (props: Props) => {
    const connected = useAddress()

    const { theme } = useTheme()
    return (
        <>
            <div>
                {/* logo */}
                <div className=" mt-10">
                    <h1 className="ml-1 pl-4 text-5xl font-bold tracking-widest">
                        {" "}
                        <span>AA</span>
                        <span className="text-muted-foreground">TBA</span>
                    </h1>
                    <div className="flex justify-center items-center">
                        <h6 className="text-center flex-1 pl-5 text-[0.5rem] tracking-[1.25rem] text-muted-foreground"> 4337 </h6>
                        <h6 className="text-left flex-1 pl-2 text-[0.5rem] tracking-[1.25rem] text-muted-foreground"> 6551 </h6>
                    </div>
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
        </>
    )
}
export default Header
