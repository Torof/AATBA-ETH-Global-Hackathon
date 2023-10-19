import Image from "next/image"

type Props = {}
const Footer = (props: Props) => {
    return (
        <div className="flex w-screen items-center justify-between px-24">
            <Image height={200} width={200} alt="logo eth online" src={"/eth.svg"} className="" />
            <Image height={200} width={200} alt="logo aatba" src={"/logo.svg"} className="dark:invert" />
        </div>
    )
}
export default Footer
