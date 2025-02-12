module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
  
    const contractC = await deploy("ContractC", {
      from: deployer,
      args: [], // Constructor args if any
      log: true,
    });
  
    console.log(`ContractC deployed at: ${contractC.address}`);
  };
  
  module.exports.tags = ["ContractC"];
  