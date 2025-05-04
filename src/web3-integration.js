import Web3 from "web3";

let web3;

export const initWeb3 = async () => {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return true;
    } catch (error) {
      console.error("User denied account access", error);
      return false;
    }
  } else {
    console.log("No Ethereum browser extension detected");
    return false;
  }
};

export const sendTransaction = async (toAddress, amount) => {
  if (!web3) {
    throw new Error("Web3 not initialized");
  }

  try {
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];
    const amountWei = web3.utils.toWei(amount.toString(), "ether");

    const transaction = {
      from: fromAddress,
      to: toAddress,
      value: amountWei,
    };

    const receipt = await web3.eth.sendTransaction(transaction);
    console.log("Transaction successful:", receipt);
    return receipt;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
};
