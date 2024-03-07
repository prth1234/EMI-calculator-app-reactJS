
import React, { useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import './App.css'; // Import the CSS file for styling
import { Pie } from 'react-chartjs-2';
import EMIScheduleBarChart from "./EMIScheduleBarChart.jsx"; // Assuming you have a component for the bar chart
import profilePicture from './assets/logo1.png'
import ProgressBar from './ProgressBar';

function PaymentPieChart({ loanDetails }) {
    const { loanAmount, emi, totalPayment, totalInterestPayable } = loanDetails;
  
    const data = {
      labels: ['Loan Amount', 'Total Interest', 'Total Payment'],
      datasets: [
        {
          data: [
            parseFloat(loanAmount),
            totalInterestPayable !== null ? parseFloat(totalInterestPayable) : 0,
            totalPayment !== null ? parseFloat(totalPayment) : 0,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
        },
      ],
    };
  
    return <Pie data={data} />;
  }
  

function Forms(){
      // State variables to store input values
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEMI] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterestPayable, setTotalInterestPayable] = useState(null);
  const [chartData, setChartData] = useState(null);

  // Refs for input fields
  const loanAmountRef = useRef(null);
  const interestRateRef = useRef(null);
  const loanTenureRef = useRef(null);
  const [currency, setCurrency] = useState('USD'); // Add currency state


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
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
    setProgress((prevProgress) => prevProgress + (100 / 3)); // Update progress on each step

  };

  const [loanDetails, setLoanDetails] = useState({
    loanAmount: '',
    emi: null,
    totalPayment: null,
    totalInterestPayable: null,
  });

  


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

    setLoanDetails({
      loanAmount: loanAmount,
      emi: emiAmount.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterestPayable: totalInterestPayable.toFixed(2),
    });


    // Move to the next step after calculating EMI
    handleNextStep();


    const yearlyDistributionData = [];
    let remainingBalance = principalAmount;
    for (let year = 1; year <= parseFloat(loanTenure); year++) {
      const interestPayment = remainingBalance * rateOfInterest;
      const principalPayment = emiAmount - interestPayment;
      remainingBalance -= principalPayment;

      yearlyDistributionData.push({
        year,
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        totalPayment: emiAmount.toFixed(2),
        balance: remainingBalance.toFixed(2),
      });
    }

    setYearlyDistribution(yearlyDistributionData);


  };

  const generateChartData = () => {
    const principalAmount = parseFloat(loanAmount);
    const interestExpense = parseFloat(totalInterestPayable);

    const chartData = {
      labels: ['Principal Loan Amount', 'Interest Expense'],
      datasets: [
        {
          data: [principalAmount, interestExpense],
          backgroundColor: ['#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
        },
      ],
    };

    setChartData(chartData);
  };

  const handleVisualize = () => {
    generateChartData();
    setStep((prevStep) => prevStep + 1);
  };

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
      case 4:
        // Handle any logic related to step 4 (Loan Summary) here
        break;
      case 5:
        // Handle any logic related to step 5 (Chart) here
        break;
      default:
        break;
    }
  };

  



  return (

    <div className="container">

    {step !== 5 && step !=6 && <img src={profilePicture} alt="Logo" ></img>}
    {step < 5 &&  <ProgressBar progress={progress} /> }
    <form onSubmit={handleFormSubmit}>

    {step === 1 && (


<div key="currency" className="form-control" style={{ display: 'flex', flexDirection: 'column', alignItems: 'centre' }}>
  <label>
    <span style={{ transitionDelay: '0ms', marginBottom: '10px' , alignItems: 'right'}}></span>
  </label>
  <select value={currency} onChange={handleCurrencyChange} required>
  <option value="USD" label="USD" />
    <option value="EUR" label="EURO" />
    <option value="INR" label="INR" />
    <option value="JPY" label="JPY" />
    <option value="GBP" label="GBP" />
    <option value="AUD" label="AUD" />
    <option value="CAD" label="CAD" />
    <option value="CHF" label="CHF" />
    <option value="CNY" label="CNY" />
    <option value="NZD" label="NZD" />
    <option value="HKD" label="HKD" />
    {/* Add more currency options as needed */}
  </select>
  <button onClick={handleNextStep} style={{ marginTop: '10px' }}>Next</button>
</div>
)}




      {step === 2 && (
        <div key="loanAmount" className="form-control"      
        >




          
          <input
            type=""
            pattern="\d+" 
            value={loanAmount}
            onChange={handleLoanAmountChange}
            ref={loanAmountRef}
            
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

      

      {step === 3 && (
        <div key="interestRate" className="form-control">
          <input
            type=""
            pattern="\d+" 
            value={interestRate}
            onChange={handleInterestRateChange}
            ref={interestRateRef}
            
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

      {step === 4 && (
        <div key="loanTenure" className="form-control">
          <input
             type=""
             pattern="\d+" 
            value={loanTenure}
            onChange={handleLoanTenureChange}
            ref={loanTenureRef}
            
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

      {step === 5 && emi !== null && (
        <div key="emiResult">
          <h2>Loan Repayment Summary</h2>
          <section className="wrapper">
            <main className="row title">
              <ul>
                <li>Serial Number</li>
                <li>Description</li>
                <li>
                  <span className="title-hide"></span> Amount
                </li>
                <li>Detail</li>
              </ul>
            </main>
            <div id="pdf-content">
              <article className="row nfl">
                <ul>
                  <li>
                    <a href="#">1</a>
                  </li>
                  <li>Principle</li>
                  <li>{currency} {loanAmount}.00</li>
                  <li>Entered</li>
                </ul>
                <ul className="more-content">
                  <li>
                    Principal: Initial sum of money borrowed or invested, forming the basis upon
                    which interest is calculated or returns are generated.
                  </li>
                </ul>
              </article>
              <article className="row nfl">
                <ul>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>Loan EMI</li>
                  <li>{currency} {emi}</li>
                  <li>Derived</li>
                </ul>
                <ul className="more-content">
                  <li>
                    EMI Amount: Periodic payment covering both principal and interest, applicable
                    to various loans or financial commitments.
                  </li>
                </ul>
              </article>
              <article className="row nfl">
                <ul>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li>Interest Expense</li>
                  <li>
                  {currency} {totalInterestPayable !== null ? `${totalInterestPayable}` : 'N/A'}
                  </li>
                  <li>Derived</li>
                </ul>
                <ul className="more-content">
                  <li>
                    Interest Expense: The cost incurred for borrowing money, representing the
                    payment made for the privilege of using funds from a lender or financial
                    institution.
                  </li>
                </ul>
              </article>
              <article className="row nfl">
                <ul>
                  <li>
                    <a href="#">4</a>
                  </li>
                  <li>Repayment Amount</li>
                  <li>{currency} {totalPayment !== null ? `${totalPayment}` : 'N/A'}</li>
                  <li>Derived</li>
                </ul>
                <ul className="more-content">
                  <li>
                    Repayable Amount: The total sum due for repayment, encompassing both the
                    borrowed principal and accrued interest, typically associated with loans or
                    financial obligations.
                  </li>
                </ul>
              </article>
            </div>
          </section>
          <div className="button-group" style={{display:"flex",gap:7 , justifyContent:'center'}}>
            <button onClick={handleVisualize}>Visualize</button>
            {/* <button>
<span class="text">EMI Scheduler</span>
</button> */}
            <button className="start" onClick={() => setStep(1)}>Start Over</button>
          </div>
        </div>
      )}




{step === 6 && chartData !== null && (
<div key="chartResult">
  <h2>Visualiser</h2>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ flex: 1 }}>
      <h3>Payment Breakdown</h3>
      <PaymentPieChart loanDetails={loanDetails} />
    </div>
    <div style={{ flex: 1 }}>
      <h3>EMI Schedule</h3>
      
      <EMIScheduleBarChart loanAmount={loanAmount} interestRate={interestRate} loanTenure={loanTenure} />
      <button onClick={handleVisualize}>Yearly Distribution</button>
    </div>
  </div>
</div>



)}
    </form>
        
</div>

  )

}

export default Forms;