"use client"

type Props = {
    params: { profile: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ params: { profile }, searchParams }: Props) => {
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <h1 className="text-3xl text-muted-foreground">TBA: {profile}</h1>
            "BADGES"
        </div>
    )
}

export default page
