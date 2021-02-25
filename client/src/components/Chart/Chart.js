import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import './chart.css'
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class Chart extends Component {
  render() {
    return (
      <div className="chart">
        <h2>Line Example</h2>
        <Line ref="chart" data={data} />
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
  }
}
// import React, {Component} from 'react'
// import CanvasJSReact from './canvasjs.react' 
// import './chart.css'
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;




// class Chart extends Component {
//     render() {
//       const options = {
//         title: {
//           text: "Basic Column Chart in React"
//         },
//         data: [{				
//                   type: "column",
//                   dataPoints: [
//                       { label: "Apple",  y: 10  },
//                       { label: "Orange", y: 15  },
//                       { label: "Banana", y: 25  },
//                       { label: "Mango",  y: 30  },
//                       { label: "Grape",  y: 28  }
//                   ]
//          }]
//      }
      
//      return (
//         <div>
//           <CanvasJSChart options = {options}
//               /* onRef = {ref => this.chart = ref} */
//           />
//         </div>
//       );
//     }
//   }

//   export default Chart;  

// render() {
// 		const options = {
// 			animationEnabled: true,
// 			exportEnabled: true,
// 			theme: "light2", // "light1", "dark1", "dark2"
// 			title:{
// 				text: "Bounce Rate by Week of Year"
// 			},
// 			axisY: {
// 				title: "Bounce Rate",
// 				suffix: "%"
// 			},
// 			axisX: {
// 				title: "Week of Year",
// 				prefix: "W",
// 				interval: 2
// 			},
// 			data: [{
// 				type: "line",
// 				toolTipContent: "Week {x}: {y}%",
// 				dataPoints: [
// 					{ x: 1, y: 64 },
// 					{ x: 2, y: 61 },
// 					{ x: 3, y: 64 },
// 					{ x: 4, y: 62 },
// 					{ x: 5, y: 64 },
// 					{ x: 6, y: 60 },
// 					{ x: 7, y: 58 },
// 					{ x: 8, y: 59 },
// 					{ x: 9, y: 53 },
// 					{ x: 10, y: 54 },
// 					{ x: 11, y: 61 },
// 					{ x: 12, y: 60 },
// 					{ x: 13, y: 55 },
// 					{ x: 14, y: 60 },
// 					{ x: 15, y: 56 },
// 					{ x: 16, y: 60 },
// 					{ x: 17, y: 59.5 },
// 					{ x: 18, y: 63 },
// 					{ x: 19, y: 58 },
// 					{ x: 20, y: 54 },
// 					{ x: 21, y: 59 },
// 					{ x: 22, y: 64 },
// 					{ x: 23, y: 59 }
// 				]
// 			}]
// 		}
// 		return (
// 		<div className="chart-center">
// 			<CanvasJSChart options = {options}
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// };
// }
// export default Chart;  
