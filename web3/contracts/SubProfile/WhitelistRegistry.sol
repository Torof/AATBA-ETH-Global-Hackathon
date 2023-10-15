// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IEQUIP} from "../interfaces/IEQUIP.sol";

contract WhitelistRegistry is IEQUIP {

    mapping(address => WhitelistRequest) public verificationRequests;
    address immutable public Whitelister;

    modifier onlyWhitelister() {
        require(msg.sender == Whitelister, "Only owner can call this function");
        _;
    }

    constructor() {
        Whitelister = msg.sender;
    }

    function requestForWhitelisting(address contractAddress) public {
        require(contractAddress != address(0), "Invalid contract address");
        require(isContract(contractAddress), "Address is not a contract address");
        require(!verificationRequests[contractAddress].requestExists, "Request already exists");

        verificationRequests[contractAddress] = WhitelistRequest(true, verifyRequest.REQUESTED);
    }

    function removeFromWhitelistRequest(address contractAddress) public {
        require(verificationRequests[contractAddress].requestExists, "Request does not exist");
        require(verificationRequests[contractAddress].verifiedStatus != verifyRequest.VERIFIED, "Only owner can remove these requests");
        require(verificationRequests[contractAddress].verifiedStatus != verifyRequest.REMOVED, "Request already removed");

        verificationRequests[contractAddress] = WhitelistRequest(false, verifyRequest.REMOVED);
    }

    function addWhitelisterc(address contractAddress) public onlyWhitelister() {
        require(verificationRequests[contractAddress].requestExists, "Request does not exist");
        require(verificationRequests[contractAddress].verifiedStatus == verifyRequest.REQUESTED, "Whitelisting not requested");

        if (IERC721(contractAddress).supportsInterface(type(IERC721).interfaceId)) {
            verificationRequests[contractAddress].verifiedStatus = verifyRequest.VERIFIED;
        } else if (IERC1155(contractAddress).supportsInterface(type(IERC1155).interfaceId)) {
            verificationRequests[contractAddress].verifiedStatus = verifyRequest.VERIFIED;
        } else {
            verificationRequests[contractAddress].verifiedStatus = verifyRequest.NOT_VERIFIED;
        }
    }

    // For testing purposes, to add a trusted EOA
    function addWhitelistEOA(address sender) public onlyWhitelister() {
        require(sender != address(0), "Invalid contract address");
        require(!verificationRequests[sender].requestExists, "Request already exists");

        verificationRequests[sender] = WhitelistRequest(true, verifyRequest.VERIFIED);
    }

    // For testing purposes, to remove an EOA
    function removeWhitelistEOA(address sender) public onlyWhitelister() {
        require(verificationRequests[sender].requestExists, "Request does not exist");

        verificationRequests[sender] = WhitelistRequest(false, verifyRequest.REMOVED);
    }

    function removeWhitelist(address contractAddress) public onlyWhitelister() {
        require(verificationRequests[contractAddress].requestExists, "Request does not exist");
        require(verificationRequests[contractAddress].verifiedStatus != verifyRequest.REMOVED, "Request already removed");

        verificationRequests[contractAddress] = WhitelistRequest(false, verifyRequest.REMOVED);
    }

    function isWhitelisted(address contractAddress) public view returns(bool) {
        if (verificationRequests[contractAddress].verifiedStatus == verifyRequest.VERIFIED) {
            return true;
        } else {
            return false;
        }
    }

    function getRequestStatus(address contractAddress) public view returns(verifyRequest) {
        return verificationRequests[contractAddress].verifiedStatus;
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