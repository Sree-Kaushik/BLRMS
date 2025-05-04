import React, { useEffect, useState } from "react";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import "./transactionpage.css";
import { initWeb3, sendTransaction } from "./web3-integration";

const TransactionPage = () => {
  const navigate = useNavigate();
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);

  useEffect(() => {
    const netBankingBtn = document.getElementById("netBankingBtn");
    const creditCardBtn = document.getElementById("creditCardBtn");
    const netBankingForm = document.getElementById("netBankingForm");
    const creditCardForm = document.getElementById("creditCardForm");

    const setupWeb3 = async () => {
      const result = await initWeb3();
      setIsWeb3Enabled(result);
    };

    netBankingBtn.addEventListener("click", function () {
      setupWeb3();
      netBankingForm.classList.add("active");
      creditCardForm.classList.remove("active");
    });

    creditCardBtn.addEventListener("click", function () {
      creditCardForm.classList.add("active");
      netBankingForm.classList.remove("active");
    });

    const cardNumberInput = document.getElementById("cardNumber");
    const cvvInput = document.getElementById("cvv");

    const cardNumberRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3}$/;

    cardNumberInput.addEventListener("input", function () {
      const value = this.value;
      if (!cardNumberRegex.test(value)) {
        this.setCustomValidity("Please enter a valid 16-digit card number.");
      } else {
        this.setCustomValidity("");
      }
    });

    cvvInput.addEventListener("input", function () {
      const value = this.value;
      if (!cvvRegex.test(value)) {
        this.setCustomValidity("Please enter a valid 3-digit CVV.");
      } else {
        this.setCustomValidity("");
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get("role");

    document
      .getElementById("pay1")
      .addEventListener("click", async function (event) {
        event.preventDefault();
        if (isWeb3Enabled) {
          const surveyFee = "0.001"; // Use actual fee or default to 0.001 ETH
          const recipientAddress = "0x85C89A4F23dd2470a9b2DB5CD6DDcF77444bc274"; // Replace with actual recipient address
          try {
            await sendTransaction(recipientAddress, surveyFee);
            navigate(`/confirmationpage?role=${role}&surveyFee=${surveyFee}`);
          } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed. Please try again.");
          }
        } else {
          console.log("Metamask not connected");
          alert("Please connect to Metamask first.");
        }
      });

    document.getElementById("pay2").addEventListener("click", function (event) {
      event.preventDefault();
      const surveyFee = urlParams.get("surveyFee") || "N/A";
      navigate(`/confirmationpage?role=${role}&surveyFee=${surveyFee}`);
    });

    document
      .getElementById("profile-image")
      .addEventListener("click", function () {
        navigate("/profilepage");
      });

    document.getElementById("logo").addEventListener("click", function () {
      navigate("/home");
    });
  }, [navigate, isWeb3Enabled]);

  return (
    <div>
      <Header />
      <div className="container">
        <h11>Land Registration and Management System</h11>
        <h22>Payment Page</h22>

        <div className="payment-method">
          <button id="netBankingBtn">Net Banking</button>
          <button id="creditCardBtn">Credit Card/Debit Card</button>
        </div>

        <div id="netBankingForm" className="payment-form">
          <h3>Net Banking</h3>
          <form>
            <label htmlFor="bank">Select Bank:</label>
            <select id="bank" name="bank">
              <option value="bank1">Bank 1</option>
              <option value="bank2">Bank 2</option>
              <option value="bank3">Bank 3</option>
            </select>
            <button className="pay-now-button" id="pay1">
              Pay Now
            </button>
          </form>
        </div>

        <div id="creditCardForm" className="payment-form">
          <h3>Credit Card/Debit Card</h3>
          <form>
            <label htmlFor="name">Name of the Card Holder:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" name="cardNumber" />

            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
            />

            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" />

            <button className="pay-now-button" id="pay2">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;