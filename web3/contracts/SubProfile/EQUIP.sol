// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IEQUIP} from "../interfaces/IEQUIP.sol";
import {SubProfileNFT} from "./SubProfileNFT.sol";
import {WhitelistRegistry} from "./WhitelistRegistry.sol";

contract EQUIP is IEQUIP, WhitelistRegistry {
    function verifyBadgeAndEquip(address sender, uint256 tokenId, bytes memory data)
    public 
    returns(Badge memory) {
        address token_owner = SubProfileNFT(msg.sender).ownerOf(tokenId);
        require(msg.sender == token_owner, "Only owner can call");
        VerificationStatus status = _verifyBadge(sender);
        return _Equip(sender, tokenId, data, status);
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

    function _Equip(address sender, uint256 tokenId, bytes memory data, VerificationStatus status)
    internal 
    returns(Badge memory) {
        require(status == VerificationStatus.VERIFIED, "Badge not verified");
        Badge memory badge = Badge(sender, tokenId, data, block.number, status);
        emit BadgeReceived(tokenId, status);
        return badge;
    }
}