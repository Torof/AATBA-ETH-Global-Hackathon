// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;


import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {SubProfileFactory} from "../SubProfile/SubProfileFactory.sol";
import {SubProfileTemplateRegistry} from "../SubProfile/SubProfileTemplateRegistry.sol";
import {ISimpleUserAccount} from "../interfaces/ISimpleUserAccount.sol";
import {ISubProfileTBA} from "../interfaces/ISubProfileTBA.sol";


contract SimpleUserAccount is IERC721Receiver, ISimpleUserAccount, ISubProfileTBA {

    //SubProfileFactory contract instance
    SubProfileFactory immutable subProfileFactory;

    //SubProfileTemplateRegistry contract instance
    SubProfileTemplateRegistry immutable subProfileTemplateRegistry;

    //the address of user owning the account
    address immutable _user;
    
    //array of tokenIds of subProfiles at specific index of subProfileTemplateRegistry
    uint256[] private subprofilesTokenIds;

    event SubProfileCreated(address indexed subProfileAddress, uint256 indexed tokenId);

    event ReceivedERC721(address indexed operator, address indexed from, uint256 indexed tokenId, bytes data);

    constructor(address _subProfileFactory, address user_) {
        subProfileFactory = SubProfileFactory(_subProfileFactory);
        subProfileTemplateRegistry = SubProfileTemplateRegistry(subProfileFactory.subProfileTemplateRegistryAddress());
        _user = user_;
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
        returns (bytes4)
    {
        emit ReceivedERC721(operator, from, tokenId, data);
        return IERC721Receiver.onERC721Received.selector;
    }

    /**
     * @notice create a subProfile NFt linked to a subProfileTBA for the user
     * @param index index of the subProfileTemplate in the subProfileTemplateRegistry
     * @return subProfileAddress address of the subProfileTBA
     * @return tokenId tokenId of the subProfileNFT linked to the subProfileTBA
     */
    function createSubProfile(uint256 index) external returns(address subProfileAddress, uint256 tokenId){
        require(msg.sender == _user, "only user can create subProfile");
        verifyRegistryLengthOrFix();

        (address subProfileTemplateAddress, , ) = subProfileTemplateRegistry.getSubProfileTemplate(index);
        (subProfileAddress, tokenId) = subProfileFactory.createSubProfileForUser(msg.sender, subProfileTemplateAddress);
        subprofilesTokenIds[index] = tokenId;
    }

    /**
     * @notice get the subProfileTBA and tokenId of a subProfile
     * @param index index of the subProfileTemplate in the subProfileTemplateRegistry
     * @return subProfileAddress address of the subProfileTBA linked to NFT of tokenId of subProfileTemplate at index in subProfileTemplateRegistry
     * @return tokenId tokenId of the subProfileNFT linked to the subProfileTBA
     */
    function getSubProfile(uint256 index) external view returns(address subProfileAddress, uint256 tokenId){
        require(index < subprofilesTokenIds.length, "index out of bounds");
        tokenId = subprofilesTokenIds[index];
        require(tokenId != 0, "subProfile does not exist");
        subProfileAddress = subProfileFactory.tbaAccount(index, tokenId);
    }

    /**
     * @notice verifies the length of the subProfileTemplateRegistry and fixes the subprofilesTokenIds array length if needed
     */
    function verifyRegistryLengthOrFix() internal {
        if(subprofilesTokenIds.length < subProfileTemplateRegistry.registryLength()){
            for(uint256 i = subprofilesTokenIds.length; i < subProfileTemplateRegistry.registryLength(); i++){
                subprofilesTokenIds.push(0);
            }
        }
    }

    function subProfileFactoryAddress() external view returns(address){
        return address(subProfileFactory);
    }

    function subProfileTemplateRegistryAddress() external view returns(address){
        return address(subProfileTemplateRegistry);
    }

    function user() external view returns(address){
        return _user;
    }
}