import React, { useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import './App.css'; // Import the CSS file for styling

import Forms from './Forms.jsx'

Chart.register(...registerables);


function App() {


  return (
    <div className="container">
    
  



 <Forms></Forms>

     
    </div>
  );
}




export default App;
