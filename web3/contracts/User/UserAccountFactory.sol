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

    event UserAccountCreated(address indexed user, address indexed account);

    constructor(address subProfileFactoryAddress) {
        subProfileFactory = subProfileFactoryAddress;
    }
    
    /**
     * @notice create a simpleUserAccount for the user. Only once per address
     * @return account address of the simpleUserAccount for a user
     */
    function createUserAccount() external returns(address account){

        //Only one account per user
        require(userAccounts[msg.sender] == address(0), "already has account");

        //Creates a new simpleUserAccount
        account = address(new SimpleUserAccount(subProfileFactory, msg.sender));

        //Adds the simpleUserAccount to the mapping
        userAccounts[msg.sender] = account;

        //Increments the number of user accounts created
        userAccountsCount++;

        emit UserAccountCreated(msg.sender, account);
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