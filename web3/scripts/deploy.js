// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
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


  console.log(
    `
    ERC6551Registry deployed to: ${erc6551Registry.target},
    SubProfileTBA deployed to: ${subProfileTBA.target},
    SubProfileFactory deployed to: ${subProfileFactory.target},
    UserAccountFactory deployed to: ${userAccountFactory.target}
    `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
