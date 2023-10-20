import { useSimpleContract, useSubProfileTBA } from "@root/app/hooks";
import { useContract } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import { subProfileTBAAbi } from "../../../../constants";

type Props = {
}

const SubProfileBadges = (props: Props) => {
    const [getSubProfileBadges] = useSubProfileTBA()
    // const [getSubProfile] = useSimpleContract()
    const badges = getSubProfileBadges("0xAE6abA5c354Ac9a70764b6bECfBaE25e5C2f0b20")

    console.log(badges);
    


        return badges && badges.data ? <div>
            <p>{badges.data}</p>
        </div> : "null"
};

export default SubProfileBadges;
