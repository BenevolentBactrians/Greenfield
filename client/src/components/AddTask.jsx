import React from 'react';
import axios from 'axios';

class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      task: '',
      date: '',
      startTime: '',
      endTime: '',
      description: ''
    }

    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/savetask', {
      task: this.state.task,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      description: this.state.description
    }).then((response) => {
      this.setState({
        task: '',
        date: '',
        startTIme: '',
        endTime: '',
        description: ''
      })
    }).catch(function(error) {
      console.error(error);
    })

  }

  onChangeTask(e) {
    this.setState({
      task: e.target.value
    })
  }

   onChangeDate(e) {
    this.setState({
      Date: e.target.value
    })
  }

  onChangeStart(e) {
    this.setState({
      startTime: e.target.value
    })
  }

  onChangeEnd(e) {
    this.setState({
      endTime: e.target.value
    })
  }

  onChangeDesc(e) {
    this.setState({
      description: e.target.value
    })
  }

  render() {
    return (
        <div>
          <h3>add a task</h3>
          <form onSubmit={this.handleSubmit}>
            <input type='text' placeholder='task' onChange={this.onChangeTask}/>
            <input type='text' placeholder='date' onChange={this.onChangeDate}/>
            <DateTime closeOnSelect={true}/>
            <input type='text' placeholder='start time' onChange={this.onChangeStart}/>
            <input type='text' placeholder='end time' onChange={this.onChangeEnd}/>
            <input type='text' placeholder='description'onChange={this.onChangeDesc}/>
            <button type='submit' value='Submit'>create a task</button>
          </form>
        </div>
      )
  }
}

export default AddTask;

