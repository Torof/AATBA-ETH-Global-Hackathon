// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {IERC6551Registry} from "../ERC6551/interfaces/IERC6551Registry.sol";
import "./SubProfileNFT.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract SubProfileFactory is Ownable2Step {

    address public immutable erc6551registryAddress;
    address public immutable userAccountImplementationAddress;
    uint256 public immutable chainId;

    //index => address of profileTypeContract
    address[] public subProfileContract;

    //CHECK maybe implement account verification instead of data structure?
    //address of user => is allowed to mint
    mapping(address => bool) private _allowlist;


    //CHECK Can either deploy ProfileAccount and pass to constructor or deploy in constructor 
    constructor(address erc6551registryAddress_, address userAccountImplementationAddress_) Ownable(msg.sender) {
        erc6551registryAddress = erc6551registryAddress_;
        userAccountImplementationAddress = userAccountImplementationAddress_;
        chainId = block.chainid;
    }

    /**
     * @notice mint profileNFT and bind TBA to it
     * @param to account to mint profileNFT to
     * @param index index of profileTypeContract in subProfileContract
     * @return tba address of boundAccount
     * @return tokenId tokenId of minted profileNFT
     */
    function mintAndBind(address to, uint256 index) external returns (address tba, uint256 tokenId){
        //IMPLEMENT: check address is allowed to mint its profile NFT && is App account (maybe from UserAccountFactory)
        require( index < subProfileContract.length, "index out of bounds" );
        //can only create ONE profile of EACH profileType per user, check balance is = 0
        require( SubProfileNFT(subProfileContract[index]).balanceOf(to) == 0, "already has profile" );

        uint256 currentSupply = SubProfileNFT(subProfileContract[index]).totalSupply();

        //register boundAccount for tokenId of profileType
        tba = IERC6551Registry(erc6551registryAddress).createAccount(userAccountImplementationAddress, chainId, subProfileContract[index], currentSupply, 0, "");
        require( tba != address(0), "failed to create account" );

        //mints token of specific profileType
        tokenId = SubProfileNFT(subProfileContract[index]).mint(to);
        require( tokenId == currentSupply + 1, "failed to mint token" );
    }

    //CHECK simple array of addresses or array of structs?
    /**
     * @notice create new profileTypeContract
     * @param name name of profileType
     * @param symbol symbol of profileType
     * @return profileTypeContractAddress address of deployed profileTypeContract
     */
    function createNewProfileType(string memory name, string memory symbol) external onlyOwner() returns(address profileTypeContractAddress){
        //IMPLEMENT: check address is allowed to create new profileType

        //deploy new profileTypeContract
        SubProfileNFT subProfile = new SubProfileNFT(name, symbol);

        //add to subProfileContract
        subProfileContract.push(address(subProfile));
        profileTypeContractAddress = address(subProfile);
    }

    /**
     * @notice fetch boundAccount for specific profileNFT
     * @param index index of profileTypeContract in subProfileContract
     * @param tokenId tokenId of profileNFT
     */
    function account(uint256 index, uint256 tokenId) external view returns (address account_){
        account_ = IERC6551Registry(erc6551registryAddress).account( userAccountImplementationAddress , chainId, subProfileContract[index], tokenId, 0);
    }

    /**
     * @notice fetch totalSupply of profileTypeContract
     * @param index index of profileTypeContract in subProfileContract
     */
    function totalSupply(uint256 index) external view returns(uint256 supply){
        supply = SubProfileNFT(subProfileContract[index]).totalSupply();
    }


    //IMPLEMENT: function for ownership change of profileNFT for upgradeability
}