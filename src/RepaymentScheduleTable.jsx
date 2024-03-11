// RepaymentScheduleTable.jsx

import React from 'react';
import './RepaymentScheduleTable.css'; // Import your CSS file for styling
import './App.css'

const RepaymentScheduleTable = ({ paymentSchedule }) => {
  return (
    <div>
      <h2>Amortization Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Payment Number</th>
            <th>Payment Date</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Total Payment</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {paymentSchedule.map((payment) => (
            <tr key={payment.number}>
              <td>{payment.number}</td>
              <td>{payment.paymentDate.toDateString()}</td>
              <td>${payment.principal.toFixed(2)}</td>
              <td>${payment.interest.toFixed(2)}</td>
              <td>${payment.total.toFixed(2)}</td>
              <td>${payment.remainingBalance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default RepaymentScheduleTable;
