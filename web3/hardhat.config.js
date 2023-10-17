require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv/config");

require("dotenv/config");

const RPC_URL_SEPOLIA = process.env.RPC_URL_SEPOLIA || "";
// const RPC_URL_MAINNET = process.env.RPC_URL_MAINNET;
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.20",
    settings: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            gasPrice: 130000000000,
        //     forking: {
        //         url: RPC_URL_MAINNET,
        // },
    },
        sepolia: {
            chainId: 11155111,
            url: RPC_URL_SEPOLIA,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
        customChains: [],
    },
    // gasReporter: {
    //     enabled: false,
    //     outputFile: "report-gas.txt",
    //     noColors: true,
    //     currency: "USD",
    //     coinmarketcap: COINMARKETCAP_API_KEY,
    //     token: "ETH",
    // },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test",
    },
};
