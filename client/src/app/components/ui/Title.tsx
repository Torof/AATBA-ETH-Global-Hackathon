type Props = {
    title: string
}

const Title = ({ title }: Props) => {
    return <h2 className="text-3xl text-muted-foreground font-bold">{title}</h2>
}

export default Title
