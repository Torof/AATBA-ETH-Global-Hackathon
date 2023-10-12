import React from "react"
import { FaEthereum } from "react-icons/FA"
import { FiEdit } from "react-icons/FI"
import { Button } from "../ui/button"

type Props = {}

const ETHADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

const PIC: React.JSX.Element = <div className="mx-5 flex h-24 w-24 items-center justify-center rounded-[1.7rem] border"> PIC </div>
const NAME: React.JSX.Element = <p className="flex items-center justify-center text-2xl text-muted-foreground"> "No Name" Yet... </p>
const ADDRESS: React.JSX.Element = (
    <div className="flex items-center justify-center gap-2 rounded-3xl">
        <span className="rounded-full bg-primary p-2">
            <FaEthereum className="" />
        </span>
        <h3>
            {ETHADDRESS.substring(0, 5)}"..."{ETHADDRESS.substring(ETHADDRESS.length - 4)}
        </h3>
    </div>
)
const BUTTON: React.JSX.Element = (
    <Button size={"icon"} className="mx-5 flex items-center justify-center rounded-lg">
        <FiEdit />
    </Button>
)

const UserInfo = (props: Props) => {
    return (
        <div className="flex h-32 items-center justify-between">
            {PIC}
            <div className="flex flex-1 flex-col items-start justify-center gap-2">
                {NAME}
                {ADDRESS}
            </div>
            {BUTTON}
        </div>
    )
}

export default UserInfo
