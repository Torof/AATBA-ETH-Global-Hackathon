// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract WhitelistRegistry is Ownable2Step {

    enum verifyRequest {
        REQUESTED,
        REJECTED,
        VERIFIED,
        NOT_VERIFIED, // verification fails
        REMOVED
    }

    struct WhitelistRequest {
        bool requestExists;
        bytes code;
        verifyRequest verifiedStatus;
    }

    mapping(address => WhitelistRequest) verificationRequests;

    constructor() Ownable(msg.sender) {}

    function requestForWhitelisting(address contractAddress, bytes memory code) public {
        require(contractAddress != address(0), "Invalid contract address");
        require(contractAddress.code.length > 0, "Address is not a contract address");
        require(!verificationRequests[contractAddress].requestExists, "Request already exists");

        verificationRequests[contractAddress] = WhitelistRequest(true, code, verifyRequest.REQUESTED);
    }

    function removeFromWhitelistRequest(address contractAddress) public {
        require(verificationRequests[contractAddress].requestExists, "Request does not exist");
        require(verificationRequests[contractAddress].verifiedStatus != verifyRequest.VERIFIED, "Only owner can remove these requests");
        require(verificationRequests[contractAddress].verifiedStatus != verifyRequest.REMOVED, "Request already removed");

        verificationRequests[contractAddress] = WhitelistRequest(false, "", verifyRequest.REMOVED);
    }

    // function addWhitelisterc721(address contractAddress) public onlyOwner() {
    //     require(verificationRequests[contractAddress].requestExists, "Request does not exist");
    //     require(verificationRequests[contractAddress].verifiedStatus == verifyRequest.REQUESTED, "Whitelisting not requested");

    //     // Get the contract
    //     ERC721 targetContract = ERC721(contractAddress);
    //     bytes memory targetCode = contractAddress.code;
    //     bytes memory code = targetContract.creationCode;
    //     if (code == targetCode) {
    //         verificationRequests[contractAddress].verifiedStatus = verifyRequest.VERIFIED;
    //     }
    // }

    function addWhitelisterc1155(address contractAddress) public onlyOwner() {
        require(verificationRequests[contractAddress].requestExists, "Request does not exist");
        require(verificationRequests[contractAddress].verifiedStatus == verifyRequest.REQUESTED, "Whitelisting not requested");

        bytes memory code = contractAddress.code;
        bytes memory sharedCode = verificationRequests[contractAddress].code;
        if (keccak256(code) == keccak256(sharedCode)) {
            verificationRequests[contractAddress].verifiedStatus = verifyRequest.VERIFIED;
        }
    }

    function removeWhitelist(address contractAddress) public onlyOwner() {
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