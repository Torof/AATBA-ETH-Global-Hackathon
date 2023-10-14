// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract WhitelistRegistry {

    enum verifyRequest {
        REQUESTED,
        REJECTED,
        VERIFIED,
        NOT_VERIFIED, // verification fails
        REMOVED
    }

    struct WhitelistRequest {
        bool requestExists;
        bytes byteCode;
        verifyRequest verifiedStatus;
    }

    mapping(address => WhitelistRequest) public verificationRequests;
    address immutable public Whitelister;

    modifier onlyWhitelister() {
        require(msg.sender == Whitelister, "Only owner can call this function");
        _;
    }

    constructor() {
        Whitelister = msg.sender;
    }

    function requestForWhitelisting(address contractAddress, bytes memory byteCode) public {
        require(contractAddress != address(0), "Invalid contract address");
        require(contractAddress.code.length > 0, "Address is not a contract address");
        require(!verificationRequests[contractAddress].requestExists, "Request already exists");

        verificationRequests[contractAddress] = WhitelistRequest(true, byteCode, verifyRequest.REQUESTED);
    }

    function removeFromWhitelistRequest(address contractAddress) public {
        require(verificationRequests[contractAddress].requestExists, "Request does not exist");
        require(verificationRequests[contractAddress].verifiedStatus != verifyRequest.VERIFIED, "Only owner can remove these requests");
        require(verificationRequests[contractAddress].verifiedStatus != verifyRequest.REMOVED, "Request already removed");

        verificationRequests[contractAddress] = WhitelistRequest(false, "", verifyRequest.REMOVED);
    }

    function addWhitelisterc(address contractAddress) public onlyWhitelister() {
        require(verificationRequests[contractAddress].requestExists, "Request does not exist");
        require(verificationRequests[contractAddress].verifiedStatus == verifyRequest.REQUESTED, "Whitelisting not requested");

        bytes memory code = contractAddress.code;
        bytes memory sharedCode = verificationRequests[contractAddress].byteCode;
        if (keccak256(code) == keccak256(sharedCode)) {
            verificationRequests[contractAddress].verifiedStatus = verifyRequest.VERIFIED;
        }
    }

    // For testing purposes, to add a trusted EOA
    function addWhitelistEOA(address sender) public onlyWhitelister() {
        require(sender != address(0), "Invalid contract address");
        require(!verificationRequests[sender].requestExists, "Request already exists");

        verificationRequests[sender] = WhitelistRequest(true, "", verifyRequest.VERIFIED);
    }

    // For testing purposes, to remove an EOA
    function removeWhitelistEOA(address sender) public onlyWhitelister() {
        require(verificationRequests[sender].requestExists, "Request does not exist");

        verificationRequests[sender] = WhitelistRequest(false, "", verifyRequest.REMOVED);
    }

    function removeWhitelist(address contractAddress) public onlyWhitelister() {
        require(verificationRequests[contractAddress].requestExists, "Request does not exist");
        require(verificationRequests[contractAddress].verifiedStatus != verifyRequest.REMOVED, "Request already removed");

        verificationRequests[contractAddress] = WhitelistRequest(false, "", verifyRequest.REMOVED);
    }

    function isWhitelisted(address contractAddress) public view returns(bool) {
        if (verificationRequests[contractAddress].verifiedStatus == verifyRequest.VERIFIED) {
            return true;
        } else {
            return false;
        }
    }

    function getRequestSatatus(address contractAddress) public view returns(verifyRequest) {
        return verificationRequests[contractAddress].verifiedStatus;
    }

}