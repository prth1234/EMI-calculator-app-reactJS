
import React, { useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import './App.css'; // Import the CSS file for styling
import { Pie } from 'react-chartjs-2';
import EMIScheduleBarChart from "./EMIScheduleBarChart.jsx"; // Assuming you have a component for the bar chart
import profilePicture from './assets/logo1.png'
import ProgressBar from './ProgressBar';
import AmortizationTable from './AmortizationTable.jsx'
import {calculateRepaymentSchedule} from './calculateRepaymentSchedule.jsx'
import RepaymentScheduleTable from './RepaymentScheduleTable.jsx';

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
  const [repaymentSchedule, setRepaymentSchedule] = useState([]);


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
  // const history = useHistory();

  // ... (your existing code)

  // Use useEffect to listen for changes in the step and update the URL accordingly
 

  const [loanDetails, setLoanDetails] = useState({
    loanAmount: '',
    emi: null,
    totalPayment: null,
    totalInterestPayable: null,
  });

  
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);


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


    // const yearlyDistributionData = [];
    // let remainingBalance = principal;
    // for (let year = 1; year <= parseFloat(loanTenure); year++) {
    //   const interestPayment = remainingBalance * rateOfInterest;
    //   const principalPayment = emiAmount - interestPayment;
    //   remainingBalance -= principalPayment;

    //   yearlyDistributionData.push({
    //     year,
    //     principal: principalPayment.toFixed(2),
    //     interest: interestPayment.toFixed(2),
    //     totalPayment: emiAmount.toFixed(2),
    //     balance: remainingBalance.toFixed(2),
    //   });
    // }

    // setAmortizationSchedule(yearlyDistributionData);


  };
  // const handleYearlyDistribution = () => {
  //   // Other logic...
  
  //   // Move to the next step after displaying the table
  //   setStep((prevStep) => prevStep + 1);
  //   console.log('Amortization Schedule:', amortizationSchedule);

  //   // Render AmortizationTable with amortizationSchedule data
  //   return (
  //     <div key="amortizationSchedule">
  //       <h2>Amortization Schedule</h2>
  //       <AmortizationTable input={{ amortization: amortizationSchedule }} />
  //       {/* <div className="button-group" style={{ display: 'flex', gap: 7, justifyContent: 'center' }}>
  //         <button onClick={() => setStep(1)}>Start Over</button>
  //       </div> */}
  //     </div>
  //   );
  // };
  const handleBackStep = () => {
    setStep(5);
    // setProgress((prevProgress) => prevProgress - (100 / 3)); // Update progress on each step
  };
  const handleRepaymentSchedule = () => {
    const loanDetails = {
      loanAmount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate),
      loanTerm: parseFloat(loanTenure),
      startDate: new Date(),  // Replace with your actual start date logic
      paymentFrequency: 'monthly',  // Replace with your actual payment frequency logic
    };

    const repaymentSchedule = calculateRepaymentSchedule(loanDetails);
    console.log("edkfrhejfk")
    // Display the repayment schedule table
    setStep(7); // Set the step directly to 7
    console.log()
    setRepaymentSchedule(repaymentSchedule);  // Assume you have a state variable for the repayment schedule
    // generatePDF(repaymentSchedule);

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

    {step !== 5 && step !=6 && step!=7 && <img src={profilePicture} alt="Logo" ></img>}
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
            <span style={{ transitionDelay: '350ms' }}></span>
            <span style={{ transitionDelay: '350ms' }}>(</span>
            <span style={{ transitionDelay: '350ms' }}>{currency}</span>
            <span style={{ transitionDelay: '350ms' }}>)</span>


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
            <span style={{ transitionDelay: '350ms' }}> </span>
            <span style={{ transitionDelay: '350ms' }}>%</span>

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
<span style={{ transitionDelay: '400ms' }}>u</span>
<span style={{ transitionDelay: '450ms' }}>r</span>
<span style={{ transitionDelay: '500ms' }}>e</span>
<span style={{ transitionDelay: '550ms' }}> </span>
{/* <span style={{ transitionDelay: '650ms' }}>i</span>
<span style={{ transitionDelay: '700ms' }}>n</span> */}
<span style={{ transitionDelay: '750ms' }}>(</span>
<span style={{ transitionDelay: '800ms' }}>m</span>
<span style={{ transitionDelay: '850ms' }}>o</span>
<span style={{ transitionDelay: '750ms' }}>)</span>

{/* <span style={{ transitionDelay: '900ms' }}>n</span>
<span style={{ transitionDelay: '950ms' }}>t</span>
<span style={{ transitionDelay: '1000ms' }}>h</span>
<span style={{ transitionDelay: '1050ms' }}>s</span> */}

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
          <button className="start" onClick={() => setStep(1)}>Start Over</button>
          <button onClick={handleVisualize}>Visualize</button>

          <button class ="genBtn"onClick={handleRepaymentSchedule}>✨Generate Amortization Table</button>

            {/* <button>

<span class="text">EMI Scheduler</span>
</button> */}
            {/* <button onClick={handleRepaymentSchedule}>Amortization Calculator</button> */}
            {/* <button onClick={handleRepaymentSchedule} class="BTNNN">
    <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
    </svg>

    <span class="text">Generate Amortization Table</span>
</button> */}

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
      {/* <button onClick={handleVisualize}>Amortisation Schedule</button> */}
    </div>
    
  </div>
  <button onClick={handleBackStep}>⤶ Back to Summary</button>

</div>



)}

{step === 7  && (
  // console.log("Entered step7");
  <div key="repaymentSchedule">
      {/* <button onClick={handleBackStep}>⤶ Back to Summary</button> */}

  {/* <h2 style={{ color: 'white' }}>Repayment Schedule</h2> */}
  <RepaymentScheduleTable paymentSchedule={repaymentSchedule} />
  {/* <div className="button-group" style={{ display: 'flex', gap: 7, justifyContent: 'center' }}> */}
  <button onClick={handleBackStep}>⤶ Back to Summary</button>
  

    {/* <button onClick={() => setStep(1)}>Start Over</button> */}
    {/* <button onClick={generatePDF}>Download</button> */}


  {/* </div> */}
</div>






)}

    </form>
        
</div>

  )

}

export default Forms;


