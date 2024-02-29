// EMICalculatorBarChart.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const calculateEMI = (principal, interestRate, months) => {
  const monthlyInterestRate = interestRate / 12 / 100;
  const denominator = Math.pow(1 + monthlyInterestRate, months) - 1;
  const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) / denominator;
  return emi;
};

const EMICalculatorBarChart = () => {
  const [principal, setPrincipal] = useState(100000); // Initial loan amount
  const [interestRate, setInterestRate] = useState(8); // Initial interest rate
  const [loanTerm, setLoanTerm] = useState(12); // Initial loan term in months
  const [emiData, setEmiData] = useState([]);

  const handleCalculate = () => {
    const data = [];
    for (let i = 1; i <= loanTerm; i++) {
      const emi = calculateEMI(principal, interestRate, i);
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
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
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
