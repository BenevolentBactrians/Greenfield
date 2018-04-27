import React from 'react';
import DailyTaskEntry from './DailyTaskEntry.jsx';
import axios from 'axios';
import Paper from 'material-ui/Paper'

class Daily extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      tasks:[]
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.setState({
      tasks: this.props.tasks
    })
  }

  handleDelete(taskId) {
    axios.delete(`http://localhost:3000/task/${taskId}`)
    .then((res) => {
        let tasks = this.state.tasks.slice()
        this.setState({tasks: tasks.filter((task, ind) => task._id !== taskId) });
      })

  }

  render() {
    return (
        <div className='daily-container'>

        <Paper zDepth={3} style={{textAlign: 'center'}}>
          <h4 className='daily-header'>Tasks for {(this.props.date).toLocaleString('en-US', {weekday: "long", year: "numeric", month: "long", day: "numeric"})}</h4>
        </Paper>
          <div className='daily-body'>
            {this.state.tasks.map((task, index) => {
              return (
                <Paper zdepth={3}  key={index}>
                  <DailyTaskEntry task={task} handleDelete={this.handleDelete}/>
                </Paper>
                )
            })}
          </div>
        </div>

      )
  }
}

export default Daily;
