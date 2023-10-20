// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../ERC6551/ERC6551Account.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {VerifiedCollectionRegistry} from "./VerifiedCollectionRegistry.sol";

contract SubProfileTBA is ERC6551Account, IERC721Receiver, IERC1155Receiver {

    struct Badge {
        address nftAddress;
        address from;
        uint256 tokenId;
        bytes data; 
    }

    //TODO add ownership cycle guards
    event ERC721Received(address indexed operator, address indexed from, uint256 indexed tokenId, bytes data);
    event ERC1155Received(address indexed operator, address indexed from, uint256 indexed id, uint256 value, bytes data);
    event ERC1155BatchReceived(address indexed operator, address indexed from, uint256[] indexed ids, uint256[] values, bytes data);
    event BadgeAdded(address indexed userSubProfile, uint256 indexed tokenId);

    Badge[] public subProfileBadges;
    address immutable public verifiedCollectionRegistryAddress;
    VerifiedCollectionRegistry verifedCollectionRegistry;

    constructor(address _whitelistRegistryAddress) {
        verifiedCollectionRegistryAddress = _whitelistRegistryAddress;
        verifedCollectionRegistry = VerifiedCollectionRegistry(verifiedCollectionRegistryAddress);
    }

    /**
     * 
     * @param operator address that initiated the transfer
     * @param from address of the user the NFT comes from
     * @param tokenId id of the NFT
     * @param data additional data
     */
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)
        external 
        returns (bytes4)
    {
        emit ERC721Received(operator, from, tokenId, data);

        //cycle guard prevention
        ( , address tokenContractOwner, uint256 tokenIdOwner) = token();
        require(msg.sender != tokenContractOwner && tokenId != tokenIdOwner, "Cannot receive token owning TBA");
        require(verifedCollectionRegistry.isVerified(msg.sender), "Contract is not whitelisted");
        Badge memory badge = Badge(msg.sender, from, tokenId, data);
        subProfileBadges.push(badge);
        emit BadgeAdded(address(this), tokenId);
        return IERC721Receiver.onERC721Received.selector;
    }

    /**
     * 
     * @param operator address that initiated the transfer
     * @param from address of the user the NFT comes from
     * @param id id of the NFT
     * @param value number of NFTs transferred
     * @param data additional data
     */
    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data)
        external
        returns (bytes4)
    {
        emit ERC1155Received(operator, from, id, value, data);
        require(verifedCollectionRegistry.isVerified(msg.sender), "Contract is not whitelisted");
        Badge memory badge = Badge(msg.sender, from, id, data);
        subProfileBadges.push(badge);
        emit BadgeAdded(address(this), id);
        return IERC1155Receiver.onERC1155Received.selector;
    }

    /**
     * @param operator address that initiated the transfer
     * @param from address of the user the NFT comes from
     * @param ids ids of the NFTs
     * @param values number of NFTs transferred
     * @param data additional data
     */
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) 
    external 
    returns (bytes4) {
        emit ERC1155BatchReceived(operator, from, ids, values, data);
        return IERC1155Receiver.onERC1155BatchReceived.selector;
    }

    /**
     * @notice check if the contract supports an interface
     * see {IERC165-supportsInterface}
     * @param interfaceId id of the interface to check
     */
    function supportsInterface(bytes4 interfaceId) external override(ERC6551Account, IERC165) pure returns (bool) {
        return (
            interfaceId == type(IERC165).interfaceId || 
            interfaceId == type(IERC6551Account).interfaceId ||
            interfaceId == type(IERC6551Executable).interfaceId ||
            interfaceId == type(IERC1155Receiver).interfaceId ||
            interfaceId ==  type(IERC721Receiver).interfaceId
        );
    }

    function getSubProfileBadges() external view returns(Badge[] memory) {
        return subProfileBadges;
    }

}
