// EMICalculatorBarChart.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const calculateEMI = (principal, lendingRate, months) => {
  const monthlylendingRate = lendingRate / 12 / 100;
  const denominator = Math.pow(1 + monthlylendingRate, months) - 1;
  const emi = (principal * monthlylendingRate * Math.pow(1 + monthlylendingRate, months)) / denominator;
  return emi;
};

const EMICalculatorBarChart = ({loanAmount, interestRate, loanTenure}) => {
  const [principal, setPrincipal] = useState(loanAmount); // Initial loan amount
  const [lendingRate, setlendingRate] = useState(interestRate); // Initial interest rate
  const [loanTerm, setLoanTerm] = useState(loanTenure); // Initial loan term in months
  const [emiData, setEmiData] = useState([]);

  const handleCalculate = () => {
    const data = [];
    for (let i = 1; i <= loanTerm; i++) {
      const emi = calculateEMI(principal, lendingRate, i);
      data.push({ month: i, emi });
    }
    setEmiData(data);
  };

  return (
    <div>
      <h2>EMI Calculator with Bar Chart</h2>
      <div>
        <label>
          Loan Amount:
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
        </label>
        <label>
          Interest Rate (%):
          <input type="number" value={lendingRate} onChange={(e) => setlendingRate(Number(e.target.value))} />
        </label>
        <label>
          Loan Term (Months):
          <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
        </label>
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      {emiData.length > 0 && (
        <BarChart width={600} height={400} data={emiData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="emi" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
};

export default EMICalculatorBarChart;