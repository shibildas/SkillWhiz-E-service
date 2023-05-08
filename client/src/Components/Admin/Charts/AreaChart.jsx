import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const AreaChart = ({heading}) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3, 6, 8, 11, 9, 7, 20],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      };
    
      const options = {
        scales: {
          x: {
            ticks: {
              color: '#374151',
            },
          },
          y: {
            ticks: {
              color: '#374151',
              beginAtZero: true,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#374151',
            },
          },
        },
      };
  return (
    <div className='p-2 md:p-5 md:col-10'>
      <div className="chart-heading text-2xl font-semibold underline underline-offset-4">{heading}dgcbnh</div>
         <Line data={data} options={options} />

    </div>
  )
}

export default AreaChart