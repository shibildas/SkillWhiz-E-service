import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {Doughnut} from 'react-chartjs-2'

const Donut = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['jan', 'feb', 'march'],
        datasets: [
          {
            label:"New Chart",
            data: [2,4,6],
            backgroundColor: ['#ff6384','#36a2eb','#cc65fe'],
            borderColor: ['#ff6384','#36a2eb','#cc65fe'],
            borderWidth: '10px',
          },
        ],
      };
      
    
  return (
    <div>
        <Doughnut data={data}/>

    </div>
  )
}

export default Donut