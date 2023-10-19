const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("SubProfileFactory", function () {
    async function deploySubProfileFactoryFixture() {
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

        const subProfileTemplateRegistryAddress = await subProfileFactory.subProfileTemplateRegistryAddress();
        const subProfileTemplateRegistry = await hre.ethers.getContractAt("SubProfileTemplateRegistry", subProfileTemplateRegistryAddress);

        return {
            subProfileFactory,
            erc6551RegistryAddress,
            subProfileTBAAddress,
            subProfileTemplateRegistryAddress,
            subProfileTemplateRegistry
        };
    }

    describe("Deployment", function () {
        it("Should set the right registry", async function () {
            const { subProfileFactory, erc6551RegistryAddress } = await loadFixture(deploySubProfileFactoryFixture);
            expect(await subProfileFactory.erc6551RegistryAddress()).to.equal(erc6551RegistryAddress);
        });

        it("Should set the right subProfileTBA", async function () {
            const { subProfileFactory, subProfileTBAAddress } = await loadFixture(deploySubProfileFactoryFixture);
            expect(await subProfileFactory.subProfileTBAImplementation()).to.equal(subProfileTBAAddress);
        });

        it("Should set the right subProfileTemplateRegistry", async function () {
            const { subProfileFactory, subProfileTemplateRegistryAddress } = await loadFixture(deploySubProfileFactoryFixture);
            expect(await subProfileFactory.subProfileTemplateRegistryAddress()).to.equal(subProfileTemplateRegistryAddress);
        });
    });
});