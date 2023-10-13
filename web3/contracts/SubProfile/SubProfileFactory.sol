// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC6551Registry} from "../ERC6551/interfaces/IERC6551Registry.sol";
import "./SubProfileNFT.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "./SubProfileTemplateRegistry.sol";

contract SubProfileFactory is Ownable2Step {
    SubProfileTemplateRegistry private immutable subProfileTemplateRegistry;
    address public immutable erc6551RegistryAddress;
    address public immutable subProfileTBAImplementation;
    uint256 public immutable chainId;

    //CHECK maybe implement account verification instead of data structure?
    //address of user => is allowed to mint
    mapping(address => bool) private _allowlist;


    //CHECK Can either deploy ProfileAccount and pass to constructor or deploy in constructor 
    constructor(address erc6551RegistryAddress_, address subProfileTBAImplementation_) Ownable(msg.sender) {
        //TBA is deployed in ERC6551Registry
        erc6551RegistryAddress = erc6551RegistryAddress_;

        //Implementation of TBA
        subProfileTBAImplementation = subProfileTBAImplementation_;

        //chainId of the blockchain app is deployed on
        chainId = block.chainid;

        //subprofiles registry
        subProfileTemplateRegistry = new SubProfileTemplateRegistry();
    }

    /**
     * @notice mint profileNFT and bind TBA to it
     * @param to account to mint profileNFT to
     * @param subProfileTemplateAddress address of subProfileTemplate 
     * @return tba address of boundAccount
     * @return tokenId tokenId of minted profileNFT
     */
    function createSubProfileForUser(address to, address subProfileTemplateAddress) external returns (address tba, uint256 tokenId){
        //IMPLEMENT: check address is allowed to mint its profile NFT && is App account (maybe from UserAccountFactory)

        //can only create ONE profile of EACH profileType per user, check balance is = 0
        require( SubProfileNFT(subProfileTemplateAddress).balanceOf(to) == 0, "already has profile" );

        uint256 currentSupply = SubProfileNFT(subProfileTemplateAddress).totalSupply();

        //register boundAccount for tokenId of profileType
        tba = IERC6551Registry(erc6551RegistryAddress).createAccount(subProfileTBAImplementation, chainId, subProfileTemplateAddress, currentSupply, 0, "");
        require( tba != address(0), "failed to create account" );

        //mints token of specific profileType
        tokenId = SubProfileNFT(subProfileTemplateAddress).mint(to);
        require( tokenId == currentSupply + 1, "failed to mint token" );
    }

    /**
     * @notice create new profileTypeContract
     * @param name name of profileType
     * @param symbol symbol of profileType
     * @return profileTypeContractAddress address of deployed profileTypeContract
     */
    function generateSubProfileTemplate(string memory name, string memory symbol) external onlyOwner() returns(address profileTypeContractAddress){
        //IMPLEMENT: check address is allowed to create new profileType

        //deploy new profileTypeContract
        SubProfileNFT subProfile = new SubProfileNFT(name, symbol);
        subProfileTemplateRegistry.registerSubProfileTemplate(address(subProfile), name);

        //add to subProfileTemplateRegistry
        subProfileTemplateRegistry.registerSubProfileTemplate(address(subProfile), name);
        profileTypeContractAddress = address(subProfile);
    }

    /**
     * @notice fetch boundAccount for specific profileNFT
     * @param index index of profileTypeContract in subProfileContract
     * @param tokenId tokenId of profileNFT
     */
    function tbaAccount(uint256 index, uint256 tokenId) external view returns (address account_){
        //fetch subProfileTemplate address from registry
        (address subProfileTemplateAddress, , ) = subProfileTemplateRegistry.getSubProfileTemplate(index);
        
        //return TokenboundAccount address
        account_ = IERC6551Registry(erc6551RegistryAddress).account( subProfileTBAImplementation , chainId, subProfileTemplateAddress, tokenId, 0);
    }

    function subProfileTemplateRegistryAddress() public view returns (address _subProfileTemplateRegistryAddress){
        _subProfileTemplateRegistryAddress = address(subProfileTemplateRegistry);
    }


    //IMPLEMENT: function for ownership change of profileNFT for upgradeability
} 