import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

function App() {
  // State variables to store input values
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEMI] = useState(null); // New state for EMI

  // Event handlers to update the state on input changes
  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };

  const handleLoanTenureChange = (e) => {
    setLoanTenure(e.target.value);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const calculateEMI = () => {
    // Perform EMI calculation based on your logic
    // For simplicity, let's assume a basic formula for EMI calculation
    const principal = parseFloat(loanAmount);
    const rateOfInterest = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const numberOfPayments = parseFloat(loanTenure) * 12; // Total number of payments

    const emiAmount =
      (principal * rateOfInterest * Math.pow(1 + rateOfInterest, numberOfPayments)) /
      (Math.pow(1 + rateOfInterest, numberOfPayments) - 1);

    setEMI(emiAmount.toFixed(2));
    handleNextStep(); // Move to the next step after calculating EMI
  };

  return (
    <div className="container">
      <h1>Loan Calculator</h1>

      {step === 1 && (
        <div key="loanAmount" className="form-control">
          <input
            type="number"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            required
          />
          <label>
            <span style={{ transitionDelay: '0ms' }}>L</span>
            <span style={{ transitionDelay: '50ms' }}>o</span>
            <span style={{ transitionDelay: '100ms' }}>a</span>
            <span style={{ transitionDelay: '150ms' }}>n</span>
            <span style={{ transitionDelay: '200ms' }}> </span>
            <span style={{ transitionDelay: '250ms' }}>A</span>
            <span style={{ transitionDelay: '300ms' }}>m</span>
            <span style={{ transitionDelay: '350ms' }}>o</span>
            <span style={{ transitionDelay: '350ms' }}>u</span>
            <span style={{ transitionDelay: '350ms' }}>n</span>
            <span style={{ transitionDelay: '350ms' }}>t</span>
          </label>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div key="interestRate" className="form-control">
          <input
            type="number"
            value={interestRate}
            onChange={handleInterestRateChange}
            required
          />
          <label>
            <span style={{ transitionDelay: '0ms' }}>I</span>
            <span style={{ transitionDelay: '50ms' }}>n</span>
            <span style={{ transitionDelay: '100ms' }}>t</span>
            <span style={{ transitionDelay: '150ms' }}>e</span>
            <span style={{ transitionDelay: '200ms' }}>r</span>
            <span style={{ transitionDelay: '250ms' }}>e</span>
            <span style={{ transitionDelay: '300ms' }}>s</span>
            <span style={{ transitionDelay: '350ms' }}>t</span>
            <span style={{ transitionDelay: '350ms' }}> </span>
            <span style={{ transitionDelay: '350ms' }}>R</span>
            <span style={{ transitionDelay: '350ms' }}>a</span>
            <span style={{ transitionDelay: '350ms' }}>t</span>
            <span style={{ transitionDelay: '350ms' }}>e</span>
          </label>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div key="loanTenure" className="form-control">
          <input
            type="number"
            value={loanTenure}
            onChange={handleLoanTenureChange}
            required
          />
          <label>
            <span style={{ transitionDelay: '0ms' }}>L</span>
            <span style={{ transitionDelay: '50ms' }}>o</span>
            <span style={{ transitionDelay: '100ms' }}>a</span>
            <span style={{ transitionDelay: '150ms' }}>n</span>
            <span style={{ transitionDelay: '200ms' }}> </span>
            <span style={{ transitionDelay: '250ms' }}>T</span>
            <span style={{ transitionDelay: '300ms' }}>e</span>
            <span style={{ transitionDelay: '350ms' }}>n</span>
            <span style={{ transitionDelay: '350ms' }}>u</span>
            <span style={{ transitionDelay: '350ms' }}>r</span>
            <span style={{ transitionDelay: '350ms' }}>e</span>
          </label>
          <button onClick={calculateEMI}>EMI</button>
        </div>
      )}

      {step === 4 && emi !== null && (
        <div key="emiResult">
          <h2>EMI Calculation Result</h2>
          <p>EMI Amount: ${emi}</p>
        </div>
      )}
    </div>
  );
}

export default App;
