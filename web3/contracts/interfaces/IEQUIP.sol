// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IEQUIP {

    enum verifyRequest {
        REQUESTED,
        VERIFIED,
        NOT_VERIFIED, // verification fails
        REMOVED
    }

    struct WhitelistRequest {
        bool requestExists;
        verifyRequest verifiedStatus;
    }

    struct Badge {
        address nftAddress;
        address from;
        uint256 tokenId;
        bytes data; 
        verifyRequest status;
    }

}