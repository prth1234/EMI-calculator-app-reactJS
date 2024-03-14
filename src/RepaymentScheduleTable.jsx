import React, { useRef, useState, useEffect } from 'react';
import './RepaymentScheduleTable.css'; // Import your CSS file for styling
import './App.css';
import { FaCopy, FaCheck, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const RepaymentScheduleTable = ({ paymentSchedule }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const tableRef = useRef(null);

  useEffect(() => {
    // Simulating loading delay (You can replace this with your actual loading logic)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated 2-second loading time
    return () => clearTimeout(loadingTimeout);
  }, []);

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

  const handleDownloadPDF = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Set PDF background color to black
        pdf.setFillColor(0, 0, 0);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

        // Set text color to black
        pdf.setTextColor(0, 0, 0);

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('table.pdf');
      });
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table.xlsx');
  };

  return (
    <div>
      <h2>Amortization Schedule</h2>
      {isLoading ? (
        <div className="terminal-loader">
          <div className="terminal-header">
            <div className="terminal-title">Status</div>
            <div className="terminal-controls">
              <div className="control close"></div>
              <div className="control minimize"></div>
              <div className="control maximize"></div>
            </div>
          </div>
          <div className="text">Loading...</div>
        </div>
      ) : (
        <>
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
          <button className="download-button" onClick={handleDownloadPDF}>
            <FaFilePdf /> Download as PDF
          </button>
          <button className="download-button" onClick={handleDownloadExcel}>
            <FaFileExcel /> Download as Excel
          </button>
        </>
      )}
    </div>
  );
};

export default RepaymentScheduleTable;
