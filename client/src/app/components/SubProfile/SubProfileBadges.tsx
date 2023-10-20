import { useEvents, useSimpleContract, useSubProfileTBA } from "@root/app/hooks"
import { subProfileTBAAbi } from "../../../../constants"

type Props = {}

const SubProfileBadges = (props: Props) => {
    const [getSubProfileBadges, getSubProfileBadgesArray] = useSubProfileTBA()
    const [getReceivedERC721Events] = useEvents()
    const [getSubProfile] = useSimpleContract()

    const badges = getSubProfileBadges("0xAE6abA5c354Ac9a70764b6bECfBaE25e5C2f0b20")
    const badgesArray = getSubProfileBadgesArray("0xAE6abA5c354Ac9a70764b6bECfBaE25e5C2f0b20")
    const events = getReceivedERC721Events("0xAE6abA5c354Ac9a70764b6bECfBaE25e5C2f0b20", subProfileTBAAbi)

    console.log(badges, badgesArray, events)

    return badges && badges.data ? (
        <div>
            <p>{badges.data}</p>
        </div>
    ) : (
        "null"
    )
}

export default SubProfileBadges
