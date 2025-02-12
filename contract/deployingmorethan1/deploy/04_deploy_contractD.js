module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
  
    // Fetch deployed contract addresses
    const contractA = await deployments.get("ContractA");
    const contractB = await deployments.get("ContractB");
    const contractC = await deployments.get("ContractC");
  
    const contractD = await deploy("ContractD", {
      from: deployer,
      args: [contractA.address, contractB.address, contractC.address], // Pass addresses as constructor args
      log: true,
    });
  
    console.log(`ContractD deployed at: ${contractD.address}`);
  };
  
  module.exports.tags = ["ContractD"];
  module.exports.dependencies = ["ContractA", "ContractB", "ContractC"]; // Ensures they deploy first
  