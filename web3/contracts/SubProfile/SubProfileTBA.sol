// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../ERC6551/ERC6551Account.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {ISubProfileTBA} from "../interfaces/ISubProfileTBA.sol";
import {IEQUIP} from "../interfaces/IEQUIP.sol";
import {EQUIP} from "./EQUIP.sol";


contract SubProfileTBA is ERC6551Account, IERC721Receiver, IERC1155Receiver, ISubProfileTBA, IEQUIP, EQUIP {
    //TODO add ownership cycle guards
    event ERC721Received(address operator, address from, uint256 tokenId, bytes data);
    event ERC1155Received(address operator, address from, uint256 id, uint256 value, bytes data);
    event ERC1155BatchReceived(address operator, address from, uint256[] ids, uint256[] values, bytes data);

    mapping(address => Badge[]) public subProfileBadges;

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)
        external 
        returns (bytes4)
    {
        emit ERC721Received(operator, from, tokenId, data);
        VerificationStatus status = _verifyBadge(from);
        Badge memory badge = Badge(from, tokenId, data, block.number, status);
        subProfileBadges[address(this)].push(badge);
        emit AddedBadge(address(this), tokenId);
        return IERC721Receiver.onERC721Received.selector;
    }

    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data)
        external
        returns (bytes4)
    {
        emit ERC1155Received(operator, from, id, value, data);
        VerificationStatus status = _verifyBadge(from);
        Badge memory badge = Badge(from, id, data, block.number, status);
        subProfileBadges[address(this)].push(badge);
        emit AddedBadge(address(this), id);
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

    //IMPLEMENT: verify & equip functionnality - internal called by onReceived?
}
