// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {IERC5192} from "../interfaces/IERC5192.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";


//IMPLEMENT IERC165 support interface
contract SubProfileNFT is Ownable2Step, ERC721, IERC5192 {
    
    // SBT is locked on minting
    mapping(uint256 => bool) private _unlocked;
    uint256 private _totalSupply;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender){}

    //TODO override uri() to return uri of profileTypeContract

    /**
     * 
     * @param to address to mint token to
     * @return tokenId tokenId of minted token
     */
    function mint(address to) public onlyOwner returns (uint256 tokenId){
        _totalSupply++;
        tokenId = _totalSupply;

        //starts at id#1
        _safeMint(to, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(_unlocked[tokenId], "SBT: only if unlocked");
        super.transferFrom(from, to, tokenId);
    }

    //IMPLEMENT signature verification?
    /**
     * @notice allow transfer for SBT token
     * @param tokenId token to unlock transfer for
     * @param to address to transfer token to
     */
    function unlockAndTransfer(uint256 tokenId, address to) external onlyOwner(){} 

    /**
     * 
     * @param tokenId token to check if locked transfer
     * @return isLocked true if locked transfer
     */
    function locked(uint256 tokenId) external view returns (bool isLocked){
        isLocked = !_unlocked[tokenId];
    }

    /**
     * @notice get totalSupply of SBT tokens
     * @return supply totalSupply of SBT tokens
     */
    function totalSupply() external view returns(uint256 supply){
        supply = _totalSupply;
    }
}