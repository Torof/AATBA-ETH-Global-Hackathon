// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import "./SimpleUserAccount.sol";

contract UserAccountFactory {
    address immutable public subProfileFactory;

    mapping(address => address) public userAccounts;
    uint256 public userAccountsCount;
    constructor(address _subProfileFactory) {
        subProfileFactory = _subProfileFactory;
    }
        
    function createUserAccount() external returns(address account){
        account = address(new SimpleUserAccount(subProfileFactory, msg.sender));
        userAccounts[msg.sender] = account;
        userAccountsCount++;
    }

    function getUserAccount(address user) external view returns(address account){
        account = userAccounts[user];
    }
}