// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IEQUIP {
    event BadgeReceived(uint256 indexed tokenId, VerificationStatus status);

    enum VerificationStatus {
        PENDING,
        VERIFIED,
        NOT_VERIFIED
    }

    struct Badge {
        address source;
        uint256 tokenId;
        bytes data; 
        uint256 blockNumber; // Received timeStamp
        VerificationStatus status;
    }

}