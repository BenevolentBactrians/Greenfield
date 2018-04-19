import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import axios from 'axios';
import moment from 'moment';

class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      task: '',
      date: null,
      startTime: null,
      endTime: null,
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
        date: null,
        startTIme: null,
        endTime: null,
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

   onChangeDate(e, date) {
    console.log('!!!!!DATTTTEEE!!!!', date)
    this.setState({
      Date: date
    })
  }

  onChangeStart(e, time) {
    this.setState({
      startTime: time
    })
  }

  onChangeEnd(e, time) {
    this.setState({
      endTime:time
    })
  }

  onChangeDesc(e) {
    this.setState({
      description: e.target.value
    })
  }

  render() {
    return (
        <div className="addTask">
          <h4>add a task</h4>
          <form onSubmit={this.handleSubmit}>
             <TextField
              id='task'
              value={this.state.task}
              onChange={this.onChangeTask}
              floatingLabelText="task"
            />
            <DatePicker
              id="date"
              hintText="yyyy/mm/dd"
              onChange={this.onChangeDate}
            />
            <TimePicker
              id="starttime"
              format="ampm"
              hintText="start time"
              value={this.state.startTime}
              onChange={this.onChangeStart}
            />
            <TimePicker
              id="endtime"
              format="ampm"
              hintText="end time"
              value={this.state.endTime}
              onChange={this.onChangeEnd}
            />
            <TextField
              id='description'
              value={this.state.description}
              onChange={this.onChangeDesc}
              floatingLabelText="description"
              rows={2}
            />
            <FloatingActionButton type="submit" value="Submit" onClick={this.handleSubmit}>
              <ContentAdd />
            </FloatingActionButton>
          </form>
        </div>
      )
  }
}

export default AddTask;

