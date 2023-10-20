// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract VerifiedCollectionRegistry {

   // WARNING for now we cannot traverse the mapping, so we cannot get a list of all verified contracts, maybe use double mapping to get around this?

    enum verifyRequest {
        REQUESTED,
        VERIFIED,
        REJECTED, // verification fails
        REMOVED
    }

    // mapping(address => WhitelistRequest) public verificationRequests;
    mapping(address => bool) public isVerified;
    mapping(address => verifyRequest) public verifyStatus;
    address immutable public Verifier;

    modifier onlyVerifier() {
        require(msg.sender == Verifier, "Only owner can call this function");
        _;
    }

    constructor() {
        Verifier = msg.sender;
    }

    function requestForVerification(address contractAddress) public {
        require(contractAddress != address(0), "Invalid contract address");
        require(isContract(contractAddress), "Address is not a contract address");
        require(!isVerified[contractAddress], "Address already verified");

        verifyStatus[contractAddress] = verifyRequest.REQUESTED;
    }

    function removeFromVerificationRequest(address contractAddress) public {
        require(verifyStatus[contractAddress] != verifyRequest.REMOVED, "Request already removed");
        require(!isVerified[contractAddress], "Only owner can remove these requests");

        verifyStatus[contractAddress] = verifyRequest.REMOVED;
    }

    function addVerifiedCollection(address contractAddress) public onlyVerifier() {
        require(verifyStatus[contractAddress] == verifyRequest.REQUESTED, "Request does not exist");
        require(!isVerified[contractAddress], "Address is already verified");

        if (IERC721(contractAddress).supportsInterface(type(IERC721).interfaceId)) {
            verifyStatus[contractAddress] = verifyRequest.VERIFIED;
            isVerified[contractAddress] = true;
        } else if (IERC1155(contractAddress).supportsInterface(type(IERC1155).interfaceId)) {
            verifyStatus[contractAddress] = verifyRequest.VERIFIED;
            isVerified[contractAddress] = true;
        } else {
            verifyStatus[contractAddress] = verifyRequest.VERIFIED;
        }
    }

    // For testing purposes, to add a trusted EOA
    function addVerificationEOA(address sender) public onlyVerifier() {
        require(sender != address(0), "Invalid contract address");
        require(!isVerified[sender], "Request already verified");

        verifyStatus[sender] = verifyRequest.VERIFIED;
        isVerified[sender] = true;
    }

    // For testing purposes, to remove an EOA
    function removeVerificationEOA(address sender) public onlyVerifier() {
        require(isVerified[sender], "Request does not exist");

        verifyStatus[sender] = verifyRequest.REMOVED;
        isVerified[sender] = false;
    }

    function removeVerification(address contractAddress) public onlyVerifier() {
        require(isVerified[contractAddress], "Request does not exist");

        verifyStatus[contractAddress] = verifyRequest.REMOVED;
        isVerified[contractAddress] = false;
    }

    function getRequestStatus(address contractAddress) public view returns(verifyRequest) {
        return verifyStatus[contractAddress];
    }

    function isContract(address account) public view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.
        uint size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

}