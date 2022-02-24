import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { send } from "process";
describe("Guild", function () {
  it("Guild test", async function () {
    const [owner, addr1] = await ethers.getSigners();

    // Token 배포
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.deployed();
    console.log("MyToken deployed to:", myToken.address);

    // Membership NFT 배포
    const Membership = await ethers.getContractFactory("Membership");
    const membership = await Membership.deploy("Membership", "mbs");
    await membership.deployed();
    console.log("Membership deployed to:", membership.address);

    // Collection NFT 배포
    const Collection = await ethers.getContractFactory("Collection");
    const collection = await Collection.deploy("Collection","clt")
    await collection.deployed();
    console.log("Collection deployed to:", collection.address);
    
    // Guild NFT 배포
    var guildName = "First";
    const Guild = await ethers.getContractFactory("Guild");
    const guild = await Guild.deploy(guildName, myToken.address, membership.address, collection.address);
    await guild.deployed();
    console.log("Guild deployed to:", guild.address);

    // Membership NFT 민팅
    await membership.mintMembership(10);
    expect(await membership.totalSupply()).to.equal(10);
    expect(await membership.balanceOf(owner.address)).to.equal(10);

    // Collection NFT 민팅
    await collection.mintWithTokenURI(owner.address, 0, "https://wiggler.io");
    expect(await collection.tokenURI(0)).to.equal("https://wiggler.io");

    // Owner와 Guild contract 에 token 공급
    // Owner 9000, Guild 1000
    await myToken.mint(owner.address, 10000);
    await myToken.transfer(guild.address, 1000);

    // Supply 투표 제안
    await guild.proposeSupplyNFT("Supply NFT 0", collection.address, 0, 1);
    var proposals = await guild.getProposals();
    console.log("proposals: ", proposals);

    // Supply 투표
    await guild.vote(0, true);
    var proposal = await guild.getProposal(0);
    console.log("proposal: ", proposal);
    
    // Supply
    await collection.approve(guild.address, 0);
    await guild.supplyNFT(0);

    // Supply 후 NFT, Token 확인
    expect(await collection.ownerOf(0)).to.equal(guild.address);
    let balance = await myToken.balanceOf(guild.address);
    console.log("Balance Of guild:", balance);
    balance = await myToken.balanceOf(owner.address);
    console.log("Balance Of Owner:", balance);

    // Dispose 투표 제안
    await guild.proposeDisposeNFT("Dispose NFT 1", collection.address, 0, 1);
    proposals = await guild.getProposals();
    console.log("proposals: ", proposals);

    // Dispose 투표
    await guild.vote(1, true);
    proposal = await guild.getProposal(1);
    console.log("proposal: ", proposal);
    
    // Dispose
    await myToken.approve(guild.address, 1);
    await guild.disposeNFT(1);

    // Rent
    await guild.rentNFT(collection.address, 0);
    await collection.transferFrom(guild.address, owner.address, 0);
    expect(await collection.ownerOf(0)).to.equal(owner.address);

    // Return
    await collection.approve(guild.address, 0);
    await guild.returnNFT(collection.address, 0);
    expect(await collection.ownerOf(0)).to.equal(guild.address);
  });
});