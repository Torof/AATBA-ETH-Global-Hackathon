"use client"

import { CreateSubProfile, CreateSubProfileTemplate, Dropdown, PageBanner, Title } from "@root/app/components"
import Image from "next/image"
import { ChangeEvent, useState } from "react"

type Props = {
    params: { address: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { address }, searchParams }: Props) => {
    const [templateValue, setTemplateValue] = useState<number>(0)
    const onTemplateChange = (event: ChangeEvent<any>) => {
        setTemplateValue(event.target.value)
    }

    const [nameValue, setNameValue] = useState<string>("")
    const onNameChange = (event: any) => setNameValue(event.target.value)

    const [symbolValue, setSymbolValue] = useState<string>("")
    const onSymbolChange = (event: any) => setSymbolValue(event.target.value)

    return address && address !== "" ? (
        <>
            <div>
                <PageBanner subProfile={address} />
                <div className="mx-auto max-w-6xl py-8">
                    <Title title={address} cn="text-4xl" />
                </div>
                <div className="relative mx-auto mb-44 flex w-full max-w-6xl flex-col items-center justify-center gap-4 md:flex-row md:items-start">
                    {/* <Sidebar /> */}
                    <div className="relative flex w-1/4 flex-col">
                        <div className="absolute left-0 right-0 top-0 h-16 rounded-t-3xl bg-white opacity-60">
                            <div className="m-5 ml-28 mr-28">
                                <Dropdown items={["etherscan", "IPFS"]} btnText="Share" shareBtn={true} />
                            </div>
                        </div>
                        {address === "create" ? (
                            <div className="flex flex-col gap-8">
                                <Image height={200} width={200} alt="logo aatba" src={"/create.png"} className="h-96 w-auto rounded-3xl" />
                            </div>
                        ) : null}
                        <div>
                            <p className="mt-4 leading-relaxed">
                                You like to keep on keeping it on, challenging yourself, testing your skills. This profile shows how skilled you are,
                                let the people know you’re the GOAT.
                            </p>
                        </div>
                        {/* <div className="mt-16 rounded-3xl border border-pink-300 p-4">
                        <h3> On Chain Info</h3>
                        <div className="flex justify-between">
                            <span> Contract Address</span>
                            <span>0x .... </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Chain:</span>
                            <span>Ethereum</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date Minted</span>
                            <span>Sept 25, 2023</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Token Standard</span>
                            <span> ERC-4337 </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Token Id</span>
                            <span>#68714</span>
                        </div>
                    </div> */}
                    </div>
                    {/* achievements */}
                    <div className="achievements flex flex-1 flex-col rounded-3xl border border-pink-300 p-4">
                        <div className="p-12">
                            <div className="min-w-44 relative rounded-2xl pb-10">
                                <div
                                    className="absolute -inset-px z-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-400"
                                    aria-hidden="true"
                                ></div>
                                <div className="absolute inset-0 z-0 rounded-2xl bg-[#FEF5FF] dark:bg-zinc-900" aria-hidden="true"></div>
                                <div className="absolute z-10 w-full px-2 text-center text-3xl font-normal text-zinc-900 dark:text-zinc-100">
                                    Achievements
                                </div>
                            </div>
                        </div>
                        <div className="mb-8 ml-12 flex items-center justify-start gap-4">
                            <Image height={200} width={200} alt="logo aatba" src={"/badges/NEXT.png"} className="h-72 w-auto object-contain" />
                        </div>
                    </div>
                </div>
                {/* create sub profile template */}
                <div className="mx-auto my-6 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
                    <input
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
                    <CreateSubProfileTemplate name={nameValue} symbol={symbolValue} />
                </div>
                {/* create sub profile */}
                <div className="mx-auto w-screen max-w-5xl flex justify-start items-center pl-8">
                    <label className="hover:cursor-pointer" htmlFor="templateIndex">
                        0: work, 1: hackathon, 2: education
                    </label>
                </div>
                <div className="mx-auto mb-44 flex w-screen max-w-5xl flex-wrap gap-4 px-4">
                    <input
                        id="templateIndex"
                        type="text"
                        name="templateIndex"
                        placeholder="0: work, 1: hackathon, 2: education"
                        className="max-w-5xl flex-1 rounded-lg pl-4"
                        value={templateValue}
                        onChange={(e) => onTemplateChange(e)}
                    />
                    <CreateSubProfile templateIndex={templateValue!} />
                </div>
            </div>
        </>
    ) : null
}

export default page
