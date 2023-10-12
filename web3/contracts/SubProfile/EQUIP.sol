// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IEQUIP} from "../interfaces/IEQUIP.sol";

contract EQUIP is IEQUIP {

    // TODO: Add a check to ensure correct contract is calling

    // function verifyBadge(address from)
    // public view
    // returns(VerificationStatus status) {
    //     require(msg.sender.code.length > 0, "Only contract can call");
    //     return _verifyBadge(from);
    // }

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