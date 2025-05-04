import Web3 from 'web3';
import contract from '@truffle/contract';
import contractArtifact from '../build/contracts/TransferFromAccount2ToAccount1.json';

const web3 = new Web3('http://localhost:7545'); // Replace with your Ethereum node endpoint
const TransferFromAccount2ToAccount1 = contract(contractArtifact);
TransferFromAccount2ToAccount1.setProvider(web3.currentProvider);

async function main() {
  const accounts = await web3.eth.getAccounts();
  const instance = await TransferFromAccount2ToAccount1.deployed();

  // Send Ether to the contract
  await web3.eth.sendTransaction({
    from: accounts[0],
    to: instance.address,
    value: web3.utils.toWei('10', 'ether')
  });
  console.log('Ether sent to contract');

  // Call the transfer function
  const amount = web3.utils.toWei('1', 'ether');
  await instance.transfer(amount, { from: accounts[1] });
  console.log('Transfer initiated by account2');
}

main().catch(console.error);
