import {Doughnut} from 'react-chartjs-2';
import React from 'react';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 1,
      todo: 2
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let completed = 0;
    let todo = 0;
    nextProps.data.forEach((el, ind) => {
      if(el.tasks.length) {
        el.tasks.forEach((task, index) => {
          task.completed ? completed = completed + 1 : todo = todo + 1;
        })
      }
    })
    return {completed: completed, todo: todo}
  }

  render() {
    return  (
      <Doughnut data={{
        datasets: [{
            data: [this.state.completed, this.state.todo],
            backgroundColor: [
              'rgba(0,255,0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
            ]
        }],
        labels: ['Completed', 'Todo']
      }} />
    )
  }
}

Chart.defaultProps = {
  completed: 20,
  todo: 44
}

export default Chart;