// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISimpleUserAccount {
    event AddedSubProfile(address indexed userAccount, address indexed subProfile, uint256 indexed tokenId);
}