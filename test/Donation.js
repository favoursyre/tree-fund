//I want to test the script here

const { expect } = require("chai");
const { ethers } = require("hardhat");

//Commencing the test
describe("Donation", async () => {
    beforeEach(async () => {
      [signer1, signer2, signer3] = await ethers.getSigners();
      console.log(signer1);
      Donation_ = await ethers.getContractFactory("Donation", signer1);
      donation = await Donation_.deploy();
    });

  //This test the receive function
  describe("receive", async () => {
    it("transfers ethers to the contract", async () => {
      [signer1, signer2, signer3] = await ethers.getSigners();
      console.log(signer1);
      Donation_ = await ethers.getContractFactory("Donation", signer1);
      donation = await Donation_.deploy();
      const provider = waffle.provider;
      await signer2.sendTransaction({
        to: donation.address,
        value: "100",
      });
      expect(await provider.getBalance(donation.address)).to.equal("100");
    });
  });

  //This test the get donation function
  describe("getDonations", () => {
    it("returns an array of donations transferred to the contract", async () => {
      const provider = waffle.provider;
      await signer1.sendTransaction({
        to: donation.address,
        value: "25",
      });
      await signer2.sendTransaction({
        to: donation.address,
        value: "15",
      });
      const donations = await donation.connect(provider).getDonations();
      expect(donations[0].donor).to.equal(signer1.address);
      expect(donations[0].amount).to.equal("25");
      expect(donations[1].donor).to.equal(signer2.address);
      expect(donations[1].amount).to.equal("15");
    });
  });

  //This test the get total donation function
  describe("getTotalDonations", () => {
    it("returns sum of donations transferred to the contract", async () => {
      const provider = waffle.provider;
      await signer1.sendTransaction({
        to: donation.address,
        value: "5",
      });
      await signer2.sendTransaction({
        to: donation.address,
        value: "15",
      });
      await signer3.sendTransaction({
        to: donation.address,
        value: "25",
      });
      expect(await donation.connect(provider).getTotalBalance()).to.equal("45");
    });
  });
});
