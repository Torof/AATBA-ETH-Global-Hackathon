// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

contract SubProfileTemplateRegistry {
    address immutable private _subProfileFactoryAddress;
    constructor() {
        _subProfileFactoryAddress= msg.sender;
    }

    SubProfileTemplate[] public registry;

    struct SubProfileTemplate {
        address subProfileTemplateAddress;
        uint256 index;
        string name;
    }


    function registerSubProfileTemplate(address _subProfileCollection, string memory name) external {
        require(msg.sender == _subProfileFactoryAddress, "only factory can register subProfile");
        registry.push(SubProfileTemplate(_subProfileCollection, registry.length, name));
    }

    function getSubProfileTemplate(uint256 indexAt) external view returns(address subProfileTemplateAddress, uint256 index, string memory name){
        require(indexAt < registry.length, "index out of bounds");
        subProfileTemplateAddress = registry[indexAt].subProfileTemplateAddress;
        index = registry[indexAt].index;
        name = registry[indexAt].name;
    }

    function registryLength() external view returns(uint256 length){
        length = registry.length;
    }

    function subProfileFactoryAddress() external view returns(address){
        return _subProfileFactoryAddress;
    }
}