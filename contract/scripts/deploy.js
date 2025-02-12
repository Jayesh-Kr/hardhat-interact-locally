const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy Contract X.sol
  const ContractA = await hre.ethers.getContractFactory("X");
  const contractA = await ContractA.deploy();
  await contractA.waitForDeployment(); // instead of contractA.deployed()  -> ethers v6
  //   console.log(`ContractA deployed at: ${contractA.address}`);
  console.log(`ContractA deployed at: ${await contractA.getAddress()}`); // ✅ Use getAddress() instead of .address
}

// Execute script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
