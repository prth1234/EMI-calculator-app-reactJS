import React, { useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import './App.css'; // Import the CSS file for styling
import { Pie } from 'react-chartjs-2';
import EMIScheduleBarChart from "./EMIScheduleBarChart.jsx"; // Assuming you have a component for the bar chart
import profilePicture from './assets/logo1.png'
import ProgressBar from './ProgressBar';
import Forms from './Forms.jsx'

Chart.register(...registerables);












function App() {


  return (
    <div className="container">
    
     


 {/* Add ProgressBar component */}
 {/* <ProgressBar progress={progress} /> */}



 <Forms></Forms>

     
    </div>
  );
}




export default App;
