import React, { useRef, useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import './RepaymentScheduleTable.css'; // Import your CSS file for styling
import './App.css';

const RepaymentScheduleTable = ({ paymentSchedule }) => {
  const [isCopied, setIsCopied] = useState(false);
  const tableRef = useRef(null);

  const handleCopyClick = () => {
    if (tableRef.current) {
      const range = document.createRange();
      range.selectNode(tableRef.current);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // Reset the check mark after 1.5 seconds
    }
  };

  return (
    <div>
      <h2>Amortization Schedule</h2>
      <button className={`copy-button ${isCopied ? 'copied' : ''}`} onClick={handleCopyClick}>
        {isCopied ? <FaCheck /> : <FaCopy />} {isCopied ? 'Copied!' : 'Copy Table'}
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
