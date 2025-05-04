const TransferFromAccount2ToAccount1 = artifacts.require("TransferFromAccount2ToAccount1");

module.exports = function(deployer) {
  deployer.deploy(TransferFromAccount2ToAccount1);
};
