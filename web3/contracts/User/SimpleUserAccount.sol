// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;


import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {SubProfileFactory} from "../SubProfile/SubProfileFactory.sol";
import {SubProfileTemplateRegistry} from "../SubProfile/SubProfileTemplateRegistry.sol";


contract SimpleUserAccount is IERC721Receiver{
    address public immutable user;
    uint256[] public subprofilesTokenIds;

    address immutable subProfileFactory;

    SubProfileTemplateRegistry public immutable subProfileTemplateRegistry;

    constructor(address _subProfileFactory, address user_) {
        subProfileFactory = _subProfileFactory;
        subProfileTemplateRegistry = SubProfileTemplateRegistry(SubProfileFactory(_subProfileFactory).subProfileTemplateRegistryAddress());
        user = user_;
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

        (address subProfileTemplateAddress, , ) = subProfileTemplateRegistry.getSubProfileTemplate(index);
        (subProfile, tokenId) = SubProfileFactory(subProfileFactory).createSubProfileForUser(msg.sender, subProfileTemplateAddress);
        subprofilesTokenIds[index] = tokenId;
    }
}