// File: ./test/TransferFromAccount2ToAccount1.test.js
const TransferFromAccount2ToAccount1 = artifacts.require("TransferFromAccount2ToAccount1");

contract('TransferFromAccount2ToAccount1', (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await TransferFromAccount2ToAccount1.new({ from: accounts[0] });
    // Initialize contract with sufficient balance if needed
    await web3.eth.sendTransaction({ from: accounts[0], to: instance.address, value: web3.utils.toWei("10", "ether") });
  });

  it('should transfer Ether from account2 to account1', async () => {
    const amount = web3.utils.toWei('1', 'ether');
    const initialBalanceAccount1 = await web3.eth.getBalance(accounts[1]);
    const initialBalanceAccount2 = await web3.eth.getBalance(instance.address);

    await instance.transfer(amount, { from: accounts[0] });

    const finalBalanceAccount1 = await web3.eth.getBalance(accounts[1]);
    const finalBalanceAccount2 = await web3.eth.getBalance(instance.address);

    // Add your assertions here to verify the state changes in your contract
    assert.equal(finalBalanceAccount1 - initialBalanceAccount1, amount, "Incorrect amount transferred to account1");
    assert.equal(initialBalanceAccount2 - finalBalanceAccount2, amount, "Contract balance not decreased properly");
  });
});
