// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IEQUIP} from "../interfaces/IEQUIP.sol";
import {SubProfileNFT} from "./SubProfileNFT.sol";
import {WhitelistRegistry} from "./WhitelistRegistry.sol";
import "hardhat/console.sol";

contract EQUIP is IEQUIP, WhitelistRegistry {

    function verifyBadgeAndEquip(address senderContract, address from, uint256 tokenId, bytes memory data)
    public 
    view
    returns(Badge memory) {
        console.log("EQUIP sender: ", senderContract);
        bool verified = isWhitelisted(senderContract);
        console.log("EQUIP, is whitelisted: ", verified);
        require(verified,"Sender Contract is not whitelisted");
        Badge memory badge = Badge(senderContract, from, tokenId, data, verifyRequest.VERIFIED);
        return badge;       
    }

}