// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISubProfileTBA {
    event AddedBadge(address indexed userSubProfile, uint256 indexed tokenId);

    struct SubProfileTBA {
        address tbaAddress;
        uint256 tokenId;
        uint256 blockNumber; // Received timeStamp
    }
}