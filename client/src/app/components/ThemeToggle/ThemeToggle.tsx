"use client"

type Props = {}
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { BiSolidMoon } from "react-icons/bi"
import { BsSun } from "react-icons/bs"
import { Button } from "../ui/button"

const ThemeToggle = () => {
    const [mounted, setMounted] = useState<boolean>(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return theme === "dark" ? (
        <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
            <BsSun className="h-6 w-6 text-muted-foreground" onClick={() => setTheme("light")} />
        </Button>
    ) : (
        <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
            <BiSolidMoon className="h-6 w-6 text-muted-foreground" onClick={() => setTheme("dark")} />
        </Button>
    )
}

export default ThemeToggle