const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("User, UserFactory + UserAccount", function () {
    async function deployUserAccountFactoryFixture() {
        const [acc1, acc2] = await ethers.getSigners();
        const addressZero = "0x0000000000000000000000000000000000000000"

        const erc6551Registry = await hre.ethers.deployContract("ERC6551Registry");
        await erc6551Registry.waitForDeployment();
        const erc6551RegistryAddress = erc6551Registry.target;

        const VerifiedCollectionRegistry = await hre.ethers.deployContract("VerifiedCollectionRegistry");
        await VerifiedCollectionRegistry.waitForDeployment();
        const VerifiedCollectionRegistryAddress = await VerifiedCollectionRegistry.getAddress();

        const subProfileTBA = await hre.ethers.deployContract("SubProfileTBA", [VerifiedCollectionRegistryAddress]);
        await subProfileTBA.waitForDeployment();
        const subProfileTBAAddress = subProfileTBA.target;

        const subProfileFactory = await hre.ethers.deployContract("SubProfileFactory", [erc6551RegistryAddress, subProfileTBAAddress]);
        await subProfileFactory.waitForDeployment();

        const userAccountFactory = await hre.ethers.deployContract("UserAccountFactory", [subProfileFactory.target]);
        await userAccountFactory.waitForDeployment();
        return {
            subProfileFactory,
            userAccountFactory,
            addressZero,
            acc1,
            acc2
        };
    }

    describe("Deployment of UserFactory", function () {
        it("Should set the SubProfileFactory address", async function () {
            const { userAccountFactory } = await loadFixture(deployUserAccountFactoryFixture);
            // expect(await userAccountFactory.subProfileFactory()).to.equal(subProfileFactory.target);
        });
    });

    describe("Deployment of User", function () {
        it("Should succesfully deploy a userAccount", async function () {
            const { userAccountFactory, addressZero, acc1 } = await loadFixture(deployUserAccountFactoryFixture);
            //No account created should return address(0)
            expect(await userAccountFactory.getUserAccount(acc1)).to.equal(addressZero);

            //Create an account for acc1
            await userAccountFactory.connect(acc1).createUserAccount()

            const userAccountAddress = await userAccountFactory.getUserAccount(acc1);

            //the account created for acc1 should not be address(0) anymore
            expect(userAccountAddress).to.not.equal(addressZero);
        });

        it("Should have the caller address as user of the account", async function () {
            const { userAccountFactory, acc1 } = await loadFixture(deployUserAccountFactoryFixture);
            await userAccountFactory.connect(acc1).createUserAccount()
            const userAccountAddress = await userAccountFactory.getUserAccount(acc1);
            const userAccount = await hre.ethers.getContractAt("SimpleUserAccount", userAccountAddress);
            expect(await userAccount.user()).to.equal(acc1.address);
        });
    });

});