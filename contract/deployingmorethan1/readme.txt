When using - npx hardhat deploy
    --> Ensure your hardhat.config.js includes hardhat-deploy.
    --> Create separate deployment scripts for better modularity.
    --> Deploy ContractA, ContractB, ContractC first.
    --> Deploy ContractD using the addresses of ContractA, ContractB, and ContractC.

 Deployment Scripts (deploy Folder Structure)
    --> deploy/01_deploy_contractA.js
    --> deploy/02_deploy_contractB.js
    --> deploy/03_deploy_contractC.js
    --> deploy/04_deploy_contractD.js

npx hardhat deploy