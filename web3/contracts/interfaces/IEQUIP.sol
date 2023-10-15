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
        address nftAddress;
        address from;
        uint256 tokenId;
        bytes data; 
        VerificationStatus status;
    }

}