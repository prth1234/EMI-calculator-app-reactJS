import React, { useState, useRef } from 'react';
import './App.css'; // Import the CSS file for styling

function App() {
  // State variables to store input values
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEMI] = useState(null); // New state for EMI
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterestPayable, setTotalInterestPayable] = useState(null);

  // Refs for input fields
  const loanAmountRef = useRef(null);
  const interestRateRef = useRef(null);
  const loanTenureRef = useRef(null);

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
    // Perform EMI calculation based on the standard formula
    const principal = parseFloat(loanAmount);
    const rateOfInterest = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const numberOfPayments = parseFloat(loanTenure) * 12; // Total number of payments
  
    const emiAmount =
      (principal * rateOfInterest * Math.pow(1 + rateOfInterest, numberOfPayments)) /
      (Math.pow(1 + rateOfInterest, numberOfPayments) - 1);
  
    setEMI(emiAmount.toFixed(2));
  
    // Calculate Total Payment (Principal + Interest)
    const totalPayment = emiAmount * numberOfPayments;
  
    // Calculate Total Interest Payable
    const totalInterestPayable = totalPayment - principal;
  
    setTotalPayment(totalPayment.toFixed(2));
    setTotalInterestPayable(totalInterestPayable.toFixed(2));
  
    // Move to the next step after calculating EMI
    handleNextStep();
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    switch (step) {
      case 1:
        interestRateRef.current.focus();
        break;
      case 2:
        loanTenureRef.current.focus();
        break;
      case 3:
        calculateEMI();
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <img src="src/assets/logo1.png" alt="Logo"></img>

      <form onSubmit={handleFormSubmit}>
        {step === 1 && (
          <div key="loanAmount" className="form-control">
            <input
              type="number"
              value={loanAmount}
              onChange={handleLoanAmountChange}
              ref={loanAmountRef}
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
              ref={interestRateRef}
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
              ref={loanTenureRef}
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
    <h2>Loan Repayment Summary</h2>








    <section class="wrapper">
            <main class="row title">
              <ul>
                <li>Serial Number</li>
                <li>Description</li>
                <li><span class="title-hide"></span> Amount</li>
                
                <li>Detail</li>
              </ul>
            </main>
            <article class="row nfl">
                <ul>
                  <li><a href="#">1</a></li>
                  <li>Principle</li>
                  <li>${loanAmount}.00</li>
                  <li>Entered</li>
                </ul>
                <ul class="more-content">
                  <li>Principal: Initial sum of money borrowed or invested, forming the basis upon which interest is calculated or returns are generated.





</li>
                </ul>
              </article>
            <article class="row nfl">
                <ul>
                  <li><a href="#">2</a></li>
                  <li>EMI Amount</li>
                  <li>${emi}</li>
              
                  <li>Derived</li>
                </ul>
                <ul class="more-content">
                  <li>EMI Amount: Periodic payment covering both principal and interest, applicable to various loans or financial commitments.</li>
                </ul>
              </article>
            <article class="row nfl">
              <ul>
                <li><a href="#">3</a></li>
                <li>Interest Expense</li>
                <li>{totalInterestPayable !== null ? `$${totalInterestPayable}` : 'N/A'}</li>
       
                <li>Derived</li>
              </ul>
              <ul class="more-content">
                <li>
Interest Expense: The cost incurred for borrowing money, representing the payment made for the privilege of using funds from a lender or financial institution.

</li>
              </ul>
            </article>
            <article class="row nfl">
                <ul>
                  <li><a href="#">4</a></li>
                  <li>Repayment Amount</li>
                  <li>{totalPayment !== null ? `$${totalPayment}` : 'N/A'}</li>
               
                  <li>Derived</li>
                </ul>
                <ul class="more-content">
                  <li>
Repayable Amount: The total sum due for repayment, encompassing both the borrowed principal and accrued interest, typically associated with loans or financial obligations.





</li>
                </ul>
              </article>
              </section>




    {/* <button onClick={() => setStep(1)}>Start Over</button> */}
  </div>
)}

      </form>
    </div>
  );
}

export default App;
