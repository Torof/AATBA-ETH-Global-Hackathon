import Image from "next/image"
import React from "react"
import { FaEthereum } from "react-icons/fa"
import { FiEdit } from "react-icons/fi"
import { Button } from "../ui/button"

type Props = {
    user: string
}

// ! DUMMY DATA

const PIC = <div className="mx-5 flex h-24 w-24 items-center justify-center rounded-[1.7rem] border"> PIC </div>
const NAME = <h2 className="flex items-center justify-center text-2xl font-semibold text-black/60"> Satoshi </h2>
const BUTTON: React.JSX.Element = (
    <Button size={"icon"} className="mx-5 flex items-center justify-center rounded-lg bg-muted/60 text-black hover:bg-muted dark:text-white">
        <FiEdit className="text-lg" />
    </Button>
)

const UserInfo = ({ user }: Props) => {
    return (
        <div className="flex h-32 items-center justify-between rounded-[2rem] bg-gradient-to-r from-[#FFE1D0] to-[#FFBCBC]">
            {/* profile pic */}
            <div className="mx-5 flex h-24 w-24 items-center justify-center rounded-[1.7rem]">
                <Image src="/pfp.png" height={200} width={200} alt="#" priority />
            </div>
            <div className="flex flex-1 flex-col items-start justify-center gap-2">
                {/* username */}
                {NAME}
                {/* symbol, address */}
                <div className="flex items-center justify-center gap-2 rounded-3xl">
                    <span className="rounded-full bg-[#FF8F5F] p-2">
                        <FaEthereum className="bg-[#FF8F5F]" />
                    </span>
                    <h3 className="text-sm font-medium tracking-wider text-[#FF8F5F]">
                        {user.substring(0, 5)}"..."{user.substring(user.length - 4)}
                    </h3>
                </div>
            </div>
            {BUTTON}
        </div>
    )
}

export default UserInfo
