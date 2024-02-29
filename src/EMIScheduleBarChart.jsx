// EMICalculatorBarChart.jsx
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const calculateEMI = (principal, interestRate, months) => {
  const monthlyInterestRate = interestRate / 12 / 100;
  const denominator = Math.pow(1 + monthlyInterestRate, months) - 1;
  const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) / denominator;
  return emi;
};

const EMICalculatorBarChart = ({ loanAmount, interestRate, loanTenure }) => {
  const [emiData, setEmiData] = useState([]);

  useEffect(() => {
    const handleCalculate = () => {
      const loanAmountValue = parseFloat(loanAmount);
      const interestRateValue = parseFloat(interestRate);
      const loanTenureValue = parseInt(loanTenure, 10);

      if (isNaN(loanAmountValue) || isNaN(interestRateValue) || isNaN(loanTenureValue) || loanAmountValue <= 0 || interestRateValue <= 0 || loanTenureValue <= 0) {
        alert('Please enter valid loan details.');
        return;
      }

      const data = [];
      for (let i = 1; i <= loanTenureValue; i++) {
        const emi = calculateEMI(loanAmountValue, interestRateValue, i);
        data.push({ month: i, emi });
      }
      setEmiData(data);
    };

    handleCalculate();
  }, [loanAmount, interestRate, loanTenure]);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>EMI Calculator with Bar Chart</h2>
      {emiData.length > 0 && (
        <BarChart width={600} height={400} data={emiData} style={{ margin: 'auto' }}>
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
