// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IEQUIP} from "../interfaces/IEQUIP.sol";
import {SubProfileNFT} from "./SubProfileNFT.sol";
import {WhitelistRegistry} from "./WhitelistRegistry.sol";

contract EQUIP is IEQUIP, WhitelistRegistry {

    function verifyBadge(address sender, uint256 tokenId)
    public view
    returns(VerificationStatus status) {
        address token_owner = SubProfileNFT(msg.sender).ownerOf(tokenId);
        require(msg.sender == token_owner, "Only owner can call");
        return _verifyBadge(sender);
    }

    function _verifyBadge(address sender) 
    internal view
    returns(VerificationStatus status) {
        if (verificationRequests[sender].requestExists) {
            if (isWhitelisted(sender)) {
                status = VerificationStatus.VERIFIED;
            } else {
                status = VerificationStatus.PENDING;
            }
        } else {
            status = VerificationStatus.NOT_VERIFIED;
        }  
    }
}