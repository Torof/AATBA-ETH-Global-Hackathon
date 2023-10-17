import { FC } from "react"

type Props = {
    title: string
    cn?: string
}

const Title: FC<Props> = ({ title, cn }) => {
    return <h2 className={`${cn} font-bold text-muted-foreground`}>{title}</h2>
}

export default Title
