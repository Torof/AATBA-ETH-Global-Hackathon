// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract TestNFT is ERC721("TestNFT", "TNFT"), Ownable2Step {
        // SBT is locked on minting
        mapping(uint256 => bool) private _unlocked;
        uint256 private _totalSupply;
    
        constructor() Ownable(msg.sender){}
    
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