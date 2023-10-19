const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("SubProfileFactory", function () {
    async function deploySubProfileFactoryFixture() {
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

        const subProfileTemplateRegistryAddress = await subProfileFactory.subProfileTemplateRegistryAddress();
        const subProfileTemplateRegistry = await hre.ethers.getContractAt("SubProfileTemplateRegistry", subProfileTemplateRegistryAddress);

        return {
            addressZero,
            subProfileFactory,
            erc6551RegistryAddress,
            subProfileTBAAddress,
            subProfileTemplateRegistryAddress,
            subProfileTemplateRegistry
        };
    }

    describe("Deployment of SubProfileFactory", function () {
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

        it("Should generate 2 new subprofile template", async function () {
            const { addressZero, subProfileFactory, subProfileTemplateRegistry } = await loadFixture(deploySubProfileFactoryFixture);
            
            //Generate a first subprofile template
            await subProfileFactory.generateSubProfileTemplate("Hackathon","HCK");
            const subProfileTemplate = await subProfileTemplateRegistry.getSubProfileTemplate(0);
            
            //Check if the subprofile template at index 0 is correctly generated 
            expect(subProfileTemplate.subProfileTemplateAddress).to.not.equal(addressZero);
            expect(subProfileTemplate.index).to.equal(0n);
            expect(subProfileTemplate.name).to.equal("Hackathon");

            //Generate a second subprofile template
            await subProfileFactory.generateSubProfileTemplate("Work","WK");
            const subProfileTemplate2 = await subProfileTemplateRegistry.getSubProfileTemplate(1);
            
            expect(subProfileTemplate2.subProfileTemplateAddress).to.not.equal(addressZero);
            expect(subProfileTemplate2.index).to.equal(1n);
            expect(subProfileTemplate2.name).to.equal("Work");
        });
    });


});