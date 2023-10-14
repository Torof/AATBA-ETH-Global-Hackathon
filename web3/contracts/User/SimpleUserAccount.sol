// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;


import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {SubProfileFactory} from "../SubProfile/SubProfileFactory.sol";
import {SubProfileTemplateRegistry} from "../SubProfile/SubProfileTemplateRegistry.sol";
import {ISimpleUserAccount} from "../interfaces/ISimpleUserAccount.sol";
import {ISubProfileTBA} from "../interfaces/ISubProfileTBA.sol";


contract SimpleUserAccount is IERC721Receiver, ISimpleUserAccount, ISubProfileTBA {

    address immutable subProfileFactory;
    SubProfileTemplateRegistry immutable subProfileTemplateRegistry;
    address immutable user;
    
    uint256[] public subprofilesTokenIds;

    constructor(address _subProfileFactory, address user_) {
        subProfileFactory = _subProfileFactory;
        subProfileTemplateRegistry = SubProfileTemplateRegistry(SubProfileFactory(_subProfileFactory).subProfileTemplateRegistryAddress());
        user = user_;
        for(uint256 i = 0; i < subProfileTemplateRegistry.registryLength(); i++){
            subprofilesTokenIds.push(0);
        }
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

    function createSubProfile(uint256 index) external returns(address subProfile, uint256 tokenId){
        require(msg.sender == user, "only user can create subProfile");
        verifyRegistryLengthOrFix();

        (address subProfileTemplateAddress, , ) = subProfileTemplateRegistry.getSubProfileTemplate(index);
        (subProfile, tokenId) = SubProfileFactory(subProfileFactory).createSubProfileForUser(msg.sender, subProfileTemplateAddress);
        subprofilesTokenIds[index] = tokenId;
        SubProfileTBA memory mySubProfile = SubProfileTBA(subProfile, tokenId, block.number);
        userSubProfiles[address(this)].push(mySubProfile);
        emit AddedSubProfile(address(this), subProfile, tokenId);
    }

    function getSubProfile(uint256 index) external view returns(address subProfileAddress, uint256 tokenId){
        require(index < subprofilesTokenIds.length, "index out of bounds");
        tokenId = subprofilesTokenIds[index];
        require(tokenId != 0, "subProfile does not exist");
        subProfileAddress = SubProfileFactory(subProfileFactory).tbaAccount(index, tokenId);
    }

    function verifyRegistryLengthOrFix() internal {
        if(subprofilesTokenIds.length < subProfileTemplateRegistry.registryLength()){
            for(uint256 i = subprofilesTokenIds.length; i < subProfileTemplateRegistry.registryLength(); i++){
                subprofilesTokenIds.push(0);
            }
        }
    }

}