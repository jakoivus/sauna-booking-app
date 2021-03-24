import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import './chart.css'
const data = {
  labels: ['01', '02', '03', '004', '05', '06', '07'],
  datasets: [
    {
      label: 'Malli dataa',
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
      data: [65, 120, 80, 75, 155, 55, 40]
    }
  ]
};

export default class Chart extends Component {
  render() {
    return (
      <div className="chart">
        <h2 className="page-content" >Viiva kuvaaja</h2>
        <Line ref="chart" data={data} />
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log("dataset=", datasets[0].data); 
  }
}