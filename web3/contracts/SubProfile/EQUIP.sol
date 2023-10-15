// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IEQUIP} from "../interfaces/IEQUIP.sol";
import {SubProfileNFT} from "./SubProfileNFT.sol";
import {WhitelistRegistry} from "./WhitelistRegistry.sol";

contract EQUIP is IEQUIP, WhitelistRegistry {
    function verifyBadgeAndEquip(address senderContract, address from, uint256 tokenId, bytes memory data)
    public 
    returns(Badge memory) {
        SubProfileNFT subProfile = SubProfileNFT(senderContract);
        address token_address = address(subProfile);
        VerificationStatus status = _verifyBadge(token_address);
        return _Equip(token_address, from, tokenId, data, status);
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

    function _Equip(address nftAddress, address from, uint256 tokenId, bytes memory data, VerificationStatus status)
    internal 
    returns(Badge memory) {
        require(status == VerificationStatus.VERIFIED, "Badge not verified");
        Badge memory badge = Badge(nftAddress, from, tokenId, data, status);
        emit BadgeReceived(tokenId, status);
        return badge;
    }
}