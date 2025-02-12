module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
  
    const contractB = await deploy("ContractB", {
      from: deployer,
      args: [], // Constructor args if any
      log: true,
    });
  
    console.log(`ContractB deployed at: ${contractB.address}`);
  };
  
  module.exports.tags = ["ContractB"];
  