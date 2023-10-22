type Props = { cn?: string }

const SubProfileCardFooter = ({ cn }: Props) => {
    return (
        <div className={`${cn} h-28 w-full rounded-b-[1.7rem] backdrop-blur-lg backdrop-brightness-50`}>
            <h3 className="text-md mb-1 py-1.5 pl-4 font-semibold text-white">Achievements</h3>
            <div className="mx-4 flex h-12 w-12 items-center justify-center rounded-2xl border text-xs text-white">Badge</div>
        </div>
    )
}

export default SubProfileCardFooter
