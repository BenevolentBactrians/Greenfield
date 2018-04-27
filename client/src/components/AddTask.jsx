import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import Paper from 'material-ui/Paper';

class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      task: '',
      date: null,
      startTime: null,
      endTime: null,
      description: '',
      open: false,
      logOpen: false,
      emptyOpen: false,
      today: new Date()
    }

    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.task || !this.state.date ||  !this.state.startTime || !this.state.endTime || !this.state.description) {
      this.setState({emptyOpen: true})
    } else {
      axios.post('/task', {
        task: this.state.task,
        date: this.state.date,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        description: this.state.description,
        userId: this.props.userId
      }, {validateStatus: function(status) {
        return status === 201 || status === 200 || status === 403}
      }).then((response) =>  {
        if (response.status === 403) {
          this.setState({
            logOpen: true
          })
        } else {
        this.setState({
          task: '',
          date: null,
          startTime: null,
          startTIme: null,
          endTime: null,
          description: '',
          open:true
        })
      }}).catch(function(err, response) {
        console.error(err);
      })
    }
  }

  onChangeTask(e) {
    this.setState({
      task: e.target.value, logOpen: !this.props.userId
    })
  }

  onChangeDate(e, date) {
    this.setState({
      date: date, logOpen: !this.props.userId
    })
  }

  onChangeStart(e, time) {
    this.setState({
      startTime: time, logOpen: !this.props.userId
    })
  }

  onChangeEnd(e, time) {
    this.setState({
      endTime:time, logOpen: !this.props.userId
    })
  }

  onChangeDesc = (e) => {
    this.setState({
      description: e.target.value, logOpen: !this.props.userId
    })
  }

  handleRequestClose() {
    this.setState({
      open: false,
      logOpen: false,
      emptyOpen: false
    })
  }

  render() {
    return (
        <Paper className="paper">
          <h2>add a task</h2>
          <form onSubmit={this.handleSubmit}>
             <TextField
              id='task'
              value={this.state.task}
              onChange={this.onChangeTask}
              floatingLabelText="task"
            />
            <DatePicker
              id="date"
              minDate={this.state.today}
              value={this.state.date}
              hintText="yyyy/mm/dd"
              onChange={this.onChangeDate}
              style={{
               textAlign: 'center'
             }}
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
              style={{
               textAlign: 'center'
             }}
            />
            <TextField
              id='description'
              value={this.state.description}
              onChange={this.onChangeDesc}
              floatingLabelText="description"
              rows={2}
            />

            <RaisedButton
              onClick={this.handleSubmit}
              label="add task"
              disabled={!this.props.userId || !this.state.task || !this.state.date ||  !this.state.startTime || !this.state.endTime || !this.state.description}
            />
            <Snackbar
              open={this.state.open}
              message="task added"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
             <Snackbar
              open={this.state.logOpen}
              message="Please Login first"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />

             <Snackbar
              open={this.state.emptyOpen}
              message="Please complete all fields"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </form>
        </Paper >
      )
  }
}

export default AddTask;

