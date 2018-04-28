import {Doughnut} from 'react-chartjs-2';
import React from 'react';

const Chart = (props) => {
  const data = {
    datasets: [{
        data: [props.completed, props.todo],
        backgroundColor: [
          'rgba(0,255,0, 0.5)',
          'rgba(255, 0, 0, 0.5)'
        ]
    }],
    labels: ['Completed', 'Todo']
};

  return  (
    <Doughnut data={data} />
  )
}

Chart.defaultProps = {
  completed: 20,
  todo: 44
}

export default Chart;