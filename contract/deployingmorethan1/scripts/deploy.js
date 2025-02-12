const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy Contract A
  const ContractA = await hre.ethers.getContractFactory("ContractA");
  const contractA = await ContractA.deploy();
  await contractA.deployed();
  console.log(`ContractA deployed at: ${contractA.address}`);

  // Deploy Contract B
  const ContractB = await hre.ethers.getContractFactory("ContractB");
  const contractB = await ContractB.deploy();
  await contractB.deployed();
  console.log(`ContractB deployed at: ${contractB.address}`);

  // Deploy Contract C
  const ContractC = await hre.ethers.getContractFactory("ContractC");
  const contractC = await ContractC.deploy();
  await contractC.deployed();
  console.log(`ContractC deployed at: ${contractC.address}`);

  // Deploy Contract D (Requires A, B, C addresses)
  const ContractD = await hre.ethers.getContractFactory("ContractD");
  const contractD = await ContractD.deploy(contractA.address, contractB.address, contractC.address);
  await contractD.deployed();
  console.log(`ContractD deployed at: ${contractD.address}`);
}

// Execute script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
