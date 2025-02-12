module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
  
    const contractA = await deploy("ContractA", {
      from: deployer,
      args: [], // Constructor args if any
      log: true,
    });
  
    console.log(`ContractA deployed at: ${contractA.address}`);
  };
  
  module.exports.tags = ["ContractA"];
  