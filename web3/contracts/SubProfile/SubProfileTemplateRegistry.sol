// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract SubProfileTemplateRegistry {
    address immutable private _subProfileFactoryAddress;

    event SubProfileTemplateRegistered(address indexed subProfileTemplateAddress, uint256 indexed index, string name);

    constructor() {
        _subProfileFactoryAddress= msg.sender;
    }

    SubProfileTemplate[] public registry;

    struct SubProfileTemplate {
        address subProfileTemplateAddress;
        uint256 index;
        string name;
    }

    /**
     * @notice register a new subProfileTemplate to create subprofiles (NFTs + TBA) for users
     * @param _subProfileCollection address of the subProfileTemplate collection
     * @param name name of the subProfileTemplate collection
     */
    function registerSubProfileTemplate(address _subProfileCollection, string memory name) external {
        require(msg.sender == _subProfileFactoryAddress, "only factory can register subProfile");

        //add subProfileTemplate collection to registry
        registry.push(SubProfileTemplate(_subProfileCollection, registry.length, name));

        emit SubProfileTemplateRegistered(_subProfileCollection, registry.length, name);
    }

    /**
     * 
     * @param indexAt index of the subProfileTemplate in the registry
     * @return subProfileTemplateAddress address of the subProfileTemplate collection
     * @return index index of the subProfileTemplate in the registry
     * @return name name of the subProfileTemplate collection
     */
    function getSubProfileTemplate(uint256 indexAt) external view returns(address subProfileTemplateAddress, uint256 index, string memory name){
        require(indexAt < registry.length, "index out of bounds");
        subProfileTemplateAddress = registry[indexAt].subProfileTemplateAddress;
        index = registry[indexAt].index;
        name = registry[indexAt].name;
    }

    /**
     * @return length length of the registry
     */
    function registryLength() external view returns(uint256 length){
        length = registry.length;
    }

    /**
     * @return subProfileFactoryAddress address of the subProfileFactory
     */
    function subProfileFactoryAddress() external view returns(address){
        return _subProfileFactoryAddress;
    }
}