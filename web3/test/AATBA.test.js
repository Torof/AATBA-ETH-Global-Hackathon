const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("AATBA - App", function () {
    async function deployAATBAFixture() {
        const [addr1, addr2] = await ethers.getSigners();
        const addressZero = "0x0000000000000000000000000000000000000000"

        //Deploy the ERC6551Registry TBA
        const erc6551Registry = await hre.ethers.deployContract("ERC6551Registry");
        await erc6551Registry.waitForDeployment();
        const erc6551RegistryAddress = erc6551Registry.target;

        //Deploy the SubProfileTBA implementation, for cloning
        const whitelistRegistry = await hre.ethers.deployContract("WhitelistRegistry");
        await whitelistRegistry.waitForDeployment();
        const whitelistRegistryAddress = await whitelistRegistry.getAddress();

        const subProfileTBA = await hre.ethers.deployContract("SubProfileTBA", [whitelistRegistryAddress]);
        await subProfileTBA.waitForDeployment();
        const subProfileTBAAddress = subProfileTBA.target;

        //Deploy the SubProfileFactory
        const subProfileFactory = await hre.ethers.deployContract("SubProfileFactory", [erc6551RegistryAddress, subProfileTBAAddress]);
        await subProfileFactory.waitForDeployment();

        //Get the SubProfileTemplateRegistry address
        const subProfileTemplateRegistryAddress = await subProfileFactory.subProfileTemplateRegistryAddress();
        //Get the SubProfileTemplateRegistry contract
        const subProfileTemplateRegistry = await hre.ethers.getContractAt("SubProfileTemplateRegistry", subProfileTemplateRegistryAddress);

        //Deploy the UserAccountFactory
        const userAccountFactory = await hre.ethers.deployContract("UserAccountFactory", [subProfileFactory.target]);
        await userAccountFactory.waitForDeployment();

        //Generate 2 subprofile templates
        await subProfileFactory.generateSubProfileTemplate("Hackathon","HCK");
        await subProfileFactory.generateSubProfileTemplate("Work","WK");

        //Create an account for addr1
        await userAccountFactory.connect(addr1).createUserAccount()
        const userAccountAddress = await userAccountFactory.getUserAccount(addr1);
        const userAccount1 = await hre.ethers.getContractAt("SimpleUserAccount", userAccountAddress);

        // Create a SBT NFT collection 
        const sbtNFTCollection = await hre.ethers.deployContract("TestNFT");
        await sbtNFTCollection.waitForDeployment();

        return {
            addressZero,
            subProfileFactory,
            subProfileTemplateRegistry,
            userAccountFactory,
            sbtNFTCollection,
            userAccount1,
            addr1
        };
    }

    describe("user flow", function () {

        it("Should create subprofile", async function () {
            const { userAccount1, sbtNFTCollection, subProfileTemplateRegistry, addr1 } = await loadFixture(deployAATBAFixture);

            //create a subProfile of template at index 1
            await userAccount1.connect(addr1).createSubProfile(1);

            //get subProfile structure
            const subProfile1 = await userAccount1.getSubProfile(1);
            const Acc1SubProfile1Address = subProfile1.subProfileAddress;
            
            await sbtNFTCollection.mint(Acc1SubProfile1Address);
            expect(await sbtNFTCollection.ownerOf(1)).to.equal(Acc1SubProfile1Address)
        });

    });


});