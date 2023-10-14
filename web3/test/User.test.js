const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("User, UserFactory + UserAccount", function () {
    async function deployUserAccountFactoryFixture() {
        const [acc1, acc2] = await ethers.getSigners();

        const erc6551Registry = await hre.ethers.deployContract("ERC6551Registry");
        await erc6551Registry.waitForDeployment();
        const erc6551RegistryAddress = erc6551Registry.target;

        const subProfileTBA = await hre.ethers.deployContract("SubProfileTBA");
        await subProfileTBA.waitForDeployment();
        const subProfileTBAAddress = subProfileTBA.target;

        const subProfileFactory = await hre.ethers.deployContract("SubProfileFactory", [erc6551RegistryAddress, subProfileTBAAddress]);
        await subProfileFactory.waitForDeployment();

        const userAccountFactory = await hre.ethers.deployContract("UserAccountFactory", [subProfileFactory.target]);

        return {
            subProfileFactory,
            userAccountFactory,
            acc1,
            acc2
        };
    }

    describe("Deployment of UserFactory", function () {
        it("Should set the SubProfileFactory address", async function () {
            const { userAccountFactory } = await loadFixture(deployUserAccountFactoryFixture);
            expect(await userAccountFactory.subProfileFactory()).to.equal(subProfileFactory.target);
        });
    });

    describe("Deployment of User", function () {
        it("Should set the UserAccountFactory address", async function () {
            const { userAccountFactory } = await loadFixture(deployUserAccountFactoryFixture);
            expect(await userAccountFactory.createUseraccount()).to.equal();
        });
    });
});