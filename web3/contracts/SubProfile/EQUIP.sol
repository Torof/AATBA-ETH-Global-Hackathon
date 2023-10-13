// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IEQUIP} from "../interfaces/IEQUIP.sol";
import {SubProfileNFT} from "./SubProfileNFT.sol";

contract EQUIP is IEQUIP {

    function verifyBadge(address from, uint256 tokenId)
    public view
    returns(VerificationStatus status) {
        address token_owner = SubProfileNFT(msg.sender).ownerOf(tokenId);
        require(msg.sender == token_owner, "Only owner can call");
        return _verifyBadge(from);
    }

    function _verifyBadge(address from) 
    internal view
    returns(VerificationStatus status) {
        if (from.code.length > 0) {
            status = VerificationStatus.VERIFIED;
        } else {
            status = VerificationStatus.NOT_VERIFIED;
        }
    }
}