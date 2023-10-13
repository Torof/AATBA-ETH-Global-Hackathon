"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import * as React from "react"
import {AiOutlineShareAlt} from "react-icons/ai"

import { Button } from "@components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import Link from "next/link"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const Dropdown = () => {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="default" size={"sm"} className="bg-transparant"> */}

                    <div className="flex justify-center items-center gap-2 rounded-full py-1 px-3 bg-muted-foreground/40 hover:bg-muted-foreground text-white text-sm"><span className="text-xs">Share</span> <AiOutlineShareAlt /> </div>
                {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Click to Copy</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="">"defdvdvffrf"</Link>
                <Link href="">"edersfewfwff"</Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown
