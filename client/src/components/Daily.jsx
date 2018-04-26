import React from 'react';
import DailyTaskEntry from './DailyTaskEntry.jsx';

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
          <div className='daily-header'>header</div>
          <div className='daily-body'>
            {this.props.tasks.map((task, index) => {
              return (
                <DailyTaskEntry task={task} handleDelete={this.handleDelete} key={index}/>
                )
            })}
          </div>
        </div>

      )
  }
}

export default Daily;
