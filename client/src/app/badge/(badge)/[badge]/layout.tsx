import { FC, ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <div className="bg-[#F1FFF8] dark:bg-background">{children}</div>
}

export default Layout
