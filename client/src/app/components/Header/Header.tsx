import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { ThemeToggle } from ".."
import { useRouter } from "next/navigation"
import { Link } from "lucide-react"
import { redirect } from "next/navigation"

type Props = {}
const Header = (props: Props) => {
    const connected = useAddress()
    const { theme } = useTheme()
    const { push } = useRouter()
    return (
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
            {/* logo */}
            <div className="">
                <Image height={200} width={200} alt="logo aatba" src={"/logo.svg"} className="dark:invert hover:cursor-pointer" onClick={() => push("/")} />
                {/* <h1 className="ml-1 pl-4 text-5xl font-bold tracking-widest">
                    {" "}
                    <span>AA</span>
                    <span className="text-muted-foreground">TBA</span>
                </h1>
                <div className="flex items-center justify-center">
                    <h6 className="flex-1 pl-5 text-center text-[0.5rem] tracking-[1.25rem] text-muted-foreground"> 4337 </h6>
                    <h6 className="flex-1 pl-2 text-left text-[0.5rem] tracking-[1.25rem] text-muted-foreground"> 6551 </h6>
                </div> */}
            </div>
            <div className="flex items-center justify-between space-x-4 pr-2">
                
                    <ConnectWallet
                        className="bg-muted-foreground dark:bg-slate-800/60 dark:text-muted-foreground dark:hover:bg-slate-700/60 hover:bg-gray-200 animate-pulse"
                        btnTitle="Login"
                        displayBalanceToken={"false"}
                        // theme={theme === "light" ? "light" : "dark"}
                        dropdownPosition={{
                            side: "bottom",
                            align: "center",
                        }}
                    />
                
                <ThemeToggle />
            </div>
        </div>
    )
}
export default Header
