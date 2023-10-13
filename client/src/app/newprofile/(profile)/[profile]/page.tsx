"use client"

import { Button } from "@root/app/components/ui/button"

type Props = {
    params: { profile: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { profile }, searchParams }: Props) => {
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h1 className="text-3xl text-muted-foreground">New Sub-Profile {profile}</h1>
            <Button className="mt-12" variant={"default"}> Create </Button>
        </div>
    )
}

export default page
