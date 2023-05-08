import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {Doughnut} from 'react-chartjs-2'

const Donut = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sales',
            data: [1200, 1800, 900, 2000, 1500, 2500],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#9C27B0', '#FF9800'],
            borderWidth: 2,
          },
        ],
      };
    
      // Define the chart options
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };
    
  return (
    <div className='p-2 md:p-5 md:col-2'>
        <Doughnut data={data} options={options}/>

    </div>
  )
}

export default Donut