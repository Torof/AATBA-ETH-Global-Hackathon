// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "../ERC6551/ERC6551Account.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";


contract SubProfileTBA is ERC6551Account, IERC721Receiver, IERC1155Receiver {

    VerifiedBadge[] public verifiedBadges;
    struct VerifiedBadge {
        uint256 tokenId;
        address issuer;
        uint256 issuedAt;
    }  
    //TODO add ownership cycle guards
    event ERC721Received(address indexed operator, address indexed from, uint256 indexed tokenId, bytes data);
    event ERC1155Received(address indexed operator, address indexed from, uint256 indexed id, uint256 value, bytes data);
    event ERC1155BatchReceived(address indexed operator, address indexed from, uint256[] indexed ids, uint256[] values, bytes data);


    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)
        external 
        returns (bytes4)
    {
        registerVerifiedBadge(tokenId, operator);
        emit ERC721Received(operator, from, tokenId, data);
        return IERC721Receiver.onERC721Received.selector;
    }

    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data)
        external
        returns (bytes4)
    {
        registerVerifiedBadge(id, operator);
        emit ERC1155Received(operator, from, id, value, data);
        return IERC1155Receiver.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) 
    external 
    returns (bytes4) {
        for(uint256 i = 0; i < ids.length; i++){
            registerVerifiedBadge(ids[i], operator);
        }
        emit ERC1155BatchReceived(operator, from, ids, values, data);
        return IERC1155Receiver.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) external override(ERC6551Account, IERC165) pure returns (bool) {
        return (
            interfaceId == type(IERC165).interfaceId || 
            interfaceId == type(IERC6551Account).interfaceId ||
            interfaceId == type(IERC6551Executable).interfaceId ||
            interfaceId == type(IERC1155Receiver).interfaceId ||
            interfaceId ==  type(IERC721Receiver).interfaceId
        );
    }

    function registerVerifiedBadge(uint256 tokenId, address issuer) private {
        verifiedBadges.push(VerifiedBadge(tokenId, issuer, block.timestamp));
    }

    //IMPLEMENT: verify & equip functionnality - internal called by onReceived?
}
