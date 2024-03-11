import React from 'react';
import AmortizationTableRow from './AmortizationTableRow';
import AmortizationTableHeader from './AmortizationTableHeader';
import { ScreenClassRender } from 'react-grid-system';
import PropTypes from 'prop-types'; // Import PropTypes from the 'prop-types' package

const getStyle = (screen) => {
  switch (screen) {
    case 'xl':
    case 'lg':
    case 'md':
      return { fontSize: '12px' };
    default:
      return { fontSize: '8px' };
  }
};

const AmortizationTable = (props) => (
  <ScreenClassRender style={getStyle}>
    <div className="amortization-table">
      <AmortizationTableHeader />
      {props.input.amortization.map((row, index) => (
        <AmortizationTableRow input={props.input} row={row} key={index} />
      ))}
    </div>
  </ScreenClassRender>
);

AmortizationTableRow.propTypes = {
    row: PropTypes.object,
  };
  
export default AmortizationTable;

// Inside AmortizationTable.jsx
// const AmortizationTable = ({ input }) => {
//   return (
//     <div>
//       <h2 style={{color:"white"}}>Amortization Table</h2>
//       <p>Placeholder Content</p>
//     </div>
//   );
// };

// export default AmortizationTable;
