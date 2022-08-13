//I want to create the deploy script for the tree fund smart contract

//Useful libraries that I would be working with -->
const { ethers, waffle } = require("hardhat");

//Commencing with the deploy script
async function Treefund() {
  [signer1, signer2, signer3] = await ethers.getSigners();
  const Donation = await ethers.getContractFactory("Donation", signer1);
  const donation = await Donation.deploy();
  console.log(
    "Treefund contract was deployed to",
    donation.address,
    "by",
    signer1.address
  );

  await signer1.sendTransaction({
    to: donation.address,
    value: ethers.utils.parseUnits("0.1", 18),
  });
  await signer2.sendTransaction({
    to: donation.address,
    value: ethers.utils.parseUnits("0.5", 18),
  });
  await signer3.sendTransaction({
    to: donation.address,
    value: ethers.utils.parseUnits("2", 18),
  });
}

async function main() {
  await Treefund();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
