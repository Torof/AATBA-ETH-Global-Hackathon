// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract UserAccountFactory {
    constructor() {
        
    }

    function createAccount() external returns(address account){
        account = address(0);
    }
}