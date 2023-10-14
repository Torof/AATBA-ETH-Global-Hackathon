// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

async function main() {
<<<<<<< HEAD
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.parseEther("0.001");

  const erc6551Registry = await hre.ethers.deployContract("ERC6551Registry");
  await erc6551Registry.waitForDeployment();
  const erc6551RegistryAddress = erc6551Registry.target;

  const subProfileTBA = await hre.ethers.deployContract("SubProfileTBA");
  await subProfileTBA.waitForDeployment();
  const subProfileTBAAddress = subProfileTBA.target;

  const subProfileFactory = await hre.ethers.deployContract("SubProfileFactory", [erc6551RegistryAddress, subProfileTBAAddress]); 
  await subProfileFactory.waitForDeployment();
  const subProfileFactoryAddress = subProfileFactory.target;

  const userAccountFactory = await hre.ethers.deployContract("UserAccountFactory", [subProfileFactoryAddress]);

=======

  //Deploy a registry for ERC6551 that regsiters all TBA. On mainnet it is already deployed
  //We'll be using the official one deployed on the chain we will be using for the final version.
  //and soon we'll be using a testnet forked mainnet. So won't have to deploy it anymore
  const erc6551Registry = await hre.ethers.deployContract("ERC6551Registry");
  await erc6551Registry.waitForDeployment();
  const erc6551RegistryAddress = erc6551Registry.target;

  //That's the implemntation of the TBA subprofile. 
  //We need to deploy it as long as we're creating our own version.
  //We mi=ay use the official one deployed on mainnet in the future, we'll talk about that later
  const subProfileTBA = await hre.ethers.deployContract("SubProfileTBA");
  await subProfileTBA.waitForDeployment();
  const subProfileTBAAddress = subProfileTBA.target;

  //This is the factory that will create the subprofiles.
  const subProfileFactory = await hre.ethers.deployContract("SubProfileFactory", [erc6551RegistryAddress, subProfileTBAAddress]); 
  await subProfileFactory.waitForDeployment();
  const subProfileFactoryAddress = subProfileFactory.target;

  //This is the registry that will register all the subprofiles templates.
  //It's not useful for deployement, the contracts handle accessing it by themselves
  // i'm just putting it here for you to know how to access it for your Dapp.
  const subProfileTemplateRegistryAddress = await subProfileFactory.subProfileTemplateRegistryAddress();

  //This is the factory that will create the user accounts.
  //For now it deploys a simple smart contract
  //In the future it will deploy our userAccounts as Account Abstraction Contracts
  const userAccountFactory = await hre.ethers.deployContract("UserAccountFactory", [subProfileFactoryAddress]);

  //The subProfileFactory, the subProfileTemplateRegistry and the userAccountFactory are the 3 you will be using on your dapp.
  // The subProfileTemplatesAddresses and the userAccount will be directly accessible from those.
>>>>>>> e7f1f6c9acf71a44e4a04a05beb1d57571a716c1

  console.log(
    `
    ERC6551Registry deployed to: ${erc6551Registry.target},
    SubProfileTBA deployed to: ${subProfileTBA.target},
    SubProfileFactory deployed to: ${subProfileFactory.target},
    UserAccountFactory deployed to: ${userAccountFactory.target}
<<<<<<< HEAD
=======
    subProfileTemplateRegistryAddress: ${subProfileTemplateRegistryAddress}
>>>>>>> e7f1f6c9acf71a44e4a04a05beb1d57571a716c1
    `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
