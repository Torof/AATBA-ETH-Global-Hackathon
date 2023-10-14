// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./SimpleUserAccount.sol";

contract UserAccountFactory {

    //address of the subProfileFactory to pass on to SimpleUserAccount for deployment
    address immutable public subProfileFactory;

    //mapping of user address to simpleUserAccount address
    mapping(address => address) private userAccounts;

    //number of user accounts created
    uint256 public userAccountsCount;  

    constructor(address subProfileFactoryAddress) {
        subProfileFactory = subProfileFactoryAddress;
    }
    
    /**
     * @notice create a simpleUserAccount for the user. Only once per address
     * @return account address of the simpleUserAccount for a user
     */
    function createUserAccount() external returns(address account){
        require(userAccounts[msg.sender] == address(0), "already has account");
        account = address(new SimpleUserAccount(subProfileFactory, msg.sender));
        userAccounts[msg.sender] = account;
        userAccountsCount++;
    }

    /**
     * @notice get the simpleUserAccount address of a user
     * @param user address of the user
     * @return account address of the simpleUserAccount for a user
     */
    function getUserAccount(address user) external view returns(address account){
        account = userAccounts[user];
    }
}