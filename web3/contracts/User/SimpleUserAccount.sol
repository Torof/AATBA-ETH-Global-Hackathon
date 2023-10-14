// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;


import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {SubProfileFactory} from "../SubProfile/SubProfileFactory.sol";
import {ISimpleUserAccount} from "../interfaces/ISimpleUserAccount.sol";
import {ISubProfileTBA} from "../interfaces/ISubProfileTBA.sol";


contract SimpleUserAccount is IERC721Receiver, ISimpleUserAccount, ISubProfileTBA {

    address immutable subProfileFactory;

    mapping(address => SubProfileTBA[]) public userSubProfiles;

    constructor(address _subProfileFactory) {
        subProfileFactory = _subProfileFactory;
    }

    //TODO add verification of the subProfileFactory if registered subProfile
    /**
     * @dev See {IERC721Receiver-onERC721Received}.
     * @notice The contract address MUST be a verified subProfile registered in the subProfileFactory
     * @param operator address of the operator
     * @param from address of the user
     * @param tokenId id of the subProfile
     * @param data additional data
     */
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)
        external 
        pure
        returns (bytes4)
    {
        return IERC721Receiver.onERC721Received.selector;
    }

    function createSubProfile(uint256 index) external returns(address subProfile){
        uint256 tokenId;
        (subProfile, tokenId) = SubProfileFactory(subProfileFactory).createSubProfileForUser(msg.sender, index);
        SubProfileTBA memory mySubProfile = SubProfileTBA(subProfile, tokenId, block.number);
        userSubProfiles[address(this)].push(mySubProfile);
        emit AddedSubProfile(address(this), subProfile, tokenId);
    }
}