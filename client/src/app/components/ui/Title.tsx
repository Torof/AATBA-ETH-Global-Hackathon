import { toTitleCase } from "@root/app/utils/helperFunctions"

type Props = {
    title: string
    cn?: string
}

const Title = ({ title, cn }: Props) => {
    return <h2 className={`${cn} font-bold text-muted-foreground`}>{toTitleCase(title)}</h2>
}

export default Title
