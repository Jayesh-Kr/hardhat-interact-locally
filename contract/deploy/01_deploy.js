module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
  
    await deploy("Trail", {
      from: deployer,
      args: [], // Constructor arguments
      log: true,
    });
  };
  
  module.exports.tags = ["Trail"];