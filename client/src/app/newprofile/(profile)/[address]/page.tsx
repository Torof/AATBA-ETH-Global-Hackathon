"use client"

import { CreateSubProfile } from "@root/app/components"
import { Button } from "@root/app/components/ui/button"

type Props = {
    params: { address: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { address }, searchParams}: Props) => {
    console.log(address)
    
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-3xl text-muted-foreground">New Sub-Profile {address}</h1>
            <CreateSubProfile to={address} subProfileTemplateAddress="0x" />
        </div>
    )
}

export default page
