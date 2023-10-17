"use client"

import { CreateSubProfile, CreateSubProfileTemplate } from "@root/app/components"
import { useState } from "react"

type Props = {
    params: { address: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { address }, searchParams }: Props) => {
    const [templateValue, setTemplateValue] = useState<number>()
    const onTemplateChange = (event: any) => setTemplateValue(event.target.value)

    // const [simpleAccountAddress, setSimpleAccountAddress] = useState<string>("")
    // const onSimpleAccountAddressChange = (event: any) => {
    //     console.log(event.target.value);
        
    //     setSimpleAccountAddress(event.target.value)
    // }

    const [nameValue, setNameValue] = useState<string>("")
    const onNameChange = (event: any) => setNameValue(event.target.value)

    const [symbolValue, setSymbolValue] = useState<string>("")
    const onSymbolChange = (event: any) => setSymbolValue(event.target.value)

    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <h1 className="text-center text-3xl text-muted-foreground">New Sub-Profile</h1>
            </div>
            <div className="mt-12 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
                {/* <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="max-w-lg flex-1 rounded-lg pl-4"
                    value={nameValue}
                    onChange={(e) => onNameChange(e)}
                />
                <input
                    type="text"
                    name="symbol"
                    placeholder="symbol"
                    className="max-w-lg flex-1 rounded-lg pl-4"
                    value={symbolValue}
                    onChange={(e) => onSymbolChange(e)}
                />
                <CreateSubProfileTemplate name={nameValue} symbol={symbolValue} /> */}
            </div>
            <div className="mt-12 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
                <input
                    type="text"
                    name="simpleAccountAddress"
                    placeholder="0: work, 1: hackathon, 3: education"
                    className="max-w-5xl flex-1 rounded-lg pl-4"
                    value={templateValue}
                    onChange={(e) => onTemplateChange(e)}
                />
                <CreateSubProfile templateIndex={templateValue!} contractAddress={process.env.NEXT_PUBLIC_PUBLIC_WALLET_ADDRESS!} />
            </div>
        </div>
    )
}

export default page
