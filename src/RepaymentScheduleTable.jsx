import React, { useRef } from 'react';
import './RepaymentScheduleTable.css'; // Import your CSS file for styling
import './App.css';
import { FaCopy } from 'react-icons/fa';
// import { FaCopy } from 'react-icons/fa/index.esm';


const RepaymentScheduleTable = ({ paymentSchedule }) => {
  const tableRef = useRef(null);

  const handleCopyClick = () => {
    if (tableRef.current) {
      const range = document.createRange();
      range.selectNode(tableRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      alert('Table content copied!');
    }
  };

  return (
    <div>
      <h2>Amortization Schedule</h2>
      <button className="copy-button" onClick={handleCopyClick}>
        <FaCopy /> Copy Table
      </button>
      

      <table ref={tableRef}>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Payment Date</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Total Payment</th>
            <th>Remaining</th>
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
