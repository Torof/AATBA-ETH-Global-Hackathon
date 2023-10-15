const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");

describe("EQUIP + Whitelisting", function () {
    async function deploySubProfileNFTFixture() {
        const [acc1, acc2] = await ethers.getSigners();
        const addressZero = "0x0000000000000000000000000000000000000000"

        const subProfileTBA = await hre.ethers.deployContract("SubProfileTBA");
        await subProfileTBA.waitForDeployment();

        const subProfileNFT = await hre.ethers.deployContract("SubProfileNFT",["Test", "TST"]);
        await subProfileNFT.waitForDeployment();

        const whitelistRegistry = await hre.ethers.deployContract("WhitelistRegistry");
        await whitelistRegistry.waitForDeployment();

        const equip = await hre.ethers.deployContract("EQUIP");
        await equip.waitForDeployment();
        // const equipAddress = equip.target;

        const testNFT = await hre.ethers.deployContract("TestNFT");
        await testNFT.waitForDeployment();

        return {
            subProfileTBA,
            subProfileNFT,
            whitelistRegistry,
            equip,
            addressZero,
            acc1,
            acc2,
            testNFT
        };
    }

    describe("Deployment", function () {
        it("Should deploy the right subProfileNFT", async function () {
            const { subProfileNFT, acc1 } = await loadFixture(deploySubProfileNFTFixture);
            expect(await subProfileNFT.name()).to.equal("Test");
            expect(await subProfileNFT.symbol()).to.equal("TST");
            expect(await subProfileNFT.owner()).to.equal(await acc1.getAddress());
        });

        it("Should deploy the right whitelister address", async function () {
            const { whitelistRegistry, acc1 } = await loadFixture(deploySubProfileNFTFixture);
            expect(await whitelistRegistry.Whitelister()).to.equal(await acc1.getAddress());
        });
    });

    describe("Checking Whitelist Registry contract", function () {
        it("Should fail for whitelisting address(0)", async function() {
            const{addressZero, whitelistRegistry, acc2} = await loadFixture(deploySubProfileNFTFixture);
            await expect(whitelistRegistry.requestForWhitelisting(await acc2.getAddress())).to.be.revertedWith("Address is not a contract address");
            await expect(whitelistRegistry.requestForWhitelisting(addressZero)).to.be.revertedWith('Invalid contract address');
        });

        it("Only owner can whitelist EOA", async function() {
            const{whitelistRegistry, acc1, acc2, addressZero} = await loadFixture(deploySubProfileNFTFixture);
            const acc2Address = await acc2.getAddress();
            await expect(whitelistRegistry.connect(acc2).addWhitelistEOA(acc2Address)).to.be.revertedWith('Only owner can call this function');
            await expect(whitelistRegistry.addWhitelistEOA(addressZero)).to.be.revertedWith('Invalid contract address');
            await whitelistRegistry.addWhitelistEOA(acc2Address);
            expect(await whitelistRegistry.isWhitelisted(acc2Address)).to.true;
        });

        it("Should be able to request for whitelist and remove whitelist request", async function() {
            const{subProfileNFT, whitelistRegistry, acc2} = await loadFixture(deploySubProfileNFTFixture);
            const subProfileNFTAddress = await subProfileNFT.getAddress();
            await whitelistRegistry.connect(acc2).requestForWhitelisting(subProfileNFTAddress);
            expect(await whitelistRegistry.getRequestStatus(subProfileNFTAddress)).to.equal(0); // Requested status
            await whitelistRegistry.connect(acc2).removeFromWhitelistRequest(subProfileNFTAddress);
            expect(await whitelistRegistry.getRequestStatus(subProfileNFTAddress)).to.equal(3); // Removed status
        });

        it("Should be able to request and whitelist a contract verified by owner", async function() {
            const{subProfileNFT, whitelistRegistry, acc1} = await loadFixture(deploySubProfileNFTFixture);
            const subProfileNFTAddress = await subProfileNFT.getAddress();
            await whitelistRegistry.requestForWhitelisting(subProfileNFTAddress);
            expect(await whitelistRegistry.getRequestStatus(subProfileNFTAddress)).to.equal(0); // Requested status
            await whitelistRegistry.connect(acc1).addWhitelisterc(subProfileNFTAddress);
            expect(await whitelistRegistry.getRequestStatus(subProfileNFTAddress)).to.equal(1); // Verified status
        });

        it("Should be able to add and remove whitelisted contracts", async function() {
            const{subProfileNFT, whitelistRegistry, acc1, acc2} = await loadFixture(deploySubProfileNFTFixture);
            const subProfileNFTAddress = await subProfileNFT.getAddress();
            await whitelistRegistry.connect(acc2).requestForWhitelisting(subProfileNFTAddress);
            expect(await whitelistRegistry.getRequestStatus(subProfileNFTAddress)).to.equal(0); // Requested status
            await whitelistRegistry.connect(acc1).addWhitelisterc(subProfileNFTAddress);
            expect(await whitelistRegistry.getRequestStatus(subProfileNFTAddress)).to.equal(1); // Verified status
            await expect(whitelistRegistry.connect(acc2).removeFromWhitelistRequest(subProfileNFTAddress)).to.be.revertedWith('Only owner can remove these requests');
            await whitelistRegistry.removeWhitelist(subProfileNFTAddress);
            expect(await whitelistRegistry.isWhitelisted(subProfileNFTAddress)).to.false;
            expect(await whitelistRegistry.getRequestStatus(subProfileNFTAddress)).to.equal(3); // Removed status
        });
    });

    describe("EQUIP, using transfer and mint functions", function() {
        it("Should be able receive and verify badge by minting", async function(){
            const{subProfileTBA, whitelistRegistry, equip, testNFT, acc1, addressZero} = await loadFixture(deploySubProfileNFTFixture);
            const testNFTAddress = await testNFT.getAddress();
            const subProfileTBAAddress = await subProfileTBA.getAddress();
            await whitelistRegistry.requestForWhitelisting(testNFTAddress);
            await whitelistRegistry.addWhitelisterc(testNFTAddress);
            expect(await whitelistRegistry.getRequestStatus(testNFTAddress)).to.equal(1); // Verified status
            await expect(testNFT.mint(subProfileTBAAddress)).to.emit(subProfileTBA,'AddedBadge').withArgs(subProfileTBAAddress,1, 1);
        });

        it("Should fail to transfer SBT to another account after minting", async function(){
            const{subProfileTBA, whitelistRegistry, equip, testNFT, acc1, acc2} = await loadFixture(deploySubProfileNFTFixture);
            const acc2Address = await acc2.getAddress();
            const subProfileTBAAddress = await subProfileTBA.getAddress();
            await whitelistRegistry.addWhitelistEOA(acc2Address);
            expect(await whitelistRegistry.getRequestStatus(acc2Address)).to.equal(1); // Verified status
            await testNFT.mint(acc2Address);
            await expect(testNFT.connect(acc2).transferFrom(acc2Address, subProfileTBAAddress, 1)).to.be.revertedWith('SBT: only if unlocked');
        });
    });
});