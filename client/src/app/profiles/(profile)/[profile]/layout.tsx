import { FC, ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <div className="bg-[#FEF5FF] dark:bg-background">{children}</div>
}

export default Layout
