// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

contract Networks {

    //WARNING: until ERC-6551 is finalized, the registry address is subject to change.
    address public constant REGISTRY_ADDRESS = 0x02101dfB77FDE026414827Fdc604ddAF224F0921;
    uint256 public constant MAINNET = 1;
    uint256 public constant ROPSTEN = 3;
    uint256 public constant RINKEBY = 4;
    uint256 public constant GOERLI = 5;
    uint256 public constant KOVAN = 42;
    uint256 public constant MATIC = 137;
    uint256 public constant MUMBAI = 80001;
    uint256 public constant GNOSIS_CHAIN = 100;
    uint256 public constant OPTIMISM = 42161;
    uint256 public constant SEPOLIA = 11155111;

    mapping(uint256 => address) public registry;

    constructor() {
    }

    function register(uint256 chainId, address registryAddress) external {
        registry[chainId] = registryAddress;
    }
}
