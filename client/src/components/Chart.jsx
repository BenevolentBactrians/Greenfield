import {Bar, Doughnut} from 'react-chartjs-2';
import React from 'react';
import { legend } from 'chart.js/src/plugins';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 1,
      todo: 2,
      weektasks: {
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
        'Sunday': 0
      },
      dayArr: [] 
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let currentDay = '';
    let dayArr = [];
    let completed = 0;
    let todo = 0;
    let weektasks = {
      'Monday': 0,
      'Tuesday': 0,
      'Wednesday': 0,
      'Thursday': 0,
      'Friday': 0,
      'Saturday': 0,
      'Sunday': 0
      }; 
    if( nextProps.data !== undefined ) {
      nextProps.data.forEach((el, ind) => {
        let currentDay = el.date.toString().split(' ')[0];
        if (currentDay === 'Mon') {
          currentDay = 'Monday'
        } else if (currentDay === 'Tue') {
          currentDay = 'Tuesday'
        } else if (currentDay === 'Wed') {
          currentDay = 'Wednesday'
        } else if (currentDay === 'Thu') {
          currentDay = 'Thursday'
        } else if (currentDay === 'Fri') {
          currentDay = 'Friday'
        } else if (currentDay === 'Sat') {
          currentDay = 'Saturday'
        } else if (currentDay === 'Sun') {
          currentDay = 'Sunday'
        }
        dayArr.push(currentDay);

        if(el.tasks.length) {
          el.tasks.forEach((task, index) => {
            task.completed ? completed = completed + 1 : todo = todo + 1;
            weektasks[currentDay] += 1
          })
        }

      })
    }
    return {completed: completed, todo: todo, weektasks: weektasks, dayArr: dayArr}
  }

  render() {
    let newArr = [];
    for (var i in this.state.weektasks) {
      newArr.push(this.state.weektasks[i])
    }
    return  (
      <div>

        <div className="row bar-chart ml-10">
          <Bar data={{
            datasets: [{
              data: newArr,
              backgroundColor: [
                'rgba(0,255,0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(58, 100, 125, 1)',
                'rgba(58, 33, 125, 0.78)',
                'rgba(0, 244, 207, 0.78)',
                'rgba(163, 244, 0, 0.78)',
                'rgba(163, 29, 0, 0.78)'
              ]
            }],
            labels: dayArr
          }} />          
        </div>

        <div className="row doughnut-chart">
          <Doughnut data={{
            datasets: [{
                data: [this.state.completed, this.state.todo],
                legend: 'Daily',
                backgroundColor: [
                  'rgba(0,255,0, 0.5)',
                  'rgba(255, 0, 0, 0.5)'
                ]
            }],
            labels: ['Completed', 'Todo'],
          }} />
        </div>

      </div>
    )
  }
}

export default Chart;

// <Doughnut data={{
//   datasets: [{
//     data: [this.state.completed, this.state.todo],
//     backgroundColor: [
//       'rgba(0,255,0, 0.5)',
//       'rgba(255, 0, 0, 0.5)'
//     ]
//   }],
//   labels: ['Completed', 'Todo']
// }} />