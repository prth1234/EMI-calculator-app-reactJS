// // ProgressBar.jsx
// import React from 'react';
// import './ProgressBar.css';

// const ProgressBar = ({ progress }) => {
//   // Ensure progress doesn't exceed 100%
//   const clampedProgress = Math.min(progress, 100);

//   return (
//     <div className="progress-bar-container">
//       <div className="progress-bar" style={{ width: `${clampedProgress}%` }}></div>

//     </div>
//   );
// };

// export default ProgressBar;


// ProgressBar.jsx
import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  // Ensure progress doesn't exceed 100% and is not below 0%
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${clampedProgress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
